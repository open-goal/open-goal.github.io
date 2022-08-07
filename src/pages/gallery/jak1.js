import React from 'react';
import Layout from '@theme/Layout';

// NOTE - this file is generated at build time, don't touch it!
// - if you know of a better way to do this, contribute it!

import image0 from '/gallery/jak1/jak-and-daxter-are-stunned_2022-02-04.png';
import image1 from '/gallery/jak1/lurker-chilling_2022-02-04.png';
import image2 from '/gallery/jak1/robotboss-appears_2022-02-04.png';
import image3 from '/gallery/jak1/light-cave_2022-02-02.png';
import image4 from '/gallery/jak1/entity-debugging_2022-01-31.png';
import image5 from '/gallery/jak1/bones-see-light_2022-01-28.png';
import image6 from '/gallery/jak1/can-save-and-load_2022-01-11.png';
import image7 from '/gallery/jak1/starry-sky_2022-01-11.png';
import image8 from '/gallery/jak1/boggy-reflections_2022-01-10.png';
import image9 from '/gallery/jak1/too-much-fog_2022-01-10.png';

export default function render() {
  return (
    <Layout
      title="__TITLE__"
      description="Various pictures and videos we took while working on Jak 1">
      <main className="sl-theme-dark">
        <section>
          <div id="galleryContainer" className="container-fluid">
            <div className="row">
              <div className="col col--12">
                <h1>Jak 1 Development Gallery</h1>
              </div>
            </div>
            <div className="row center">
              <div className="col col--4">
                <img loading="lazy" src={image0} alt="Jak And Daxter Are Stunned - 2022-02-04" />
                <blockquote>Jak And Daxter Are Stunned</blockquote>
              </div>
              <div className="col col--4">
                <img loading="lazy" src={image1} alt="Lurker Chilling - 2022-02-04" />
                <blockquote>Lurker Chilling</blockquote>
              </div>
              <div className="col col--4">
                <img loading="lazy" src={image2} alt="Robotboss Appears - 2022-02-04" />
                <blockquote>Robotboss Appears</blockquote>
              </div>
            </div>
            <div className="row center">
              <div className="col col--4">
                <iframe width="100%" height="300px" src="https://www.youtube.com/embed/ZO7A22btJc0"></iframe>
                <blockquote>BLERC</blockquote>
              </div>
              <div className="col col--4">
                <img loading="lazy" src={image3} alt="Light Cave - 2022-02-02" />
                <blockquote>Light Cave</blockquote>
              </div>
              <div className="col col--4">
                <img loading="lazy" src={image4} alt="Entity Debugging - 2022-01-31" />
                <blockquote>Entity Debugging</blockquote>
              </div>
            </div>
            <div className="row center">
              <div className="col col--4">
                <img loading="lazy" src={image5} alt="Bones See Light - 2022-01-28" />
                <blockquote>Bones See Light</blockquote>
              </div>
              <div className="col col--4">
                <iframe width="100%" height="300px" src="https://www.youtube.com/embed/6dJhyVqqq5Q"></iframe>
                <blockquote>target</blockquote>
              </div>
              <div className="col col--4">
                <img loading="lazy" src={image6} alt="Can Save And Load - 2022-01-11" />
                <blockquote>Can Save And Load</blockquote>
              </div>
            </div>
            <div className="row center">
              <div className="col col--4">
                <img loading="lazy" src={image7} alt="Starry Sky - 2022-01-11" />
                <blockquote>Starry Sky</blockquote>
              </div>
              <div className="col col--4">
                <img loading="lazy" src={image8} alt="Boggy Reflections - 2022-01-10" />
                <blockquote>Boggy Reflections</blockquote>
              </div>
              <div className="col col--4">
                <img loading="lazy" src={image9} alt="Too Much Fog - 2022-01-10" />
                <blockquote>Too Much Fog</blockquote>
              </div>
            </div>

          </div>
        </section>
      </main>
    </Layout>
  );
}
