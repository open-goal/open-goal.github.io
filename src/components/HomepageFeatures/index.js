import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Native not Emulation',
    Svg: require('@site/static/img/undraw_visual_data.svg').default,
    description: (
      <>
        OpenGOAL is a fully fledged native x86 port. This means better performance, accuracy and compatibility
      </>
    ),
  },
  {
    title: 'Like Playing the Original',
    Svg: require('@site/static/img/undraw_split_testing.svg').default,
    description: (
      <>
        A major goal is ensuring the game feels the same as the original.  It should also look the same (but hopefully better!)
      </>
    ),
  },
  {
    title: 'Built From Scratch',
    Svg: require('@site/static/img/undraw_design_components.svg').default,
    description: (
      <>
        OpenGOAL is built from the ground up in an attempt to mimic the original GOAL language
      </>
    ),
  },
  {
    title: 'Extend and Modify',
    Svg: require('@site/static/img/undraw_add_color.svg').default,
    description: (
      <>
        Supporting modifications to the original game is a major goal of the project
      </>
    ),
  },
  {
    title: 'Quality of Life Increases',
    Svg: require('@site/static/img/undraw_tree_swing.svg').default,
    description: (
      <>
        We are not afraid to add features that increase quality of life or accessibility
      </>
    ),
  },
  {
    title: 'Learn About the Games',
    Svg: require('@site/static/img/undraw_reading_time.svg').default,
    description: (
      <>
        Explore the code for the original games to learn how they worked
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
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

export default function HomepageFeatures() {
  return (
    <section className="home-section {styles.features}">
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
