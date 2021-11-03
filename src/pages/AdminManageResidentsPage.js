import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useLocalStorageReducer } from "../hooks/useLocalStorageReducer";
import { useToken } from "../hooks/useToken";
import residentsReducer from "../reducers/residentsReducer";
import AdminManageResidentsPageStyles from "../styles/AdminManageResidentsPageStyles";
import axios from "../utils/Axios";

import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Resident from "../components/Resident";
import AdminAppBar from "../components/AdminAppBar";
import ResidentList from "../components/ResidentList";

const useStyles = makeStyles(AdminManageResidentsPageStyles);

function AdminManageResidentsPage() {
  const classes = useStyles();
  const [token, setToken] = useToken();
  const [fetching, setFetching] = useState(true);
  const [fetchingError, setFetchingError] = useState(false);

  const [residents, dispatchResidents] = useLocalStorageReducer(
    "residents",
    "",
    residentsReducer
  );

  const handleGetResidents = async (pageNumber, pageSize, sortBy) => {
    let result;
    try {
      setFetching(true);
      setFetchingError(false);
      result = await axios.get("/admin/residents", {
        params: {
          pageNumber: pageNumber,
          pageSize: pageSize,
          sortBy: sortBy,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatchResidents({ type: "SET_RESIDENTS", payload: result.data });
    } catch (e) {
      setFetchingError(true);
    } finally {
      console.log(residents);
      setFetching(false);
    }
  };

  useEffect(() => {
    handleGetResidents(0, 100, "firstName");
  }, []);

  let content = <div></div>;

  if (fetchingError) {
    content = <div>Error while fetching</div>;
  } else if (fetching) {
    content = (
      <Stack spacing={1}>
        <Skeleton variant="text" width={210} height={118} />
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" width={210} height={118} />
      </Stack>
    );
  } else if (!fetching && !fetchingError) {
    content = <ResidentList residents={residents} />;
  }

  return (
    <div className={classes.container}>
      <AdminAppBar />
      {content}
    </div>
  );
}

export default AdminManageResidentsPage;
