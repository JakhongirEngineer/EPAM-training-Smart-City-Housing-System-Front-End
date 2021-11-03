import {
  Backdrop,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  DialogContentText,
} from "@mui/material";
import React, { useState } from "react";
import { useToken } from "../hooks/useToken";
import axios from "../utils/Axios";
import House from "./House";

function Resident({
  advertisementUUIDs,
  email,
  firstName,
  lastName,
  houseCodes,
  residentCode,
}) {
  const styles = {
    resident: {
      display: "flex",
      flexDirection: "column",
      margin: "2rem",
      padding: "1rem",
      backgroundColor: "#e4e9f0",
      minWidth: "20rem",
      borderRadius: "0.5rem",
      boxShadow: "-0.1rem 0.1rem 0.5rem blue",
    },
    credential: {
      display: "flex",
      justifyContent: "space-between",
    },
  };

  const [token, setToken] = useToken();
  const [fetchingHouse, setFetchingHouse] = useState(false);
  const [currentHouse, setCurrentHouse] = useState(null);
  const [openHouse, setOpenHouse] = useState(false);

  const handleGetHouse = async (houseCode) => {
    setFetchingHouse(true);
    setOpenHouse(false);

    try {
      const response = await axios.get(
        `/admin/residents/${residentCode}/${houseCode}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCurrentHouse(response.data);
      setOpenHouse(true);
    } catch (e) {
      setOpenHouse(false);
    } finally {
      setFetchingHouse(false);
    }
  };

  return (
    <div style={styles.resident}>
      <div style={styles.credential}>
        <Typography variant="button">First Name:</Typography>
        <Typography variant="overline">{firstName}</Typography>
      </div>
      <div style={styles.credential}>
        <Typography variant="button">Last Name:</Typography>
        <Typography variant="overline">{lastName}</Typography>
      </div>
      <div style={styles.credential}>
        <Typography variant="button">Email:</Typography>
        <Typography variant="overline">{email}</Typography>
      </div>
      <div style={styles.credential}>
        <Typography variant="button">Resident Code:</Typography>
        <Typography variant="overline">{residentCode}</Typography>
      </div>

      <div style={styles.credential}>
        <Typography variant="button">Advertisement UUIDs:</Typography>
        <List dense={true}>
          {advertisementUUIDs.map((aduuid) => (
            <ListItem>
              <ListItemText primary={aduuid} />
            </ListItem>
          ))}
        </List>
      </div>

      <div style={styles.credential}>
        <Typography variant="button">House codes:</Typography>
        <List dense={true}>
          {houseCodes.map((houseCode) => (
            <ListItem>
              <Button onClick={() => handleGetHouse(houseCode)}>
                <ListItemText primary={houseCode} />
              </Button>
            </ListItem>
          ))}
        </List>
      </div>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={fetchingHouse}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Dialog open={openHouse}>
        <DialogTitle> House </DialogTitle>
        <DialogContent>
          <House house={currentHouse} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenHouse(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Resident;
