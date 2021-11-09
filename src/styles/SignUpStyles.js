import Image from "../assets/sign-in-background.svg";

const styles = (theme) => ({
  header: {
    color: "blue",
    margin: "1rem",
  },
  container: {
    backgroundImage: `url(${Image})`,
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "40rem",
    height: "30rem",
    backgroundColor: "rgb(225,225,225)",
    borderRadius: "1rem",
    boxShadow: "-0.3rem 1rem 0.3rem black",

    [theme.breakpoints.down("md")]: {
      width: "20rem",
      height: "70vh",
    },
  },
  inputs: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-around",
    margin: "1rem",
  },
  button: {
    margin: "1rem !important",
  },
});

export default styles;
