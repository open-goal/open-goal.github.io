import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

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
  })

  useEffect(() => {
    interval = setInterval(() => {
      setCount(counterRef.current + 1);
      setCurrText(textToType.substring(0, counterRef.current));
    }, 75);
  }, []);

  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary')}>
      <div className="container">
        <div className="row center">
          <div className="col col--8 left-align">
            <div className="row">
              <div className="col col--12">
                <img className="img-logo" src="/img/text-logo.png"></img>
              </div>
            </div>
            <div className="row">
              <div className="col col--12">
                <h2 className="hero-subtitle">
                  <span>
                    <span id="tagline-prompt"><span className="hero-prompt-prefix">gc&gt; </span><span dangerouslySetInnerHTML={{ __html: currText }}></span></span>
                    <span className="typed-cursor typed-cursor--blink">|</span>
                  </span>
                  {textFinishedTyping && <div className="hero-tagline"><span>=&gt; {siteConfig.tagline}</span></div>}
                </h2>
              </div>
            </div>
          </div>
          <div className="col col--4">
            <div className="box disabled">
              <span className="icon">
                <img src="/img/download.svg" />
              </span>
              <div className="text">
                <h3 className="title">Download</h3>
                <p className="description">Everything you need to start playing with a copy of your original game</p>
                <span className="more">Coming Soon!&nbsp;&nbsp;<svg width="14" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M7.844 12.016c.199 0 .375-.07.527-.211l5.203-5.01a.728.728 0 00.246-.554.728.728 0 00-.246-.553L8.406.694a.84.84 0 00-.562-.21c-.211 0-.39.078-.536.237a.79.79 0 00-.22.553c0 .211.082.393.246.545l3.797 3.657H1.04a.765.765 0 00-.571.246.748.748 0 00-.22.58c.012.199.094.369.246.51.152.14.328.21.527.21h10.073L7.299 10.68a.776.776 0 00-.237.545.714.714 0 00.22.545c.152.164.34.246.562.246z" fill="#febb01" fill-rule="nonzero"></path></svg></span>
              </div>
              <a href="#" className="link">Read More</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="The Jak & Daxter Project">
      <HomepageHeader />
      <main className="sl-theme-dark">
        <HomepageFeatures />
        <section className="home-section alternate-bg-color">
          <div className="container">
            <div className="row center">
              <div className="col col--4">
                <h2>About the Project</h2>
                <p>The project officially started back in 2020 and has continued to grow more and more ambitious</p>
                <p>At a high level, our strategy is as follows:</p>
                <ul>
                  <li>decompile the original game code into human-readable GOAL code</li>
                  <li>develop our own compiler for GOAL and recompile game code for x86-64</li>
                  <li>create a tool to extract game assets into formats that can be easily viewed or modified</li>
                  <li>create tools to repack game assets into a format that our port uses</li>
                </ul>
              </div>
              <div className="col col--8">
                <div className="stacked-code-image">
                  <img src="/img/game-screen.png" className="screen"></img>
                  <img src="/img/game-code.png" className="code"></img>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="home-section">
          <div className="container">
            <div className="row center">
              <div className="col col--6">
                <h2>Watch our Progress</h2>
                <p>OpenGOAL is always improving, if you want to see the latest changes checkout the progress page</p>
                <a href="/progress">Check it Out</a>
              </div>
              <div className="col col--6">
                <h2>Read the Docs</h2>
                <p>While they can always be better, something is better than nothing.  If you are interested in assisting in developing, check out the docs here, as well as the documentation in the GitHub repo itself.</p>
                <a href="/docs/intro">Reference Docs</a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
