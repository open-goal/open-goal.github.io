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

    setIsUnsupportedArmPlatform(isARM && !isMacOS);
    setLoading(false);
  };

  useEffect(() => {
    fetchReleaseData();
  }, []);

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
          ]}
          secondaryButtonUrls={[
            downloadUrlWindows,
            downloadUrlLinux,
            downloadUrlMacOS,
            downloadUrlMacOSARM,
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
      {forPlatform === "Linux" && !hideTutorial ? (
        <div className="row" style={{ justifyContent: "center", gap: "1em", marginTop: "1em" }}>
          <p style={{ maxWidth: "500px" }}>
            If you are on the <strong>SteamDeck</strong>, the Decky plugin has been deprecated in favor of the launcher.
            <br></br>
            Read the following <a href="/docs/usage/installation">documentation</a> if you need assistance getting it setup.
          </p>
        </div>
      ) : null}
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
