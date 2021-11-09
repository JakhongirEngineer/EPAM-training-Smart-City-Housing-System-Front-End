import Image from "../../assets/admin-background3.svg";

const ResidentsMainPageStyles = (theme) => ({
  header: {
    color: "blue",
    margin: "1rem",
  },
  container: {
    backgroundImage: `url(${Image})`,
    backgroundRepeat: "repeat",
    backgroundPosition: "center",
    width: "100vw",
    height: "90vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    height: "20rem",
    backgroundColor: "white",
    borderRadius: "1rem",
    boxShadow: "0.3rem 0.4rem 0.5rem grey",
    [theme.breakpoints.down("md")]: {
      height: "70vh",
    },
  },
  infoItem: {
    display: "flex",
    flexDirection: "row",
    margin: "1rem",
  },
});

export default ResidentsMainPageStyles;
