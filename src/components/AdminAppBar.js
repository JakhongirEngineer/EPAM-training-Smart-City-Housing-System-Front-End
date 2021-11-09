import React, { useState } from "react";
import { useHistory } from "react-router";

import axios from "../utils/Axios";
import { useToken } from "../hooks/useToken";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Snackbar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function AdminAppBar() {
  const history = useHistory();
  const [token] = useToken();
  const [syncInProgress, setSyncInProgress] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSyncInDatabase = () => {
    setSyncInProgress(true);
    const syncInDatabase = async () => {
      let finalData;
      try {
        finalData = await axios.get("/admin/cityAdministration", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSnackbarOpen(true);
        console.log(finalData);
      } catch (e) {
        history.push("/login");
      } finally {
        setSyncInProgress(false);
      }
    };
    syncInDatabase();
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, height: "10vh" }}>
        <AppBar position="fixed">
          <Toolbar>
            {!matchesMD && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                cursor: "pointer",
                fontSize: matchesMD ? "0.7rem" : "1.4rem",
              }}
              onClick={() => history.push("/admin")}
            >
              Housing System
            </Typography>
            <div
              style={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "space-between",
                fontSize: matchesMD ? "0.7rem" : "1.4rem",
              }}
            >
              <Button
                color="inherit"
                onClick={() => history.push("/admin/residents")}
                style={{ fontSize: matchesMD ? "0.5rem" : "1.4rem" }}
              >
                Manage Residents
              </Button>
              <Button
                color="inherit"
                onClick={() => history.push("/admin/advertisementArchives")}
                style={{ fontSize: matchesMD ? "0.5rem" : "1.4rem" }}
              >
                Manage Advertisement Archives
              </Button>

              <Button
                color="inherit"
                onClick={handleSyncInDatabase}
                style={{ fontSize: matchesMD ? "0.5rem" : "1.4rem" }}
              >
                Sync in Database
              </Button>
              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={syncInProgress}
                onClick={handleSyncInDatabase}
              >
                <CircularProgress color="inherit" />
              </Backdrop>

              <Button
                color="inherit"
                onClick={() => history.push("/logout")}
                style={{ fontSize: matchesMD ? "0.5rem" : "1.4rem" }}
              >
                Logout
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </Box>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        message="Database has synced in with City Administration"
        key={"bottom left"}
      />
    </>
  );
}

export default AdminAppBar;
