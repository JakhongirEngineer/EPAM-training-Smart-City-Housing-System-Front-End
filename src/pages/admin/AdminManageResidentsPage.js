import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useLocalStorageReducer } from "../../hooks/useLocalStorageReducer";
import { useToken } from "../../hooks/useToken";
import residentsReducer from "../../reducers/residentsReducer";
import AdminManageResidentsPageStyles from "../../styles/admin/AdminManageResidentsPageStyles";
import axios from "../../utils/Axios";
import AdminAppBar from "../../components/AdminAppBar";
import ResidentList from "../../components/ResidentList";
import SkeletonPlaceholder from "../../components/SkeletonPlaceholder";

const useStyles = makeStyles(AdminManageResidentsPageStyles);

function AdminManageResidentsPage() {
  const classes = useStyles();
  const [token] = useToken();
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
    handleGetResidents(0, 20, "firstName");
  }, []);

  let content = <div></div>;

  if (fetchingError) {
    content = <div>Error while fetching</div>;
  } else if (fetching) {
    content = <SkeletonPlaceholder />;
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
