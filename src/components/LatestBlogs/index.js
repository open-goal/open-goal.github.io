import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const BlogList = [
  {
    title: "Progress Report - May 2024",
    image: require("@site/blog/progress-report-may-2024/img/poster.png")
      .default,
    description: (
      <>
        Jak 3 decompilation is nearing completion.
      </>
    ),
    link: "/blog/progress-report-may-2024",
  },
  {
    title: "Progress Report - April 2024",
    image: require("@site/blog/progress-report-apr-2024/img/poster.png")
      .default,
    description: (
      <>
        Jak 3 progress is skyrocketing.
      </>
    ),
    link: "/blog/progress-report-apr-2024",
  },
  {
    title: "Progress Report - March 2024",
    image: require("@site/blog/progress-report-mar-2024/img/poster.png")
      .default,
    description: (
      <>
        Jak 3 decompilation progress continues, there will be a lot to share
        next month.
      </>
    ),
    link: "/blog/progress-report-mar-2024",
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
