import React from "react";

const BlogList = [
  {
    title: "Progress Report - September 2023",
    image: require("@site/blog/progress-report-sept-2023/img/poster.png")
      .default,
    description: (
      <>
        One year of progress.
      </>
    ),
    link: "/blog/progress-report-sept-2023",
  },
  {
    title: "Progress Report - August 2023",
    image: require("@site/blog/progress-report-aug-2023/img/poster.png")
      .default,
    description: (
      <>
        Custom level support has gotten some love and Jak 2 got lots of small
        graphical improvements/fixes.
      </>
    ),
    link: "/blog/progress-report-aug-2023",
  },
  {
    title: "Progress Report - July 2023",
    image: require("@site/blog/progress-report-july-2023/img/poster.png")
      .default,
    description: (
      <>
        Intel macOS support and texture pack management has landed as well as a
        ton of progress on texture animations in Jak 2.
      </>
    ),
    link: "/blog/progress-report-july-2023",
  }
];

function BlogPost({ image, title, description, link }) {
  console.log(image);
  return (
    <a
      href={link}
      className="col col--4 text--center padding-horiz--md"
      style={{ textDecoration: "none", marginBottom: "2.5em" }}
    >
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url(${image})`,
        }}
        className="blog-card"
      >
        <h3 className="monospaced">{title}</h3>
        <p>{description}</p>
      </div>
    </a>
  );
}

export default function LatestBlogs() {
  return (
    <section className="home-section">
      <div className="container">
        <div className="row" style={{ marginBottom: "2em" }}>
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
