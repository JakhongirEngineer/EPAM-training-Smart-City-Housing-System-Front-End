import { Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import AdminAppBar from "../../components/AdminAppBar";
import { useLocalStorageReducer } from "../../hooks/useLocalStorageReducer";
import principalReducer from "../../reducers/principalReducer";
import AdminMainPageStyles from "../../styles/admin/AdminMainPageStyles";

const useStyles = makeStyles(AdminMainPageStyles);

function AdminMainPage() {
  const classes = useStyles();

  const [principal] = useLocalStorageReducer(
    "principal",
    null,
    principalReducer
  );
  return (
    <div>
      <AdminAppBar />
      <div className={classes.container}>
        <div className={classes.info}>
          <div className={classes.infoItem}>
            <Typography
              variant="subtitle1"
              style={{ marginRight: "2rem", color: "blue" }}
            >
              {" "}
              MANAGE RESIDENTS{" "}
            </Typography>
            <Typography variant="body1">
              {" "}
              You can view all residents' information{" "}
            </Typography>
          </div>
          <div className={classes.infoItem}>
            <Typography
              variant="subtitle1"
              style={{ marginRight: "2rem", color: "blue" }}
            >
              {" "}
              MANAGE ADVERTISEMENT ARCHIVES{" "}
            </Typography>
            <Typography variant="body1">
              You can view and delete Advertisement archives
            </Typography>
          </div>

          <div className={classes.infoItem}>
            <Typography
              variant="subtitle1"
              style={{ marginRight: "2rem", color: "blue" }}
            >
              {" "}
              SYNC IN DATABASE{" "}
            </Typography>
            <Typography variant="body1">
              You can populate database with data from City Administration
              module
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

export default AdminMainPage;
