import styled from "@emotion/styled";
import { Button } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import COLORS from "./Colors";

const BlueButton = styled(Button)({
    position:'relative',
    borderRadius:'100px',
    backgroundColor:COLORS.buttonBlue,
    color:COLORS.white,
    textTransform:"capitalize",
    fontWeight:400,
    px:2,
    minWidth:'200px',
    ":hover":{
      scale:1.1
    }
})

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: COLORS.white,
      color: COLORS.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: COLORS.lightBlue,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

export {
    BlueButton,
    StyledTableCell,
    StyledTableRow
}