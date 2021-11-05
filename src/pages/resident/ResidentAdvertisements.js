import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import Advertisement from "../../components/Advertisement";
import ResidentsAppBar from "../../components/ResidentsAppBar";
import SkeletonPlaceholder from "../../components/SkeletonPlaceholder";
import { useInputState } from "../../hooks/useInputState";
import { useLocalStorageReducer } from "../../hooks/useLocalStorageReducer";
import { useToken } from "../../hooks/useToken";
import residentCodeReducer from "../../reducers/residentCodeReducer";
import axios from "../../utils/Axios";

function ResidentAdvertisements() {
  const [token, setToken] = useToken();
  const [residentCode, residentCodeDispatch] = useLocalStorageReducer(
    "residentCode",
    0,
    residentCodeReducer
  );
  const [advertisements, setAdvertisements] = useState([]);
  const [fetchingAdvertisements, setFetchingAdvertisements] = useState(true);
  const [startCreateAdvertisement, setStartCreateAdvertisement] =
    useState(false);
  const [postingAdvertisement, setPostingAdvertisement] = useState(false);

  const [description, updateDescription, resetDescription] = useInputState("");
  const [phone, updatePhone, resetPhone] = useInputState("");
  const [price, updatePrice, resetPrice] = useInputState();
  const [title, updateTitle, resetTitle] = useInputState("");
  const [houseCode, updateHouseCode, resetHouseCode] = useInputState(0);
  const [houses, setHouses] = useState([]);

  const resetFields = () => {
    resetPhone();
    resetPrice();
    resetTitle();
    resetHouseCode();
    resetDescription();
  };

  const handleSelectHouse = async (e) => {
    updateHouseCode(e);
    populateDescription(e.target.value);
  };

  const populateDescription = (code) => {
    const house = houses.filter((h) => h.code === code)[0];
    if (house != null) {
      let populatedDescription = `The house is ${house.condition} and it is ${
        house.furnished && "not"
      } furnished. The house type is ${house.houseType}, made out of ${
        house.materialType
      }, and it is heated by ${house.heating}. There are ${
        house.numberOfRooms
      }  rooms, the ceiling height is ${
        house.ceilingHeight
      }, and the total area is ${
        house.totalArea
      } square meters. It is located in district ${
        house.address.district
      } street ${house.address.street} home number ${house.address.homeNumber}`;
      updateDescription({ target: { value: populatedDescription } });
    }
  };

  const handleCreateAdvertisement = async () => {
    try {
      if (
        title === "" ||
        price === "" ||
        price < 0 ||
        phone === "" ||
        description === ""
      ) {
        alert("all fields must be filled properly");
        return;
      }

      setStartCreateAdvertisement(false);
      setPostingAdvertisement(true);

      let postResult = await axios.post(
        `/advertisements/${residentCode}`,
        {
          description,
          houseCode,
          phone,
          photoUrls: [],
          price,
          residentCode,
          title,
          uuid: uuid(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      getAdvertisements();
    } catch (e) {
    } finally {
      setPostingAdvertisement(false);
    }
  };

  const handleCreateAdvertisementCancel = () => {
    setStartCreateAdvertisement(false);
  };

  const getAdvertisements = async () => {
    try {
      setFetchingAdvertisements(true);
      const result = await axios.get(`/advertisements/${residentCode}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (Array.isArray(result.data)) {
        setAdvertisements(result.data);
      }
    } catch (e) {
    } finally {
      setFetchingAdvertisements(false);
    }
  };

  const getHouses = async () => {
    try {
      // setFetchingHouses(true);
      const response = await axios.get(`/residents/${residentCode}/houses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setHouses(response.data);
      console.log("HOUSES=> ", response.data);
    } finally {
      // setFetchingHouses(false);
    }
  };

  const deleteAdvertisement = (deletedAdvertisementUUID) => {
    setAdvertisements(
      advertisements.filter((ad) => ad.uuid != deletedAdvertisementUUID)
    );
  };

  const editAdvertisement = (editedAdvertisement) => {
    getAdvertisements();
  };
  useEffect(() => {
    getAdvertisements();
    getHouses();
  }, []);

  let content = "";
  if (fetchingAdvertisements) {
    content = <SkeletonPlaceholder />;
  } else {
    content =
      advertisements.length === 0 ? (
        <Typography variant="h2">
          You don't have any advertisements yet
        </Typography>
      ) : (
        advertisements.map((ad) => (
          <Advertisement
            advertisement={ad}
            deleteAdvertisement={deleteAdvertisement}
            editAdvertisement={editAdvertisement}
          />
        ))
      );
  }

  return (
    <div>
      <ResidentsAppBar />
      <main style={{ display: "flex", flexDirection: "column" }}>
        <Button
          variant="contained"
          style={{
            width: "15rem",
            backgroundColor: "yellow",
            color: "blue",
            alignSelf: "flex-end",
            padding: "0.5rem",
            margin: "0.5rem",
          }}
          onClick={() => setStartCreateAdvertisement(true)}
        >
          Create A New Advertisement{" "}
        </Button>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          {content}
        </div>
      </main>

      <Dialog
        open={startCreateAdvertisement}
        onClose={handleCreateAdvertisementCancel}
      >
        <DialogTitle>Create a new advertisement for your house</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You need to select a house that you want to advertise.
          </DialogContentText>

          {/*  */}

          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">House Code</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={houseCode}
                label="House Code"
                onChange={handleSelectHouse}
              >
                {houses.map((h) => (
                  <MenuItem value={h.code}>House Code: {h.code}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/*  */}
          <TextField
            autoFocus
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
          <Button onClick={handleCreateAdvertisementCancel}>Cancel</Button>
          <Button onClick={resetFields}> Reset </Button>
          <Button onClick={handleCreateAdvertisement}>Create</Button>
        </DialogActions>
      </Dialog>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={postingAdvertisement}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default ResidentAdvertisements;
