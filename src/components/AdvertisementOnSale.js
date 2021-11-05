import React, { useState } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useToken } from "../hooks/useToken";
import axios from "../utils/Axios";
import { useInputState } from "../hooks/useInputState";

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function AdvertisementOnSale({ advertisement, startMoneyTransfer }) {
  const [token, setToken] = useToken();
  const [openBuyDialog, setOpenBuyDialog] = useState(false);
  const [description, updateDescription, resetDescription] = useInputState("");

  const handleStartMoneyTransfer = () => {
    let advertisementUuid = advertisement.uuid;
    if (!description) {
      alert("provide a description");
      return;
    }
    startMoneyTransfer({ advertisementUuid, description });
    setOpenBuyDialog(false);
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
          <AccordionDetails style={{ maxHeight: "10rem", overflow: "scroll" }}>
            <Typography>{advertisement.description}</Typography>
          </AccordionDetails>
        </Accordion>
      </div>
      <Button
        style={{ backgroundColor: "red" }}
        onClick={() => setOpenBuyDialog(true)}
      >
        Buy
      </Button>

      <Backdrop
        sx={{ color: "#ffd", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={false}
      >
        <CircularProgress color="error" />
      </Backdrop>

      <Dialog
        open={openBuyDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenBuyDialog(false)}
        aria-describedby="dialog to get description for buying"
      >
        <DialogTitle>Description</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Please, provide description as to why you are buying this house.
          </DialogContentText>
          <TextField
            id="outlined-multiline-flexible"
            label="Description"
            multiline
            maxRows={5}
            value={description}
            onChange={updateDescription}
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenBuyDialog(false)}>Cancel</Button>
          <Button onClick={handleStartMoneyTransfer}>Proceed</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AdvertisementOnSale;
