import { Octokit } from "@octokit/rest";
import { createWriteStream } from "fs";
import { get } from "https";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const resp = await octokit.request(
  "GET /repos/{owner}/{repo}/actions/runs/{run_id}/artifacts",
  {
    owner: "open-goal",
    repo: "jak-project",
    run_id: process.env.WORKFLOW_RUN_ID,
  },
);

let artifactId = undefined;

for (const artifact of resp.data.artifacts) {
  if (artifact.name === "opengoal-docs") {
    artifactId = artifact.id;
  }
}

if (artifactId !== undefined) {
  let downloadResp = await octokit.request(
    "GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}/{archive_format}",
    {
      owner: "open-goal",
      repo: "jak-project",
      artifact_id: artifactId,
      archive_format: "zip",
    },
  );
  if (downloadResp.status === 200) {
    const file = createWriteStream("./static/data/docs/opengoal-docs.zip");
    get(downloadResp.url, (response) => {
      response.pipe(file);
    });
  }
}
