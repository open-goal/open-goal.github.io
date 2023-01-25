import React from 'react';

const BlogList = [
  {
    title: 'Progress Report - Jan. 2023',
    image: require('@site/blog/progress-report-jan-2023/img/emerc-after.png').default,
    description: (
      <>
        First progress report to kick off the year.  This is going to be a big one!  Lots of missions are partially working and large portions of the remaining complicated systems in Jak 2 are on their way to completion.
      </>
    ),
    link: "/blog/progress-report-jan-2023"
  },
  {
    title: 'Progress Report - Dec. 2022',
    image: require('@site/blog/progress-report-dec-2022/img/winter.png').default,
    description: (
      <>
        As one would expect many of us took a bit of a break this month so it isn't as earth-shattering as last month's report, but there is still plenty to talk about.
      </>
    ),
    link: "/blog/progress-report-dec-2022"
  },
  {
    title: 'Progress Report - Nov. 2022',
    image: require('@site/blog/progress-report-nov-2022/img/jak-haven.png').default,
    description: (
      <>
        Quite a lot of developments near the end of this month to share!
      </>
    ),
    link: "/blog/progress-report-nov-2022"
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
