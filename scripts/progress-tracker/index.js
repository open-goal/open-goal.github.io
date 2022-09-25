import { Octokit } from "@octokit/rest";
import { throttling } from "@octokit/plugin-throttling";
import { retry } from "@octokit/plugin-retry";
import * as fs from "fs";

Octokit.plugin(throttling);
Octokit.plugin(retry);
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  userAgent: "open-goal/jak-project",
  log: {
    debug: () => { },
    info: () => { },
    warn: console.warn,
    error: console.error,
  },
  throttle: {
    onRateLimit: (retryAfter, options) => {
      octokit.log.warn(
        `Request quota exhausted for request ${options.method} ${options.url}`
      );

      // Retry twice after hitting a rate limit error, then give up
      if (options.request.retryCount <= 2) {
        console.log(`Retrying after ${retryAfter} seconds!`);
        return true;
      }
    },
    onAbuseLimit: (retryAfter, options) => {
      // does not retry, only logs a warning
      octokit.log.warn(
        `Abuse detected for request ${options.method} ${options.url}`
      );
    },
  },
});

function getFileStatus(lines, gameName) {
  // Exception for jak 1 files, since im not going to go and add the placeholder there
  if (gameName === "jak1" && lines.length > 7) {
    return "decompiled";
  }

  // A file is...
  // - `TODO` if completely empty
  // - `Started` if there are lines added after `;; decomp begins` but the file contains TODO comments
  // - `decompiled` if there are lines after the begins and no todos

  // Count lines after "decomp begins"
  // if we can't find "decomp begins", then it definitely isn't done!
  let numLinesAfter = 0;
  let foundDecompBegins = false;
  let foundTODOs = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.toLowerCase().includes("todo")) {
      foundTODOs = true;
    }
    if (foundDecompBegins && line.trim().length > 0) {
      numLinesAfter++;
    }
    if (line.toLowerCase().includes("decomp begins")) {
      foundDecompBegins = true;
    }
  }

  if (numLinesAfter > 0) {
    if (foundTODOs) {
      return "started";
    }
    return "decompiled";
  }
  return "todo";
}

function shouldIgnoreLineCount(lines) {
  // Look for a `;; og:ignore-from-loc` line
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.toLowerCase().includes(";; og:ignore-from-loc")) {
      return true;
    }
  }
  return false;
}

function updateProgressDbEntry(fileMeta, fileLines, progressDb, gameName) {
  // First, find it in the database, it's unfortunately an array for frontend reasons
  let newEntry = true;
  let entryIdx = 0;
  for (const entry of progressDb) {
    if (entry["fileName"] === `${fileMeta[0]}.gc`) {
      newEntry = false;
      break;
    }
    entryIdx++;
  }

  // TODO - also check ref tests and add a "needs ref tests" status
  let status = getFileStatus(fileLines, gameName);
  let ignoreFromLoc = shouldIgnoreLineCount(fileLines);

  if (newEntry) {
    progressDb.push({
      fileName: `${fileMeta[0]}.gc`,
      filePath: `goal_src/${gameName}/${fileMeta[4]}/${fileMeta[0]}.gc`,
      status: status,
      assignedTo: {
        pr: null,
        sheet: null
      },
      ignoreFromLoc: ignoreFromLoc,
      loc: fileLines.length,
      issues: [],
      pullRequests: []
    })
  } else {
    progressDb[entryIdx]["loc"] = fileLines.length;
    progressDb[entryIdx]["status"] = status;
    // Clear assignments if it's done
    if (status == "decompiled") {
      progressDb[entryIdx]["assignedTo"] = {
        pr: null,
        sheet: null
      };
    }
  }
}

