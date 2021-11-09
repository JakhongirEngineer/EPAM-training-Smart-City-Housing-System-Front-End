import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

function House({ house }) {
  console.log(house);

  const styles = {
    house: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
    credential: {
      display: "flex",
      justifyContent: "space-between",
    },
  };

  return (
    <div style={styles.house}>
      <div style={styles.credential}>
        <Typography variant="button">House Code:</Typography>
        <Typography variant="body2">{house.code}</Typography>
      </div>
      <Divider />
      <div style={styles.credential}>
        <Typography variant="button">House Type:</Typography>
        <Typography variant="overline">{house.houseType}</Typography>
      </div>
      <Divider />

      <div style={styles.credential}>
        <Typography variant="button">Material Type:</Typography>
        <Typography variant="overline">{house.materialType}</Typography>
      </div>
      <Divider />

      <div style={styles.credential}>
        <Typography variant="button">Rooms:</Typography>
        <Typography variant="overline">{house.numberOfRooms}</Typography>
      </div>
      <Divider />

      <div style={styles.credential}>
        <Typography variant="button">Condition:</Typography>
        <Typography variant="overline">{house.condition}</Typography>
      </div>
      <Divider />

      <div style={styles.credential}>
        <Typography variant="button">Furnished:</Typography>
        <Typography variant="overline">
          {house.furnished ? "Yes" : "No"}
        </Typography>
      </div>
      <Divider />

      <div style={styles.credential}>
        <Typography variant="button">Heating:</Typography>
        <Typography variant="overline">{house.heating}</Typography>
      </div>
      <Divider />

      <div style={styles.credential}>
        <Typography variant="button">Total Area:</Typography>
        <Typography variant="overline">{house.totalArea}</Typography>
      </div>
      <Divider />

      <div style={styles.credential}>
        <Typography variant="button">Ceiling Height:</Typography>
        <Typography variant="overline">{house.ceilingHeight}</Typography>
      </div>
      <Divider />

      <div style={styles.credential}>
        <Typography variant="button">Address:</Typography>
        <List dense={true}>
          <ListItem>
            <ListItemText primary={`District: ${house.address.district}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Street: ${house.address.street}`} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={`Home Number: ${house.address.homeNumber}`}
            />
          </ListItem>
        </List>
      </div>
      <Divider />
    </div>
  );
}

export default House;
