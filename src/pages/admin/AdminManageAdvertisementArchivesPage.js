import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useLocalStorageReducer } from "../../hooks/useLocalStorageReducer";
import { useToken } from "../../hooks/useToken";
import advertisementArchivesReducer from "../../reducers/advertisementArchivesReducer";
import AdminManageAdvertisementArchivesPageStyle from "../../styles/admin/AdminManageAdvertisementArchivesPageStyle";
import axios from "../../utils/Axios";

import AdminAppBar from "../../components/AdminAppBar";
import AdvertisementArchivesTable from "../../components/AdvertisementArchivesTable";
import { Backdrop, CircularProgress } from "@mui/material";
import SkeletonPlaceholder from "../../components/SkeletonPlaceholder";

const useStyles = makeStyles(AdminManageAdvertisementArchivesPageStyle);

function AdminManageAdvertisementArchivesPage() {
  const classes = useStyles();
  const [token] = useToken();
  const [fetching, setFetching] = useState(true);
  const [fetchingError, setFetchingError] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [advertisementArchives, dispatchAdvertisementArchives] =
    useLocalStorageReducer(
      "advertisementArchives",
      "",
      advertisementArchivesReducer
    );

  const handleGetAdvertisementArchives = async (
    pageNumber,
    pageSize,
    sortBy
  ) => {
    let result;
    try {
      setFetching(true);
      setFetchingError(false);
      result = await axios.get("/advertisementArchives", {
        params: {
          pageNumber: pageNumber,
          pageSize: pageSize,
          sortBy: sortBy,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatchAdvertisementArchives({
        type: "SET_ADVERTISEMENT_ARCHIVES",
        payload: result.data,
      });
    } catch (e) {
      setFetchingError(true);
    } finally {
      console.log(advertisementArchives);
      setFetching(false);
    }
  };

  const deleteArchive = async (uuid) => {
    let result;
    try {
      setDeleting(true);
      result = await axios.delete(`/advertisementArchives/${uuid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (result.data) {
        dispatchAdvertisementArchives({
          type: "SET_ADVERTISEMENT_ARCHIVES",
          payload: advertisementArchives.filter(
            (ar) => ar.advertisementArchiveUUID !== uuid
          ),
        });
      }
    } catch (e) {
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    handleGetAdvertisementArchives(0, 20, "price");
  }, []);

  let content = <div></div>;

  if (fetchingError) {
    content = (
      <div>
        Error while fetching or there is not an advertisement archive in the
        database
      </div>
    );
  } else if (fetching) {
    content = <SkeletonPlaceholder />;
  } else if (!fetching && !fetchingError) {
    content = (
      <AdvertisementArchivesTable
        advertisementArchives={advertisementArchives}
        deleteArchive={deleteArchive}
      />
    );
  }

  return (
    <div className={classes.container}>
      <AdminAppBar />
      {content}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={deleting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default AdminManageAdvertisementArchivesPage;
