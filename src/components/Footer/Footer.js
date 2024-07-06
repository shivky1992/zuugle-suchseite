import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";

const currentDate = new Date();
const currentYear = currentDate.getFullYear();

export default function Footer({}) {
  const { t } = useTranslation();

  return (
    <Box>
      <Box sx={{ height: "100px" }} />
      <Box sx={{ marginBottom: "50px"}}>
      <Grid container spacing={2}  sx={{ paddingBottom: "10px" }}>
        <Grid
          item
          xs={6}
          justifySelf="center"
          alignItems="center"
          style={{ alignItems: "flex-end" }}
        >
          <a href="https://www.bmk.gv.at/" target="_blank" rel="noreferrer">
            <img
              src="/app_static/img/Logo_BMK_gefoerdert_EN_RGB.png"
              height="122px"
              width="206px"
            />
          </a>
        </Grid>
        <Grid
          item
          xs={6}
          justifySelf="center"
          alignItems="center"
          style={{ alignItems: "flex-end" }}
        >
          <a href="https://www.alpconv.org/" target="_blank" rel="noreferrer">
            <img
              src="/app_static/img/Alpenkonvention_logo_gruen.png"
              height="75px"
              width="317px"
            />
          </a>
        </Grid>
      </Grid>
      </Box>

      <Box sx={{ width: "100%", borderTop: "1px solid #dfdfdf" }}>
      <Grid
        container
        sx={{
          padding: "20px 40px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Grid item xs={12} md={10} sx={{ paddingBottom: "100px" }}>
          <Grid container spacing={2}>
            <Grid
              item
              xs="auto"
              md={2}
              style={{ maxWidth: "30px" }}
              className={"footer-logo"}
            >
              <img
                src={`/app_static/img/logo140.png`}
                height={"20px"}
                width={"36px"}
              />
            </Grid>
            <Grid item xs md={3} >
              <a
                href="https://verein.bahn-zum-berg.at"
                target="_blank"
                rel="noreferrer"
              >
                <Typography
                  sx={{ marginLeft: "10px", textDecoration: "underline", whiteSpace: "nowrap" }}
                  className={"cursor-link"}
                >© {`${currentYear}`} Bahn zum Berg</Typography>
              </a>
            </Grid>
            <Grid item xs>
              <Typography
                sx={{ marginLeft: "10px", textDecoration: "underline" }}
                className={"cursor-link"}
                onClick={() =>
                  window.open(
                    `${window.location.protocol}//${window.location.host}/privacy`
                  )
                }
              >
                {t("start.datenschutz")}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography
                sx={{ marginLeft: "10px", textDecoration: "underline" }}
                className={"cursor-link"}
                onClick={() =>
                  window.open(
                    `${window.location.protocol}//${window.location.host}/imprint`
                  )
                }
              >
                {t("start.impressum")}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={2}>
          <Box sx={{ textAlign: "right" }} className={"social-icons"}>
            <img
              className={"cursor-link"}
              src={`/app_static/img/logo-facebook.png`}
              width={"20px"}
              height={"20px"}
              onClick={() =>
                window.open("https://www.facebook.com/bahnzumberg/")
              }
              loading="lazy"
            />{" "}
            &nbsp;{" "}
            <img
              className={"cursor-link"}
              src={`/app_static/img/logo-instagram.png`}
              width={"20px"}
              height={"20px"}
              style={{ marginLeft: "5px" }}
              onClick={() =>
                window.open("https://www.instagram.com/bahnzumberg/")
              }
              loading="lazy"
            />{" "}
            &nbsp;{" "}
            <img
              className={"cursor-link"}
              src={`/app_static/img/logo-github.png`}
              width={"20px"}
              height={"20px"}
              style={{ marginLeft: "5px" }}
              onClick={() => window.open("https://github.com/bahnzumberg/")}
              loading="lazy"
            />
          </Box>
        </Grid>
      </Grid>
      </Box>

    </Box>
  );
}
