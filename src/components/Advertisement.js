import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Backdrop,
  Button,
  ButtonGroup,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import React, { useState } from "react";
import { useToken } from "../hooks/useToken";
import axios from "../utils/Axios";
/*
{
    "description": "string",
    "houseCode": 0,
    "phone": "string",
    "photoUrls": [
      "string"
    ],
    "price": 0,
    "residentCode": 0,
    "title": "string",
    "uuid": "string"
}
*/
const style = {
  advertisement: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf5e1",
    padding: "1rem",
    margin: "1rem",
    borderRadius: "0.4rem",
    boxShadow: "-0.4rem 0.5rem 0.3rem black",
    width: "20rem",
  },
  title: {},
  keyValue: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  description: {
    margin: "1rem",
    width: "100%",
  },
};
function Advertisement({ advertisement, deleteAdvertisement }) {
  const [token, setToken] = useToken();
  const [deleting, setDeleting] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      setOpenDeleteDialog(false);
      let result = await axios.delete(
        `/advertisements/${advertisement.residentCode}/${advertisement.uuid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.data === true) {
        deleteAdvertisement(advertisement.uuid);
      }
    } catch (e) {
    } finally {
      setDeleting(false);
    }
  };

  const handleEdit = () => {};

  return (
    <div style={style.advertisement}>
      <Typography variant="h4">{advertisement.title}</Typography>
      <div style={style.keyValue}>
        <Typography>Price:</Typography>
        <Typography>{advertisement.price}</Typography>
      </div>
      <div style={style.keyValue}>
        <Typography>Phone:</Typography>
        <Typography>{advertisement.phone}</Typography>
      </div>
      <div style={style.description}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Description</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{advertisement.description}</Typography>
          </AccordionDetails>
        </Accordion>
      </div>
      <ButtonGroup
        variant="contained"
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
        aria-label="outlined button group"
      >
        <Button style={{ backgroundColor: "green" }} onClick={handleEdit}>
          Edit
        </Button>
        <Button
          style={{ backgroundColor: "red" }}
          onClick={() => setOpenDeleteDialog(true)}
        >
          Delete
        </Button>
      </ButtonGroup>

      <Backdrop
        sx={{ color: "#ffd", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={deleting}
      >
        <CircularProgress color="error" />
      </Backdrop>

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        aria-labelledby="delete advertisement"
        aria-describedby="user is alerted if he/she wants to delete an advertisement"
      >
        <DialogTitle id="delete advertisement">
          {"Do you really want to delete this advertisement?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you want to proceed deleting this advertisement, press Yes,
            otherwise, press No
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>No</Button>
          <Button onClick={handleDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Advertisement;
