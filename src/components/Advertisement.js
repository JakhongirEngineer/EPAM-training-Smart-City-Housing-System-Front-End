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
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import React, { useState } from "react";
import { useToken } from "../hooks/useToken";
import axios from "../utils/Axios";
import { useInputState } from "../hooks/useInputState";
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
function Advertisement({
  advertisement,
  deleteAdvertisement,
  editAdvertisement,
}) {
  const [token, setToken] = useToken();
  const [deleting, setDeleting] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [description, updateDescription, resetDescription] = useInputState(
    advertisement.description
  );
  const [phone, updatePhone, resetPhone] = useInputState(advertisement.phone);
  const [price, updatePrice, resetPrice] = useInputState(advertisement.price);
  const [title, updateTitle, resetTitle] = useInputState(advertisement.title);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editing, setEditing] = useState(false);

  const resetFields = () => {
    resetPhone();
    resetPrice();
    resetTitle();
    resetDescription();
  };

  const populateFields = () => {
    updateDescription({ target: { value: advertisement.description } });
    updatePhone({ target: { value: advertisement.phone } });
    updatePrice({ target: { value: advertisement.price } });
    updateTitle({ target: { value: advertisement.title } });
  };

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

  const handleEdit = async () => {
    try {
      setEditing(true);
      setOpenEditDialog(false);
      const editResponse = await axios.put(
        `/advertisements/${advertisement.residentCode}/${advertisement.uuid}`,
        {
          description,
          houseCode: advertisement.houseCode,
          phone,
          photoUrls: advertisement.photoUrls,
          price,
          residentCode: advertisement.residentCode,
          title,
          uuid: advertisement.uuid,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      editAdvertisement(editResponse.data);
    } catch (e) {
    } finally {
      setEditing(false);
    }
  };

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
        <Button
          style={{ backgroundColor: "green" }}
          onClick={() => {
            populateFields();
            setOpenEditDialog(true);
          }}
        >
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
        open={deleting || editing}
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

      {/* edit dialog */}

      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit your existing advertisement</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="houseCode"
            label="House Code"
            type="text"
            fullWidth
            variant="standard"
            value={advertisement.houseCode}
            disabled
          />
          <TextField
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={title}
            onChange={updateTitle}
          />

          <TextField
            margin="dense"
            id="price"
            label="Price"
            type="text"
            fullWidth
            variant="standard"
            value={price}
            onChange={updatePrice}
          />

          <TextField
            margin="dense"
            id="phone"
            label="Phone"
            type="text"
            fullWidth
            variant="standard"
            value={phone}
            onChange={updatePhone}
          />

          <TextField
            style={{ width: "100%" }}
            id="outlined-multiline-flexible"
            label="Description"
            multiline
            maxRows={20}
            value={description}
            onChange={updateDescription}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={resetFields}>Reset</Button>
          <Button onClick={handleEdit}>Edit</Button>
        </DialogActions>
      </Dialog>

      {/* edit dialog */}
    </div>
  );
}

export default Advertisement;
