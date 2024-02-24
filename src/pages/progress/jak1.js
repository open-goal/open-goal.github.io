import React, { useState, useEffect, useRef } from "react";
import Layout from "@theme/Layout";
import { createTheme, Switch, ThemeProvider, FormGroup, FormControlLabel } from "@mui/material";
import MaterialTable from "material-table";
import decompFileData from "/data/progress/jak1/progress.json";
import decompHistoryData from "/data/progress/jak1/history.json";
import castData from "/data/progress/jak1/casts.json";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  GitPullRequestIcon,
  StopwatchIcon,
  SyncIcon,
  GitMergeIcon,
  IssueOpenedIcon,
  CheckCircleIcon,
  BeakerIcon,
} from "@primer/octicons-react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const DataFormater = (number) => {
  if (number > 1000000000) {
    return (number / 1000000000).toString() + "B";
  } else if (number > 1000000) {
    return (number / 1000000).toString() + "M";
  } else if (number > 1000) {
    return (number / 1000).toString() + "K";
  } else {
    return number.toString();
  }
};

const DateFormatter = (dateString) => {
  return dateString.substring(0, dateString.indexOf("T"));
};

const typeCastData = castData.typeCasts.filter((entry) => {
  return entry.value > castData.typeCastAvgFreq * 2;
});

const stackCastData = castData.stackCasts.filter((entry) => {
  return entry.value > castData.stackCastAvgFreq;
});

const labelCastData = castData.labelCasts.filter((entry) => {
  return entry.value > castData.labelCastAvgFreq;
});

