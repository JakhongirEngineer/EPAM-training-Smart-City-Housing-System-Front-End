import React from "react";

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
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
function AdvertisementOnSale({ advertisement }) {
  const [token, setToken] = useToken();

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
        // onClick={() => setOpenDeleteDialog(true)}
      >
        Buy
      </Button>

      <Backdrop
        sx={{ color: "#ffd", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={false}
      >
        <CircularProgress color="error" />
      </Backdrop>
    </div>
  );
}

export default AdvertisementOnSale;
