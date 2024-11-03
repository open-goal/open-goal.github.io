import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const BlogList = [
  {
    title: "Progress Report - October 2024",
    image: require("@site/blog/progress-report-oct-2024/img/poster.png")
      .default,
    description: (
      <>
        Yet more fixes for Jak 3 and custom levels.
      </>
    ),
    link: "/blog/progress-report-oct-2024",
  },
  {
    title: "Progress Report - September 2024",
    image: require("@site/blog/progress-report-sept-2024/img/poster.png")
      .default,
    description: (
      <>
        Plenty of small Jak 3 bugfixes and some custom level improvements.
      </>
    ),
    link: "/blog/progress-report-sept-2024",
  },
  {
    title: "Progress Report - August 2024",
    image: require("@site/blog/progress-report-aug-2024/img/poster.png")
      .default,
    description: (
      <>
        A slower month, but modders are having fun with some new animation tooling.
      </>
    ),
    link: "/blog/progress-report-aug-2024",
  }
];

function BlogPost({ image, title, description, link, height, backgroundSvg }) {
  return (
    <Card
      sx={{
        borderRadius: "1em",
        borderTopLeftRadius: "0",
        borderTopRightRadius: "0",
        width: "100%",
      }}
    >
      <CardActionArea href={link} sx={{ ":hover": { textDecoration: "none" } }}>
        <CardMedia component="img" height={height} image={image} alt={title} />
        <CardContent
          sx={{
            filter: "contrast(120%) brightness(100%)",
            background: backgroundSvg,
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="home-blog-title monospaced"
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            className="home-blog-description"
            sx={{ letterSpacing: "unset" }}
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default function LatestBlogs() {
  return (
    <section className="home-section">
      <div className="container">
        <div className="row" style={{ marginTop: "2em" }}>
          <div className="col col--6">
            <BlogPost
              {...BlogList[0]}
              height={"500px"}
              backgroundSvg={`linear-gradient(134deg, rgb(254, 167, 1), rgba(146, 40, 157, 0.7)), url("data:image/svg+xml,%3Csvg viewBox='0 0 317 317' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}
            />
          </div>
          <div className="col col--6 home-blogs-right">
            <div className="row">
              <BlogPost
                {...BlogList[1]}
                height={"200px"}
                backgroundSvg={`linear-gradient(220deg, rgb(255, 190, 11), rgba(255, 151, 17, 0.54)),
	url("data:image/svg+xml,%3Csvg viewBox='0 0 317 317' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");`}
              />
            </div>
            <div className="row" style={{ marginTop: "auto" }}>
              <BlogPost
                {...BlogList[2]}
                height={"200px"}
                backgroundSvg={`linear-gradient(220deg, rgb(255, 190, 11), rgba(255, 151, 17, 0.54)),
	url("data:image/svg+xml,%3Csvg viewBox='0 0 317 317' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
