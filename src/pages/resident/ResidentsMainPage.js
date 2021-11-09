import React from "react";
import { Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useLocalStorageReducer } from "../../hooks/useLocalStorageReducer";
import principalReducer from "../../reducers/principalReducer";
import ResidentsMainPageStyles from "../../styles/resident/ResidentsMainPageStyles";
import ResidentsAppBar from "../../components/ResidentsAppBar";

const useStyles = makeStyles(ResidentsMainPageStyles);

function ResidentsMainPage() {
  const classes = useStyles();

  return (
    <div>
      <ResidentsAppBar />
      <div className={classes.container}>
        <div className={classes.info}>
          <div className={classes.infoItem}>
            <Typography
              variant="subtitle1"
              style={{ marginRight: "2rem", color: "blue" }}
            >
              {" "}
              My House(s){" "}
            </Typography>
            <Typography variant="body1"> You can see your house(s) </Typography>
          </div>
          <div className={classes.infoItem}>
            <Typography
              variant="subtitle1"
              style={{ marginRight: "2rem", color: "blue" }}
            >
              {" "}
              My Advertisements{" "}
            </Typography>
            <Typography variant="body1">
              You can view, edit, and delete your advertisements
            </Typography>
          </div>

          <div className={classes.infoItem}>
            <Typography
              variant="subtitle1"
              style={{ marginRight: "2rem", color: "blue" }}
            >
              {" "}
              Advertisements/Buy a house{" "}
            </Typography>
            <Typography variant="body1">
              You can view advertisements, and buy a house
            </Typography>
          </div>

          <div className={classes.infoItem}>
            <Typography
              variant="subtitle1"
              style={{ marginRight: "2rem", color: "blue" }}
            >
              {" "}
              LOGOUT{" "}
            </Typography>
            <Typography variant="body1">
              You can log out of the Housing System
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResidentsMainPage;