// Scan cloned repo to find out which files are finished and which aren't
// - if they are done, update the LoC
function scanFolder(fileList, gameName, progressDb) {
  // Grab the file list
  fileList = JSON.parse(fs.readFileSync(`./jak-project/goal_src/${gameName}/build/all_objs.json`));
  for (const fileMeta of fileList) {
    // Skip art files
    if (fileMeta[2] == 3) {
      // Check it's line count
      let filePath = `./jak-project/goal_src/${gameName}/${fileMeta[4]}/${fileMeta[0]}.gc`;
      if (fs.existsSync(filePath)) {
        let fileLines = fs.readFileSync(filePath).toString().split(/\r?\n/);
        // Check if the last line is empty
        if (fileLines.length > 0 && fileLines[fileLines.length-1].trim().length === 0) {
          fileLines.pop();
        }
        updateProgressDbEntry(fileMeta, fileLines, progressDb, gameName);
      }
    }
  }
}

function auditProcess(gameName, pulls, issues) {
  console.log(`Auditing - ${gameName}`);
  let fileList;
  let progressDb = [];
  let progressPath = fileList = `./static/data/progress/${gameName}/progress.json`;
  if (fs.existsSync(progressPath)) {
    progressDb = JSON.parse(fs.readFileSync(progressPath));
  }
  let progressHistoryDb;
  let progressHistoryDbPath = fileList = `./static/data/progress/${gameName}/history.json`;
  if (fs.existsSync(progressHistoryDbPath)) {
    progressHistoryDb = JSON.parse(fs.readFileSync(progressHistoryDbPath));
  }
  // Scan the cloned git repo's files
  scanFolder(fileList, gameName, progressDb);

  let newLocCount = 0;
  let excludedFromLocFiles = new Set();

  for (let entry of progressDb) {
    let fileName = entry.fileName.replace(".gc", "");
    entry.pullRequests = [];
    // Check to see if the file shows up in any PR
    // if `jak1`, gotta check with and without `jak1` in the path, since that's something we changed recently
    for (const [number, pull] of Object.entries(pulls)) {
      if (pull.files_modified.includes(entry.filePath) ||
        (gameName === "jak1" && pull.files_modified.includes(entry.filePath.replace("jak1/", "")))) {
        entry.pullRequests.push({
          url: pull.url,
          number: pull.number,
          title: pull.title,
          avatar_url: pull.avatar_url,
          user: pull.user,
          state: pull.state
        });
      }
    }
    entry.issues = [];
    // Check issues title/body
    for (const issue of issues) {
      if (issue.title.includes(fileName) || (issue.body !== null && issue.body.includes(fileName))) {
        // Check if the issue is for this game
        let validIssue = false
        if (gameName == "jak1") {
          validIssue = true;
        } else {
          for (const label of issue.labels) {
            if (label.name == gameName) {
              validIssue = true;
              break;
            }
          }
        }
        if (validIssue) {
          entry.issues.push({
            number: issue.number,
            url: issue.html_url,
            state: issue.state,
            title: issue.title
          });
        }
      }
    }

    // Sort by numbers
    entry.pullRequests.sort((a, b) => b.number - a.number);
    entry.issues.sort((a, b) => b.number - a.number);

    // Look at the most recent PR that is open (if there is one), and assign it to that user
    // - only do so if it's not already decompiled!
    if (entry.status !== "decompiled") {
      for (const pull of entry.pullRequests) {
        if (pull.state == "open") {
          entry.status = "in-progress";
          entry.assignedTo.pr = pull.number;
        }
      }
    }

    if (entry.status === "decompiled") {
      if (!entry.ignoreFromLoc) {
        newLocCount += entry.loc;
      } else {
        excludedFromLocFiles.add(entry.fileName);
      }
    }
  }

  // Update excluded file list
  progressHistoryDb.excludedFromLoc = [...excludedFromLocFiles];

  // Update loc count if it's changed
  if (progressHistoryDb.locHistory.length == 0 || newLocCount != progressHistoryDb.locHistory[progressHistoryDb.locHistory.length - 1].loc) {
    progressHistoryDb.locHistory.push({
      timestamp: (new Date()).toISOString(),
      loc: newLocCount
    });
  }

  // Sort by status
  let order = { "in-progress": 1, "started": 2, "needs-ref-tests": 3, "todo": 4, "decompiled": 5, "default": 1000 };
  progressDb.sort((a, b) => (order[a.status] || order.default) - (order[b.status] || order.default));

  // Write out progress files
  fs.writeFileSync(progressPath, JSON.stringify(progressDb));
  fs.writeFileSync(progressHistoryDbPath, JSON.stringify(progressHistoryDb));
  console.log(`Finished auditing - ${gameName}`);
}

