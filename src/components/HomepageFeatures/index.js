import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

const GameplayFeatureList = [
  {
    title: "Native not Emulation",
    Svg: require("@site/static/img/home/code.svg").default,
    description: (
      <>
        OpenGOAL is a fully fledged native x86-64 port. This means better
        performance, accuracy and compatibility
      </>
    ),
  },
  {
    title: "Like Playing the Original",
    Svg: require("@site/static/img/home/feels-same.svg").default,
    description: (
      <>
        A major goal is ensuring the game feels the same as the original. It
        should also look the same (but hopefully better!)
      </>
    ),
  },
  {
    title: "Quality of Life Increases",
    Svg: require("@site/static/img/home/life.svg").default,
    description: (
      <>
        We are not afraid to add features that increase quality of life or
        accessibility
      </>
    ),
  },
];

const DevelopmentFeatureList = [
  {
    title: "Built From Scratch",
    Svg: require("@site/static/img/home/mechanic.svg").default,
    description: (
      <>
        OpenGOAL is built from the ground up in an attempt to mimic the original
        GOAL language
      </>
    ),
  },
  {
    title: "Extend and Modify",
    Svg: require("@site/static/img/home/morph-gun.svg").default,
    description: (
      <>
        Supporting modifications to the original game is a major goal of the
        project
      </>
    ),
  },
  {
    title: "Learn About the Games",
    Svg: require("@site/static/img/home/thonking.svg").default,
    description: (
      <>Explore the code for the original games to learn how they worked</>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--3")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3 className="monospaced">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export function HomepageGameplayFeatures() {
  return (
    <section className={"home-section"}>
      <div className="container">
        <div
          className="row"
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          {GameplayFeatureList.map((props, idx) => (
            <div className={clsx("col col--3")}>
              <div className="text--center">
                <props.Svg className={styles.featureSvg} role="img" />
              </div>
            </div>
          ))}
        </div>
        <div
          className="row"
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          {GameplayFeatureList.map((props, idx) => (
            <div className={clsx("col col--3")}>
              <div className="text--center">
                <h3 className="monospaced">{props.title}</h3>
              </div>
            </div>
          ))}
        </div>
        <div className="row" style={{ justifyContent: "center" }}>
          {GameplayFeatureList.map((props, idx) => (
            <div className={clsx("col col--3")}>
              <div className="text--center">
                <p>{props.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomepageDevelopmentFeatures() {
  return (
    <section className={"home-section"}>
      <div className="container">
        <div className="row" style={{ justifyContent: "center" }}>
          {DevelopmentFeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
