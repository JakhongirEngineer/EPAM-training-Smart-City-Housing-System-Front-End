import { Skeleton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import House from "../../components/House";
import ResidentsAppBar from "../../components/ResidentsAppBar";
import SkeletonPlaceholder from "../../components/SkeletonPlaceholder";
import { useLocalStorageReducer } from "../../hooks/useLocalStorageReducer";
import { useToken } from "../../hooks/useToken";
import residentCodeReducer from "../../reducers/residentCodeReducer";
import axios from "../../utils/Axios";

function ResidentHouses() {
  const [fetchingHouses, setFetchingHouses] = useState(true);
  const [houses, setHouses] = useState([]);
  const [token, setToken] = useToken();
  const [residentCode, residentCodeDispatch] = useLocalStorageReducer(
    "residentCode",
    0,
    residentCodeReducer
  );

  useEffect(() => {
    const getHouses = async () => {
      try {
        setFetchingHouses(true);
        const response = await axios.get(`/residents/${residentCode}/houses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHouses(response.data);
      } finally {
        setFetchingHouses(false);
      }
    };
    getHouses();
  }, []);
  let content = "";
  if (fetchingHouses) {
    content = <SkeletonPlaceholder />;
  } else {
    content = houses.map((h) => (
      <div
        style={{
          width: "30rem",
          backgroundColor: "#cee7f5",
          padding: "1rem",
          margin: "0.5rem",
          borderRadius: "1rem",
          boxShadow: "-0.1rem 0.5rem 0.4rem black",
        }}
      >
        <House house={h} />
      </div>
    ));
  }
  return (
    <div>
      <ResidentsAppBar />
      <Typography variant="h3"> My House(s) </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {content}
      </div>
    </div>
  );
}

export default ResidentHouses;
