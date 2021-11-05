import { Alert, Button, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "../utils/Axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { useInputState } from "../hooks/useInputState";
import styles from "../styles/SignUpStyles";

import CircularProgress from "@mui/material/CircularProgress";

const useStyles = makeStyles(styles);

function SignInPage() {
  const classes = useStyles();
  const history = useHistory();

  const [email, updateEmail, resetEmail] = useInputState("");
  const [password, updatePassword, resetPassword] = useInputState("");
  const [
    confirmationPassword,
    updateConfirmationPassword,
    resetConfirmationPassword,
  ] = useInputState("");
  const [loading, setLoading] = useState(false);
  const [signUpError, setSignUpError] = useState(false);
  const [signedUp, setSignedUp] = useState(false);
  const [residentCode, setResidentCode] = useState();

  const reset = () => {
    resetEmail();
    resetPassword();
    resetConfirmationPassword();
    setSignUpError(false);
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
    if (password !== confirmationPassword) {
      alert("password must match with confirmed password");
      return;
    }

    const postRequestForSignUp = async () => {
      let result;
      try {
        setLoading(true);
        setSignUpError(false);
        result = await axios.post("/authentication/signUp", {
          confirmationPassword,
          email,
          password,
        });

        if (result.data) {
          setSignedUp(true);
          setResidentCode(result.data.residentCode);
        }
      } catch (e) {
        setSignUpError(true);
      } finally {
        setLoading(false);
      }
    };
    postRequestForSignUp();
  };

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <Typography variant="h2" component="h2" className={classes.header}>
          Sign Up
        </Typography>
        {signUpError && (
          <Alert severity="error">
            email is incorrect or you have already signed up!
          </Alert>
        )}
        {signedUp && (
          <Alert severity="success">
            You have successfully signed up. You can log in now.
            <div style={{ fontWeight: "bold", color: "red" }}>
              {residentCode &&
                "You must remember your resident code: " + residentCode}
            </div>
          </Alert>
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
          <TextField
            error={confirmationPassword !== password}
            id="login-password"
            label="Confirmed Password"
            value={confirmationPassword}
            onChange={updateConfirmationPassword}
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
            Sign Up {loading && <CircularProgress />}
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
            Have you already signed up?{" "}
            <Button type="outlined" onClick={() => history.push("/login")}>
              {" "}
              Login{" "}
            </Button>
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