const fileStatusData = () => {
  let statusAmounts = {};
  for (let i = 0; i < decompFileData.length; i++) {
    if (statusAmounts[decompFileData[i].status] == undefined) {
      statusAmounts[decompFileData[i].status] = 1;
    } else {
      statusAmounts[decompFileData[i].status] += 1;
    }
  }
  // combine "started" and "decompiled"
  if (Object.keys(statusAmounts).includes("started") && Object.keys(statusAmounts).includes("decompiled")) {
    statusAmounts["decompiled"] += statusAmounts["started"];
    delete statusAmounts["started"];
  }
  let data = [];
  for (const [key, value] of Object.entries(statusAmounts)) {
    data.push({ name: key, value: value });
  }
  return data;
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function NonDeveloperModeContent() {
  return (
    <div className="row mt-2 text--center">
      <div className="col col--4">
        <h2>File Progress</h2>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart width={400} height={400}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={fileStatusData()}
              cx="50%"
              cy="50%"
              innerRadius={"50%"}
              outerRadius={"90%"}
              fill="#8884d8"
            >
              {fileStatusData().map((entry, index) => (
                <Cell fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              wrapperStyle={{ outline: "#febb01 solid 1px" }}
              contentStyle={{
                backgroundColor: "#222222",
                border: null,
              }}
              itemStyle={{ color: "#fff" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function DeveloperModeContent() {
  return (
    <>
      <div className="row">
        <div className="col">
          <h2>Line Count Progress</h2>
          <ResponsiveContainer width="95%" height={400}>
            <LineChart
              width={600}
              height={300}
              data={decompHistoryData.locHistory}
              margin={{ top: 5, right: 20, bottom: 5, left: 20 }}
            >
              <Line type="monotone" dataKey="loc" stroke="#febb01" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis
                hide={true}
                dataKey="timestamp"
                tickFormatter={DateFormatter}
              />
              <YAxis tickFormatter={DataFormater} />
              <Tooltip contentStyle={{ backgroundColor: "#222222" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="row mt-2 text--center">
        <div className="col col--4">
          <h2>Type Cast Frequency</h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart width={400} height={400}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={typeCastData}
                cx="50%"
                cy="50%"
                innerRadius={"50%"}
                outerRadius={"90%"}
                fill="#8884d8"
              >
                {typeCastData.map((entry, index) => (
                  <Cell fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                wrapperStyle={{ outline: "#febb01 solid 1px" }}
                contentStyle={{
                  backgroundColor: "#222222",
                  border: null,
                }}
                itemStyle={{ color: "#fff" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="col col--4">
          <h2>Stack Cast Frequency</h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart width={400} height={400}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={stackCastData}
                cx="50%"
                cy="50%"
                innerRadius={"50%"}
                outerRadius={"90%"}
                fill="#8884d8"
              >
                {stackCastData.map((entry, index) => (
                  <Cell fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                wrapperStyle={{ outline: "#febb01 solid 1px" }}
                contentStyle={{
                  backgroundColor: "#222222",
                  border: null,
                }}
                itemStyle={{ color: "#fff" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="col col--4">
          <h2>Label Cast Frequency</h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart width={400} height={400}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={labelCastData}
                cx="50%"
                cy="50%"
                innerRadius={"50%"}
                outerRadius={"90%"}
                fill="#8884d8"
              >
                {labelCastData.map((entry, index) => (
                  <Cell fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                wrapperStyle={{ outline: "#febb01 solid 1px" }}
                contentStyle={{
                  backgroundColor: "#222222",
                  border: null,
                }}
                itemStyle={{ color: "#fff" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col">
          <ThemeProvider theme={darkTheme}>
            <MaterialTable
              columns={[
                {
                  title: "File Name",
                  customFilterAndSearch: (filter, rowData) =>
                    rowData.fileName.includes(filter),
                  customSort: (a, b) =>
                    a["fileName"].localeCompare(b["fileName"]),
                  render: (rowData) => {
                    return (
                      <a
                        href={`https://github.com/open-goal/jak-project/tree/master/${rowData.filePath}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {rowData.fileName}
                      </a>
                    );
                  },
                },
                {
                  title: "Status",
                  render: (rowData) => {
                    if (rowData.status === "decompiled") {
                      return (
                        <div>
                          <CheckCircleIcon
                            size={24}
                            className="trackerIcon mergeColor"
                          />
                          Decompiled
                        </div>
                      );
                    } else if (rowData.status === "todo") {
                      return (
                        <div>
                          <StopwatchIcon
                            size={24}
                            className="trackerIcon openColor"
                          />
                          TODO
                        </div>
                      );
                    } else if (rowData.status === "started") {
                      return (
                        <div>
                          <BeakerIcon
                            size={24}
                            className="trackerIcon openColor"
                          />
                          <a
                            href={`https://sourcegraph.com/search?q=context:global+repo:%5Egithub%5C.com/open-goal/jak-project%24+file:%5E${rowData.filePath}+TODO&patternType=standard`}
                          >
                            Started
                          </a>
                        </div>
                      );
                    } else {
                      return (
                        <div>
                          <SyncIcon
                            size={24}
                            className="trackerIcon pendingColor"
                          />
                          In Progress
                        </div>
                      );
                    }
                  },
                  customSort: (a, b) =>
                    a["status"].localeCompare(b["status"]),
                },
                {
                  title: "Assigned To",
                  render: (rowData) => {
                    if (
                      rowData.assignedTo.pr === null &&
                      rowData.assignedTo.sheet === null
                    ) {
                      return <div>---</div>;
                    } else if (rowData.assignedTo.sheet !== null) {
                      if (rowData.assignedTo.sheet.avatar_url !== null) {
                        return (
                          <div>
                            <img
                              src={rowData.assignedTo.sheet.avatar_url}
                              style={{
                                width: "25px",
                                marginRight: "0.25em",
                                verticalAlign: "middle",
                              }}
                            ></img>
                            {rowData.assignedTo.sheet.user_name}
                          </div>
                        );
                      } else {
                        return (
                          <div>{rowData.assignedTo.sheet.user_name}</div>
                        );
                      }
                    } else if (rowData.assignedTo.pr !== null) {
                      // Find the person's avatar
                      let avatar_url = "";
                      let user_name = "";
                      for (const pull of rowData.pullRequests) {
                        if (pull.number == rowData.assignedTo.pr) {
                          avatar_url = pull.avatar_url;
                          user_name = pull.user;
                        }
                      }
                      return (
                        <div>
                          <img
                            src={avatar_url}
                            style={{
                              width: "25px",
                              marginRight: "0.25em",
                              verticalAlign: "middle",
                            }}
                          ></img>
                          {user_name}
                        </div>
                      );
                    }
                  },
                  sorting: false,
                },
                {
                  title: "Line Count",
                  render: (rowData) => {
                    // Check if it's excluded
                    if (
                      decompHistoryData.excludedFromLoc.includes(
                        rowData.fileName,
                      ) ||
                      rowData.status !== "decompiled"
                    ) {
                      return (
                        <strike className="mutedColor">
                          {rowData.loc}
                        </strike>
                      );
                    }
                    return rowData.loc;
                  },
                  customSort: (a, b) => a["loc"] < b["loc"],
                },
                {
                  title: "Issues",
                  render: (rowData) => {
                    let issueIcons = [];
                    let totalClosedIssues = 0;
                    for (const issue of rowData.issues) {
                      if (issue.state === "open") {
                        issueIcons.push(
                          <p className="iconRow">
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href={issue.url}
                            >
                              <IssueOpenedIcon
                                className="trackerIcon openColor"
                                size={24}
                              />
                              {issue.number}
                            </a>
                          </p>,
                        );
                      } else {
                        totalClosedIssues++;
                      }
                    }
                    if (issueIcons.length == 0) {
                      return <div>---</div>;
                    } else {
                      if (totalClosedIssues == 0) {
                        return <div>{issueIcons}</div>;
                      } else {
                        return (
                          <div>
                            {issueIcons}
                            <p className="iconRow">
                              ...and {totalClosedIssues} closed
                            </p>
                          </div>
                        );
                      }
                    }
                  },
                  customSort: (a, b) =>
                    a["issues"].length < b["issues"].length,
                },
                {
                  title: "Pull Requests",
                  render: (rowData) => {
                    let pullIcons = [];
                    let totalHiddenPulls = 0;
                    let closedPr = undefined;
                    for (const pull of rowData.pullRequests) {
                      if (pull.state === "open") {
                        pullIcons.push(
                          <p className="iconRow">
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href={pull.url}
                            >
                              <GitPullRequestIcon
                                className="trackerIcon openColor"
                                size={24}
                              />
                              {pull.number}
                            </a>
                          </p>,
                        );
                      } else {
                        if (totalHiddenPulls == 0) {
                          // add one PR atleast, assuming this is the last time it was modified
                          closedPr = (
                            <p className="iconRow">
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={pull.url}
                              >
                                <GitMergeIcon
                                  className="trackerIcon mergeColor"
                                  size={24}
                                />
                                {pull.number}
                              </a>
                            </p>
                          );
                        }
                        totalHiddenPulls++;
                      }
                    }
                    if (closedPr !== undefined) {
                      pullIcons.push(closedPr);
                    }
                    if (pullIcons.length == 0) {
                      return <div>---</div>;
                    } else {
                      if (
                        totalHiddenPulls == 0 ||
                        totalHiddenPulls == 1
                      ) {
                        return <div>{pullIcons}</div>;
                      } else {
                        return (
                          <div>
                            {pullIcons}
                            <p className="iconRow">
                              ...and {totalHiddenPulls} closed
                            </p>
                          </div>
                        );
                      }
                    }
                  },
                  customSort: (a, b) =>
                    a["pullRequests"].length < b["pullRequests"].length,
                },
              ]}
              data={decompFileData}
              title="Decompilation Tracker"
              options={{
                search: true,
                exportButton: true,
                sorting: true,
                pageSize: 25,
                pageSizeOptions: [25, 50, 100],
              }}
              isLoading={false}
            />
          </ThemeProvider>
        </div>
      </div>
    </>
  );
}

export default function Jak1DecompProgress() {
  const [developerMode, setDeveloperMode] = useState(false);

  return (
    <Layout title="Progress" description="Project Progress">
      <main className="sl-theme-dark">
        <section>
          <div className="container">
            <div className="row">
              <FormGroup>
                <FormControlLabel control={<Switch checked={developerMode} onChange={() => setDeveloperMode(!developerMode)} />} label="Are you a developer?" />
              </FormGroup>
            </div>
            {developerMode ? <DeveloperModeContent /> : <NonDeveloperModeContent />}
          </div>
        </section>
      </main>
    </Layout>
  );
}
