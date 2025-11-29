import { UAParser } from "ua-parser-js";
import React, { useState, useEffect } from "react";
import SplitButton from "../SplitButton";
import Button from "@mui/material/Button";

export default function LauncherDownloadLink({ hideTutorial = false }) {
  const [loading, setLoading] = useState(true);
  const [available, setAvailable] = useState(true);
  const [apiError, setApiError] = useState(false);

  const [detectedPlatform, setDetectedPlatform] = useState("");
  const [forPlatform, setForPlatform] = useState("");
  const [isUnsupportedArmPlatform, setIsUnsupportedArmPlatform] =
    useState(false);

  const [launcherVersion, setLauncherVersion] = useState("");
  const [downloadUrlAutomatic, setDownloadUrlAutomatic] = useState("#");
  const [downloadUrlWindows, setDownloadUrlWindows] = useState("#");
  const [downloadUrlLinux, setDownloadUrlLinux] = useState("#");
  const [downloadUrlMacOS, setDownloadUrlMacOS] = useState("#");
  const [downloadUrlMacOSARM, setDownloadUrlMacOSARM] = useState("#");

  const [deckyPluginVersion, setDeckyPluginVersion] = useState("");
  const [deckyPluginDownloadUrl, setDeckyPluginDownloadUrl] = useState("");

  const fetchReleaseData = async () => {
    const parser = new UAParser();
    const platformLower = parser.getOS().name.toLowerCase();
    setDetectedPlatform(
      `${parser.getOS().name} - ${parser.getCPU().architecture}`,
    );
    const isWindows = platformLower === "windows";
    const isMacOS = platformLower === "mac os" || platformLower === "macos";
    const isLinux = !isWindows && !isMacOS;
    const isARM =
      parser.getCPU().architecture === "arm" ||
      parser.getCPU().architecture === "arm64";

    const response = await fetch(
      `https://api.github.com/repos/open-goal/launcher/releases/latest`,
    );
    if (response.status != 200) {
      setLoading(false);
      setApiError(true);
      return;
    }
    const data = await response.json();
    setLauncherVersion(data.tag_name);
    for (const asset of data.assets) {
      if (asset.name.match(/^.*\.msi$/)) {
        setAvailable(true);
        setDownloadUrlWindows(asset.browser_download_url);
        if (isWindows) {
          setForPlatform("Windows");
          setDownloadUrlAutomatic(asset.browser_download_url);
        }
      } else if (asset.name.match(/^.*\.AppImage$/)) {
        setAvailable(true);
        setDownloadUrlLinux(asset.browser_download_url);
        if (isLinux) {
          setForPlatform("Linux");
          setDownloadUrlAutomatic(asset.browser_download_url);
        }
      } else if (asset.name.match(/^.*_x64.*\.dmg$/)) {
        setAvailable(true);
        setDownloadUrlMacOS(asset.browser_download_url);
        if (isMacOS && !isARM) {
          setForPlatform("Intel MacOS");
          setDownloadUrlAutomatic(asset.browser_download_url);
        }
      } else if (asset.name.match(/^.*_aarch64.*\.dmg$/)) {
        setAvailable(true);
        setDownloadUrlMacOSARM(asset.browser_download_url);
        if (isMacOS && isARM) {
          setForPlatform("Apple Silicon");
          setDownloadUrlAutomatic(asset.browser_download_url);
        }
      }
    }

    const deckyPluginResponse = await fetch(
      `https://api.github.com/repos/open-goal/decky-plugin/releases/latest`,
    );
    if (deckyPluginResponse.status != 200) {
      setLoading(false);
      setApiError(true);
      return;
    }
    const deckyPluginData = await deckyPluginResponse.json();
    setDeckyPluginVersion(deckyPluginData.tag_name);
    for (const asset of deckyPluginData.assets) {
      if (asset.name.match(/^.*\.zip$/)) {
        setDeckyPluginDownloadUrl(asset.browser_download_url);
        break;
      }
    }

    setIsUnsupportedArmPlatform(isARM && !isMacOS);
    setLoading(false);
  };

  useEffect(() => {
    fetchReleaseData();
  }, []);

  const downloadText = (isDeckyPlugin) => {
    if (isDeckyPlugin) {
      return <>Decky Plugin {deckyPluginVersion}&nbsp;&nbsp;</>;
    } else {
      return (
        <>
          Launcher {launcherVersion} for {forPlatform}&nbsp;&nbsp;
        </>
      );
    }
  };

  function DownloadContent(props) {
    if (loading) {
      return (
        <div className="text">
          <h3 className="title">
            {props.isDeckyPlugin
              ? "Download Decky Plugin"
              : "Download Launcher"}
          </h3>
          <p className="description">Fetching latest release...</p>
        </div>
      );
    } else {
      return (
        <div className="text">
          <h3 className="title">
            {props.isDeckyPlugin
              ? "Download Decky Plugin"
              : "Download Launcher"}
          </h3>
          <p className="description">
            Everything you need to start playing with a copy of your original
            game{props.isDeckyPlugin ? " on your SteamDeck" : null}
          </p>
          <span className="more">
            {downloadText(props.isDeckyPlugin)}
            <svg width="14" height="12" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.844 12.016c.199 0 .375-.07.527-.211l5.203-5.01a.728.728 0 00.246-.554.728.728 0 00-.246-.553L8.406.694a.84.84 0 00-.562-.21c-.211 0-.39.078-.536.237a.79.79 0 00-.22.553c0 .211.082.393.246.545l3.797 3.657H1.04a.765.765 0 00-.571.246.748.748 0 00-.22.58c.012.199.094.369.246.51.152.14.328.21.527.21h10.073L7.299 10.68a.776.776 0 00-.237.545.714.714 0 00.22.545c.152.164.34.246.562.246z"
                fill="#febb01"
                fillRule="nonzero"
              ></path>
            </svg>
          </span>
        </div>
      );
    }
  }

  return (
    <React.Fragment>
      <div className="downloadWrapper">
        <SplitButton
          isLoading={loading}
          isDisabled={!available}
          primaryButtonLabel={`${forPlatform} Launcher @ ${launcherVersion}`}
          primaryButtonUrl={downloadUrlAutomatic}
          secondaryButtonLabels={[
            `Windows Launcher @ ${launcherVersion}`,
            `Linux Launcher @ ${launcherVersion}`,
            `Intel MacOS Launcher @ ${launcherVersion}`,
            `Apple Silicon Launcher @ ${launcherVersion}`,
            `Decky Plugin @ ${deckyPluginVersion}`,
          ]}
          secondaryButtonUrls={[
            downloadUrlWindows,
            downloadUrlLinux,
            downloadUrlMacOS,
            downloadUrlMacOSARM,
            deckyPluginDownloadUrl,
          ]}
        />
        {hideTutorial ? null : (
          <Button
            onClick={() => {
              window.location.href = "/docs/usage/installation/";
            }}
            sx={{
              fontFamily: "Roboto Mono",
              backgroundColor: "rgb(49, 28, 16)",
              color: "#f77223",
              padding: "0.5em",
              fontWeight: 600,
              fontSize: "1em",
              borderColor: "rgb(247, 92, 0)",
              ":hover": {
                backgroundColor: "rgb(77, 42, 22)",
              },
            }}
          >
            Getting Started
          </Button>
        )}
      </div>
      {apiError || !available || isUnsupportedArmPlatform ? (
        <div className="row" style={{ justifyContent: "center", gap: "1em" }}>
          <p>
            {apiError
              ? "Couldn't fetch latest release, API error or you are rate-limited!"
              : null}
            <br />
            {isUnsupportedArmPlatform
              ? `Launcher only supports Windows, Linux and Intel MacOS. Detected platform: ${detectedPlatform}`
              : null}
          </p>
        </div>
      ) : null}
    </React.Fragment>
  );
}
