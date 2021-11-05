import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Pagination,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AdvertisementOnSale from "../../components/AdvertisementOnSale";
import ResidentsAppBar from "../../components/ResidentsAppBar";
import SkeletonPlaceholder from "../../components/SkeletonPlaceholder";
import { useLocalStorageReducer } from "../../hooks/useLocalStorageReducer";
import { useToken } from "../../hooks/useToken";
import residentCodeReducer from "../../reducers/residentCodeReducer";
import axios from "../../utils/Axios";

function BuyingAdvertisements() {
  const [advertisements, setAdvertisements] = useState([]);
  const [token] = useToken();
  const [page, setPage] = useState(0);
  const [fetching, setFetching] = useState(false);
  const [startProceedingToTransfer, setStartProceedingToTransfer] =
    useState(false);
  const [proceedSuccess, setProceedSuccess] = useState(false);
  const [proceedResult, setProceedResult] = useState();
  const [openRedirectDialog, setOpenRedirectDialog] = useState(false);
  const [residentCode] = useLocalStorageReducer(
    "residentCode",
    0,
    residentCodeReducer
  );

  useEffect(() => {
    fetchAdvertisements(page);
  }, []);

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

  const startMoneyTransfer = async ({ advertisementUuid, description }) => {
    try {
      setOpenRedirectDialog(false);
      setStartProceedingToTransfer(true);
      let response = await axios.post(
        `/buying/advertisements/${advertisementUuid}`,
        {
          description,
          residentCardNumberSender: residentCode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setProceedResult(response.data);
        setProceedSuccess(true);
      } else {
        setProceedSuccess(false);
      }
    } catch (e) {
      setProceedSuccess(false);
    } finally {
      setStartProceedingToTransfer(false);
      setOpenRedirectDialog(true);
    }
  };

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
        advertisements.map((ad) => (
          <AdvertisementOnSale
            advertisement={ad}
            startMoneyTransfer={startMoneyTransfer}
          />
        ))
      );
  }

  const handleRedirectToTransfer = () => {
    setOpenRedirectDialog(false);
  };

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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={startProceedingToTransfer}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Dialog
        open={openRedirectDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"First step of buying result"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {proceedSuccess
              ? "You need to be redirected to the payment service. Please, press Continue to transfer"
              : "The advertisement seems to be booked, you cannot buy it now."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {proceedSuccess ? (
            <Button onClick={handleRedirectToTransfer} autoFocus>
              <a target="_blank" href={`${proceedResult.object}`}>
                Continue to transfer
              </a>
            </Button>
          ) : (
            <Button onClick={() => setOpenRedirectDialog(false)}>
              Go back
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default BuyingAdvertisements;