async function getAllIssues() {
  return await octokit
    .paginate(octokit.rest.issues.listForRepo, {
      owner: "open-goal",
      repo: "jak-project",
      per_page: 100,
      state: "all",
    });
}

async function getAllPullRequests() {
  return await octokit
    .paginate(octokit.rest.pulls.list, {
      owner: "open-goal",
      repo: "jak-project",
      per_page: 100,
      base: "master",
      state: "all",
    });
}

async function getPullRequestFiles(pullNumber) {
  return await octokit
    .paginate(octokit.rest.pulls.listFiles, {
      owner: "open-goal",
      repo: "jak-project",
      per_page: 100,
      pull_number: pullNumber
    });
}

// List all PRs and Issues from repos, do this once so we don't have to do it per game.
console.log("getting PRs");
let pullRequests = await getAllPullRequests();
console.log("preparing PR data, updating file modification history");
// Filter and update pull request history
// we "cache" this information because this is a very expensive operation (1+ calls per PR)
// and we don't want to wastefully do this, files only change when the commit sha on the head branch changes
let pullRequestHistory = JSON.parse(fs.readFileSync("./scripts/progress-tracker/history/pulls.json"));
let prCount = 0;
for (const pull of pullRequests) {
  console.log(`[${prCount + 1}/${pullRequests.length}] Pull Request Files Analyzed`);
  if (pull.number.toString() in pullRequestHistory) {
    // If something has changed, check the files again
    if (pull.head.sha !== pullRequestHistory[pull.number.toString()].sha) {
      let files = await getPullRequestFiles(pull.number);
      let filteredFiles = []
      for (const file of files) {
        // We only care about the files that are in goal_src/
        if (file.filename.startsWith("goal_src")) {
          filteredFiles.push(file.filename);
        }
      }
      // Update the history entry
      pullRequestHistory[pull.number.toString()] = {
        sha: pull.head.sha,
        files_modified: filteredFiles,
        url: pull.html_url,
        number: pull.number,
        title: pull.title,
        avatar_url: pull.user.avatar_url,
        user: pull.user.login,
        state: pull.state
      }
    } else {
      // else the files are the same, but the state/title may have changed so update that
      pullRequestHistory[pull.number.toString()].state = pull.state;
      pullRequestHistory[pull.number.toString()].title = pull.title;
    }
  } else {
    // new entry, ask for the files, initialize it
    // TODO - put this in a function
    let files = await getPullRequestFiles(pull.number);
    let filteredFiles = []
    for (const file of files) {
      // We only care about the files that are in goal_src/
      if (file.filename.startsWith("goal_src")) {
        filteredFiles.push(file.filename);
      }
    }
    // Update the history entry
    pullRequestHistory[pull.number.toString()] = {
      sha: pull.head.sha,
      files_modified: filteredFiles,
      url: pull.html_url,
      number: pull.number,
      title: pull.title,
      avatar_url: pull.user.avatar_url,
      user: pull.user.login,
      state: pull.state
    }
  }
  prCount++;
}
// Update our history
fs.writeFileSync("./scripts/progress-tracker/history/pulls.json", JSON.stringify(pullRequestHistory));

console.log("getting issues");
// For issues we only analyze the title and body and all of that is in the initial list response, so no need
// for fancy tracking.  IF we have to track comments -- this will change!
let issues = await getAllIssues();
let issuesFiltered = [];
// Filter out pull requests, all pull requests are issues -- not all issues are pull requests
for (const issue of issues) {
  if (!"pull_request" in issue) {
    issuesFiltered.push(issue);
  }
}

auditProcess("jak1", pullRequestHistory, issuesFiltered);
auditProcess("jak2", pullRequestHistory, issuesFiltered);

// TODO - query a shared google drive sheet to get the same information
