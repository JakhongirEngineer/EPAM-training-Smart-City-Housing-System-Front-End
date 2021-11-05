import { Pagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AdvertisementOnSale from "../../components/AdvertisementOnSale";
import ResidentsAppBar from "../../components/ResidentsAppBar";
import SkeletonPlaceholder from "../../components/SceletonPlaceholder";
import { useToken } from "../../hooks/useToken";
import axios from "../../utils/Axios";

function BuyingAdvertisements() {
  const [advertisements, setAdvertisements] = useState([]);
  const [token, setToken] = useToken();
  const [page, setPage] = useState(0);
  const [fetching, setFetching] = useState(false);

  const handlePageChange = (e, value) => {
    fetchAdvertisements(value - 1);
    setPage(value);
  };

  const fetchAdvertisements = async (page) => {
    try {
      setFetching(true);
      let result = await axios.get("/buying/advertisements", {
        params: {
          pageNumber: page,
          pageSize: 3,
          sortBy: "price",
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAdvertisements(result.data);
    } catch (e) {
      setAdvertisements([]);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchAdvertisements(page);
  }, []);

  let content = "";
  if (fetching) {
    content = <SkeletonPlaceholder />;
  } else {
    content =
      advertisements.length === 0 ? (
        <Typography variant="h3">
          There are not any advertisements here.
        </Typography>
      ) : (
        advertisements.map((ad) => <AdvertisementOnSale advertisement={ad} />)
      );
  }

  return (
    <div>
      <ResidentsAppBar />
      <main
        style={{
          height: "90vh",
          backgroundColor: "#f0faf3",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          {content}
        </div>

        <Pagination
          count={10}
          variant="outlined"
          color="primary"
          page={page}
          style={{ alignSelf: "center", backgroundColor: "white" }}
          onChange={handlePageChange}
        />
      </main>
    </div>
  );
}

export default BuyingAdvertisements;
