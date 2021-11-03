import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Delete } from "@mui/icons-material";

function Row({ advertisementArchive, deleteArchive }) {
  const [open, setOpen] = React.useState(false);

  const handleDeleteArchive = (uuid) => {
    deleteArchive(uuid);
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {advertisementArchive.title}
        </TableCell>
        <TableCell align="right">
          {advertisementArchive.advertisementArchiveUUID}
        </TableCell>
        <TableCell align="right">
          {advertisementArchive.moneyTransferUUID}
        </TableCell>
        <TableCell align="right">{advertisementArchive.phone}</TableCell>
        <TableCell align="right">{advertisementArchive.price}</TableCell>
        <TableCell align="right">{advertisementArchive.residentCode}</TableCell>
        <TableCell align="right">
          <Delete
            style={{ cursor: "pointer" }}
            onClick={() =>
              handleDeleteArchive(advertisementArchive.advertisementArchiveUUID)
            }
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Description
              </Typography>
              <Typography variant="body1">
                {advertisementArchive.description}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

/*{
    "advertisementArchiveUUID": "string",
    "description": "string",
    "id": 0,
    "moneyTransferUUID": "string",
    "phone": "string",
    "price": 0,
    "residentCode": 0,
    "title": "string"
  }
*/

function AdvertisementArchivesTable({ advertisementArchives, deleteArchive }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Title</TableCell>
            <TableCell align="right">AdvertisementArchive UUID</TableCell>
            <TableCell align="right">MoneyTransfer UUID</TableCell>
            <TableCell align="right">phone</TableCell>
            <TableCell align="right">price</TableCell>
            <TableCell align="right">residentCode</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {advertisementArchives.map((advertisementArchive) => (
            <Row
              key={advertisementArchive.advertisementArchiveUUID}
              advertisementArchive={advertisementArchive}
              deleteArchive={deleteArchive}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AdvertisementArchivesTable;
