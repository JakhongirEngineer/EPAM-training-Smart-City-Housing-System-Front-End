import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useHistory } from "react-router";
import { useLocalStorageReducer } from "../hooks/useLocalStorageReducer";
import { useToken } from "../hooks/useToken";
import principalReducer from "../reducers/principalReducer";
import logoutStyles from "../styles/LogoutStyles";

const useStyles = makeStyles(logoutStyles);

function LogoutPage() {
  const classes = useStyles();

  const history = useHistory();
  const [, setToken] = useToken();
  const [, principalDispatch] = useLocalStorageReducer(
    "principal",
    null,
    principalReducer
  );

  const logout = () => {
    setToken("");
    principalDispatch({ type: "SET_PRINCIPAL", payload: "" });
    history.push("/login");
  };

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <Button
          variant="contained"
          style={{
            backgroundColor: "green",
            padding: "1rem",
            fontSize: "2rem",
          }}
          onClick={logout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

export default LogoutPage;
