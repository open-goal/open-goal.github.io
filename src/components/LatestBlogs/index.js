import React from 'react';

const BlogList = [
  {
    title: 'Progress Report - Apr. 2023',
    image: require('@site/blog/progress-report-apr-2023/img/poster.png').default,
    description: (
      <>
        Bug fixing for Jak 2 continues, along with various people working on improving their areas of interests in the project.
      </>
    ),
    link: "/blog/progress-report-apr-2023"
  },
  {
    title: 'Progress Report - Mar. 2023',
    image: require('@site/blog/progress-report-mar-2023/img/poster.png').default,
    description: (
      <>
        The theme for this month was definitely fixing bugs and that will likely continue for awhile.
      </>
    ),
    link: "/blog/progress-report-mar-2023"
  },
  {
    title: 'Progress Report - Feb. 2023',
    image: require('@site/blog/progress-report-feb-2023/img/poster.png').default,
    description: (
      <>
        Jak 2 is beginning to really take shape.  Decompilation is finally nearly completion with bug fixing and feature additions starting to ramp up.
      </>
    ),
    link: "/blog/progress-report-feb-2023"
  }
];

function BlogPost({ image, title, description, link }) {
  console.log(image);
  return (
    <a href={link} className="col col--4 text--center padding-horiz--md" style={{ textDecoration: "none", marginBottom: "2.5em" }}>
      <div style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url(${image})`
      }} className="blog-card">
        <h3 className="monospaced">{title}</h3>
        <p>{description}</p>
      </div></a>
  );
}

export default function LatestBlogs() {
  return (
    <section className="home-section">
      <div className="container">
        <div className="row" style={{marginBottom: "2em"}}>
          <h2 className="monospaced">Latest Blogs</h2>
        </div>
        <div className="row">
          {BlogList.map((props, idx) => (
            <BlogPost key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
