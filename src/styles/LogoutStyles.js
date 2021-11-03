import Image from "../assets/logout-background.svg";

const logoutStyles = (theme) => ({
  header: {
    color: "blue",
    margin: "1rem",
  },
  container: {
    backgroundImage: `url(${Image})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
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
    width: "20rem",
    height: "10rem",
    backgroundColor: "white",
    borderRadius: "1rem",
    boxShadow: "-0.3rem 1rem 0.3rem green",
  },
});

export default logoutStyles;
