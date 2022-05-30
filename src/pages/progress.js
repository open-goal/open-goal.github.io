import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

function truncateString(str, num) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}

function LatestChanges() {

  const [recentPRs, setRecentPRs] = useState([]);

  useEffect(async () => {
    const response = await fetch(
      `https://api.github.com/search/issues?q=org:open-goal+is:pr+is:merged&sort=updated`
    );
    const data = await response.json();
    const numPRs = 5;
    let items = [];
    for (var i = 0; i < numPRs; i++) {
      var pr = data.items[i];
      if (pr.body == null || pr.body.length == 0) {
        pr.body = "No Description";
      }
      pr.body = truncateString(pr.body, 250);

      if (pr.repository_url.includes("jak-project")) {
        pr.icon = "controller";
        pr.color = "primary";
      } else if (pr.repository_url.includes("launcher")) {
        pr.icon = "arrow-up-square";
        pr.color = "warning"
      } else {
        pr.icon = "question-circle";
        pr.color ="neutral";
      }

      items.push(pr);
    }
    setRecentPRs(items);
  }, []);

  if (recentPRs.length == 0) {
    return (
      <sl-spinner style={{fontSize: "3rem"}}></sl-spinner>
    );
  } else {
    return (
      <div>
        {recentPRs.map((pr) => (
          <sl-alert variant={pr.color} open class="change-card">
            <sl-icon slot="icon" name={pr.icon}></sl-icon>
            <a href={pr.html_url} target="_blank"><strong>{pr.title}</strong> - By {pr.user.login}</a><br/>
            {pr.body}
          </sl-alert>
        ))}
      </div>
    );
  }
}

export default function Progress() {
  return (
    <Layout
      title="Progress"
      description="Project Progress">
      <main className="sl-theme-dark">
        <section className="home-section">
          <div className="container">
            <div className="row">
              <div className="col">
                <h1>Latest Changes</h1>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col center">
                <LatestChanges />
              </div>
            </div>
          </div>
        </section>
        <section className="home-section alternate-bg-color">
          <div className="container">
            <div className="row">
              <div className="col">
                <h1>Jak & Daxter - The Precursor Legacy</h1>
                <a href="https://github.com/orgs/open-goal/projects/1/views/1" target="_blank">Tracking Board</a>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col hotspots">
                <img src="/img/jak1/milestones-a.png"></img>
                <sl-tooltip content="The font renderer was the first to be added in August 9th 2021 - PR#752">
                  <sl-badge variant="danger" pill pulse id="hs-jak1-1" class="hotspot">1</sl-badge>
                </sl-tooltip>
                <sl-tooltip content="The tfrag renderer handles the bulk of the static background, first added in November 13th 2021 - PR#958">
                  <sl-badge variant="danger" pill pulse id="hs-jak1-4" class="hotspot">4</sl-badge>
                </sl-tooltip>
                <sl-tooltip content="The TIE renderer also handles the bulk of the static background, first added in December 19th 2021 - PR#1026">
                  <sl-badge variant="danger" pill pulse id="hs-jak1-5" class="hotspot">5</sl-badge>
                </sl-tooltip>
                <sl-tooltip content="Collision system added - January 15th 2022 - PR#1076">
                  <sl-badge variant="warning" pill pulse id="hs-jak1-7" class="hotspot">7</sl-badge>
                </sl-tooltip>
                <sl-tooltip content="MERC renderer added to draw things like Jak and enemies - February 3rd 2022 - PR#1124">
                  <sl-badge variant="danger" pill pulse id="hs-jak1-8" class="hotspot">8</sl-badge>
                </sl-tooltip>
                <sl-tooltip content="Eye renderer added - February 15th 2022 - PR#1169">
                  <sl-badge variant="danger" pill pulse id="hs-jak1-9" class="hotspot">9</sl-badge>
                </sl-tooltip>
                <sl-tooltip content="Generic renderer added, draw things like Jak's hair - March 6th 2022 - PR#1221">
                  <sl-badge variant="danger" pill pulse id="hs-jak1-10" class="hotspot">10</sl-badge>
                </sl-tooltip>
                <sl-tooltip content="Shadow renderer added - March 26th 2022 - PR#1247">
                  <sl-badge variant="danger" pill pulse id="hs-jak1-12" class="hotspot">12</sl-badge>
                </sl-tooltip>
                <sl-tooltip content="Shrub renderer added - March 29th 2022 - PR#1261">
                  <sl-badge variant="danger" pill pulse id="hs-jak1-13" class="hotspot">13</sl-badge>
                </sl-tooltip>
                <sl-tooltip content="Audio support added - April 19th 2022 - PR#1325">
                  <sl-badge variant="warning" pill pulse id="hs-jak1-14" class="hotspot">14</sl-badge>
                </sl-tooltip>
                <sl-tooltip content="Generic TIE renderer added - April 29th 2022 - PR#1341">
                  <sl-badge variant="danger" pill pulse id="hs-jak1-15" class="hotspot">15</sl-badge>
                </sl-tooltip>
                {/* TODO - sprite distort */}
              </div>
            </div>
            <div className="row mt-2">
              <div className="col hotspots">
                <img src="/img/jak1/milestones-b.png"></img>
                <sl-tooltip content="The beginnings of the particle system was added - September 18th 2021 - PR#849">
                  <sl-badge variant="danger" pill pulse id="hs-jak1-2" class="hotspot">2</sl-badge>
                </sl-tooltip>
                <sl-tooltip content="Sky renderer and time of day support was added - October 5th 2021 - PR#883">
                  <sl-badge variant="danger" pill pulse id="hs-jak1-3" class="hotspot">3</sl-badge>
                </sl-tooltip>
                <sl-tooltip content="Wind effect added to TIE on January 2nd 2022 - PR#1046">
                  <sl-badge variant="danger" pill pulse id="hs-jak1-6" class="hotspot">6</sl-badge>
                </sl-tooltip>
                <sl-tooltip content="Ocean renderer added - March 8th 2022 - PR#1230">
                  <sl-badge variant="danger" pill pulse id="hs-jak1-11" class="hotspot">11</sl-badge>
                </sl-tooltip>
              </div>
            </div>
          </div>
        </section>
        <section className="home-section">
          <div className="container">
            <div className="row">
              <div className="col">
                <h1>Jak 2</h1>
                <p>Stay Tuned!</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
