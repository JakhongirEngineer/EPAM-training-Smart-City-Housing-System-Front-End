import React from "react";
import Resident from "./Resident";

function ResidentList({ residents }) {
  const residentListStyle = {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  };
  return (
    <div style={residentListStyle}>
      {residents.map((resident) => {
        return <Resident key={resident.residentCode} {...resident} />;
      })}
    </div>
  );
}

export default ResidentList;
