import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import {
  HomepageGameplayFeatures,
  HomepageDevelopmentFeatures,
} from "@site/src/components/HomepageFeatures";
import LatestBlogs from "@site/src/components/LatestBlogs";
import LauncherDownloadLink from "@site/src/components/LauncherDownloadLink";
import useBaseUrl from "@docusaurus/useBaseUrl";
import {
  ProjectRoadmapIcon,
  CommentIcon,
  PencilIcon,
} from "@primer/octicons-react";

function HomepageHeader() {
  let textToType = `(format 0 "~S~%" (-> *site-config* tag-line))`;
  let colorizedText = `<span class="hero-bracket-color">(</span><span class="hero-identifier-color">format</span> <span class="hero-constant-color">0</span> <span class="hero-string-color">"~S~%"</span> <span class="hero-nested-bracket-color">(</span><span class="hero-identifier-color">-></span> <span class="hero-variable-color">*site-config* tag-line</span><span class="hero-nested-bracket-color">)</span><span class="hero-bracket-color">)</span>`;
  const [textFinishedTyping, setTextFinishedTyping] = useState(false);
  const [currText, setCurrText] = useState("");
  let interval;

  const initalState = 0;
  const [count, setCount] = useState(initalState);
  const counterRef = useRef(initalState);

  useEffect(() => {
    counterRef.current = count;
    if (count >= textToType.length) {
      clearInterval(interval);
      setCurrText(colorizedText);
      setTextFinishedTyping(true);
    }
  });

  useEffect(() => {
    interval = setInterval(() => {
      setCount(counterRef.current + 1);
      setCurrText(textToType.substring(0, counterRef.current));
    }, 25);
  }, []);

  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary")}>
      <div className="container">
        <div className="row center">
          <div className="col col--12 left-align">
            <div className="row">
              <div className="col col--12">
                <img className="img-logo" src="/img/text-logo.webp"></img>
              </div>
            </div>
            <div className="row">
              <div className="col col--12">
                <h2 className="hero-subtitle text-align-left">
                  <span>
                    <span id="tagline-prompt">
                      <span className="hero-prompt-prefix">gc&gt; </span>
                      <span
                        dangerouslySetInnerHTML={{ __html: currText }}
                      ></span>
                    </span>
                    <span className="typed-cursor typed-cursor--blink">|</span>
                  </span>
                  {textFinishedTyping && (
                    <div className="hero-tagline">
                      <span>=&gt; {siteConfig.tagline}</span>
                    </div>
                  )}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const [jak1Image, setJak1Image] = useState("/img/home/jak1/7am.webp");
  const [jak2Image, setJak2Image] = useState("/img/home/jak2/7am.webp");

  useEffect(() => {
    // Get the current date and time
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    // console.log(`Current Hour: ${currentHour}`)
    // Check the current time against specified times
    if (currentHour >= 23 || currentHour < 4) {
      setJak1Image("/img/home/jak1/11pm.webp");
      setJak2Image("/img/home/jak2/11pm.webp");
    } else if (currentHour >= 19) {
      setJak1Image("/img/home/jak1/7pm.webp");
      setJak2Image("/img/home/jak2/7pm.webp");
    } else if (currentHour >= 18) {
      setJak1Image("/img/home/jak1/6pm.webp");
      setJak2Image("/img/home/jak2/6pm.webp");
    } else if (currentHour >= 15) {
      setJak1Image("/img/home/jak1/3pm.webp");
      setJak2Image("/img/home/jak2/3pm.webp");
    } else if (currentHour >= 12) {
      setJak1Image("/img/home/jak1/12pm.webp");
      setJak2Image("/img/home/jak2/12pm.webp");
    } else if (currentHour >= 9) {
      setJak1Image("/img/home/jak1/9am.webp");
      setJak2Image("/img/home/jak2/9am.webp");
    } else if (currentHour >= 7) {
      setJak1Image("/img/home/jak1/7am.webp");
      setJak2Image("/img/home/jak2/7am.webp");
    } else {
      setJak1Image("/img/home/jak1/4am.webp");
      setJak2Image("/img/home/jak2/4am.webp");
    }
    // set images
    document.getElementById("jak1").classList.remove("hidden");
    document.getElementById("jak2").classList.remove("hidden");
  }, []);

  return (
    <Layout
      title={siteConfig.title}
      description="The unofficial native PC Port for Jak & Daxter"
    >
      <main className="sl-theme-dark">
        <div className="home-header">
          <div className="images">
            <div className="gradient-overlay"></div>
            <img id="jak1" className="hidden" src={useBaseUrl(jak1Image)}></img>
            <img id="jak2" className="hidden" src={useBaseUrl(jak2Image)}></img>
          </div>
          <div class="divider"></div>
          <div className="content">
            <div class="header-content">
              <HomepageHeader />
            </div>
            <LauncherDownloadLink />
          </div>
        </div>
        <section className="home-section">
          <div className="container indent">
            <div className="row" style={{ marginTop: "3em" }}>
              <h2 className="home-heading" style={{ fontWeight: "600" }}>
                Reviving the Language that Brought us the{" "}
                <span
                  style={{
                    fontWeight: "700",
                    color: "#26d97f",
                    filter: "drop-shadow(rgba(38, 217, 127, 0.3) 0px 0px 30px)",
                  }}
                >
                  Jak
                </span>{" "}
                and{" "}
                <span
                  style={{
                    fontWeight: "700",
                    color: "#febb01",
                    filter: "drop-shadow(rgb(254, 187, 1, 0.3) 0px 0px 30px)",
                  }}
                >
                  Daxter
                </span>{" "}
                Series.
              </h2>
            </div>
            <div className="row">
              <div className="col col--6">
                <p style={{ color: "#c6c6c6" }}>
                  Started in 2020, OpenGOAL has continuously improved and
                  evolved. With the first two games being considered playable
                  and a small but very active modding community, there is always
                  something to work towards.
                </p>
              </div>
            </div>
          </div>
        </section>
        <LatestBlogs />
        <section className="home-section">
          <div className="container indent">
            <div className="row" style={{ marginTop: "5em" }}>
              <h2 className="home-heading" style={{ fontWeight: "600" }}>
                Play the classics you loved with a{" "}
                <span
                  style={{
                    fontWeight: "700",
                    color: "rgb(255 76 77)",
                    filter: "drop-shadow(rgb(255, 76, 77, 0.3) 0px 0px 30px)",
                  }}
                >
                  twist
                </span>
              </h2>
            </div>
            <div className="row">
              <div className="col col--6">
                <p style={{ color: "#c6c6c6" }}>
                  The OpenGOAL version adds a variety of improvements and
                  accessibility options. Modders have even made creative
                  modifications and entirely new content.
                </p>
              </div>
            </div>
          </div>
        </section>
        <HomepageGameplayFeatures />
        <section className="home-section">
          <div className="container indent">
            <div className="row" style={{ marginTop: "5em" }}>
              <h2 className="home-heading" style={{ fontWeight: "600" }}>
                Freedom to{" "}
                <span
                  style={{
                    fontWeight: "700",
                    color: "rgb(71 235 235)",
                    filter: "drop-shadow(rgb(71, 235, 235, 0.3) 0px 0px 30px)",
                  }}
                >
                  create
                </span>{" "}
                and improve
              </h2>
            </div>
            <div className="row">
              <div className="col col--6">
                <p style={{ color: "#c6c6c6" }}>
                  Having the games decompiled and recompilable essentially means
                  you are only limited by time and effort. Additionally if you
                  are interested in technical areas like compiler development
                  and everything that involves, this is a project for you.
                </p>
              </div>
            </div>
          </div>
        </section>
        <HomepageDevelopmentFeatures />
        <section className="home-section" style={{ marginBottom: "10em" }}>
          <div className="container indent">
            <div
              className="row"
              style={{ marginTop: "5em", marginBottom: "2em" }}
            >
              <h2 className="home-heading" style={{ fontWeight: "600" }}>
                Further links and get involved
              </h2>
            </div>
            <a href="/docs/intro" class="home-link-row-wrapper">
              <div className="home-link-row green">
                <div className="row" style={{ alignItems: "center" }}>
                  <ProjectRoadmapIcon
                    size={36}
                    className="home-link-row-icon"
                    fill="#26d97f"
                  />
                  <span
                    style={{
                      marginLeft: "0.25em",
                      color: "#26d97f",
                      fontWeight: "700",
                      fontSize: "1.25em",
                    }}
                  >
                    Documentation
                  </span>
                </div>
                <div className="row">
                  <span style={{ marginLeft: "1em" }}>
                    Whilst they can always be improved, our documentation covers
                    a wide range of topics: from setting up the games, to the
                    underlying language, to examples of how to make your own
                    mods.
                  </span>
                </div>
              </div>
            </a>
            <a
              href="https://discord.gg/VZbXMHXzWv"
              class="home-link-row-wrapper"
            >
              <div
                className="home-link-row discord"
                style={{ marginTop: "1em" }}
              >
                <div className="row" style={{ alignItems: "center" }}>
                  <CommentIcon
                    size={36}
                    className="home-link-row-icon"
                    fill="#7289da"
                  />
                  <span
                    style={{
                      marginLeft: "0.25em",
                      color: "#7289da",
                      fontWeight: "700",
                      fontSize: "1.25em",
                    }}
                  >
                    Discord
                  </span>
                </div>
                <div className="row">
                  <span style={{ marginLeft: "1em" }}>
                    Join our discord community for announcements, support, and
                    more!
                  </span>
                </div>
              </div>
            </a>
            <a
              href="https://crowdin.com/profile/OpenGOALBot"
              class="home-link-row-wrapper"
            >
              <div className="home-link-row red" style={{ marginTop: "1em" }}>
                <div className="row" style={{ alignItems: "center" }}>
                  <PencilIcon
                    size={36}
                    className="home-link-row-icon"
                    fill="rgb(255, 76, 77)"
                  />
                  <span
                    style={{
                      marginLeft: "0.25em",
                      color: "rgb(255, 76, 77)",
                      fontWeight: "700",
                      fontSize: "1.25em",
                    }}
                  >
                    Translations
                  </span>
                </div>
                <div className="row">
                  <span style={{ marginLeft: "1em" }}>
                    Contribute translations for the games and related tools like
                    the launcher.
                  </span>
                </div>
              </div>
            </a>
          </div>
        </section>
        {/* links to translation */}
      </main>
    </Layout>
  );
}
