import { Alert, Button, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "../utils/Axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { useInputState } from "../hooks/useInputState";
import styles from "../styles/SignUpStyles";

import CircularProgress from "@mui/material/CircularProgress";
import { useToken } from "../hooks/useToken";
import { useLocalStorageReducer } from "../hooks/useLocalStorageReducer";
import principalReducer from "../reducers/principalReducer";
import residentCodeReducer from "../reducers/residentCodeReducer";

const useStyles = makeStyles(styles);

function SignInPage() {
  const classes = useStyles();
  const history = useHistory();
  const [, setToken] = useToken();
  const [, principalDispatch] = useLocalStorageReducer(
    "principal",
    null,
    principalReducer
  );

  const [, residentCodeDispatch] = useLocalStorageReducer(
    "residentCode",
    null,
    residentCodeReducer
  );

  const [email, updateEmail, resetEmail] = useInputState("");
  const [password, updatePassword, resetPassword] = useInputState("");
  const [loading, setLoading] = useState(false);
  const [signInError, setSignInError] = useState(false);

  const reset = () => {
    resetEmail();
    resetPassword();
  };

  const validateEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  };

  const signUp = () => {
    if (!email || !password) {
      alert("no field must be blank");
      return;
    }
    if (!validateEmail(email)) {
      alert("You have entered an invalid email address!");
      return;
    }

    const postRequestForSignIn = async () => {
      let result;
      try {
        setLoading(true);
        setSignInError(false);
        result = await axios.post("/authentication/signIn", {
          email,
          password,
        });
        const { jwtToken, residentCode } = result.data;
        setToken(jwtToken);
        residentCodeDispatch({
          type: "SET_RESIDENT_CODE",
          payload: residentCode,
        });

        const role = result.data.user.roles[0].name;
        console.log(role);

        const currentPrincipal = result.data.user;
        console.log("currentPrincipal signIn: ", currentPrincipal);

        principalDispatch({ type: "SET_PRINCIPAL", payload: currentPrincipal });

        if (role === "ADMIN") {
          history.push("/admin");
        } else if (role === "RESIDENT") {
          history.push("/residents");
        }
      } catch (e) {
        setSignInError(true);
      } finally {
        setLoading(false);
      }

      console.log(result);
    };

    postRequestForSignIn();
  };

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <Typography variant="h2" component="h2" className={classes.header}>
          Login
        </Typography>
        {signInError && (
          <Alert severity="error">email or password is incorrect!</Alert>
        )}
        <div className={classes.inputs}>
          <TextField
            error={false}
            id="login-email"
            label="Email"
            value={email}
            onChange={updateEmail}
            variant="filled"
            type="email"
          />
          <TextField
            error={false}
            id="login-password"
            label="Password"
            value={password}
            onChange={updatePassword}
            variant="filled"
            type="password"
          />
        </div>

        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="success"
            onClick={signUp}
            className={classes.button}
          >
            Login {loading && <CircularProgress />}
          </Button>

          <Button
            variant="outlined"
            color="error"
            onClick={reset}
            className={classes.button}
          >
            RESET
          </Button>
        </div>
        <div>
          <Typography variant="overline">
            Haven't you Signed Up?{" "}
            <Button type="outlined" onClick={() => history.push("/signUp")}>
              {" "}
              Sign Up{" "}
            </Button>
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
