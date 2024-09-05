import { memo } from 'react';

import Loading from '../../components/loading/loading';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import CustumTableRow from '../custom-table-row/custom-table-row';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getNewJobs, getIsLoading } from '../../store/job-process/job-process';

import { createRowsForTable } from '../../utils/utils';

const StyledTableCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#96b8cc',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    whiteSpace: 'nowrap'
  },
}));


const MainTable = memo((): JSX.Element => {
  console.log('render Table');

  const isLoading = useAppSelector(getIsLoading);
  const jobs = useAppSelector(getNewJobs);
  console.log(jobs);

  const rows = createRowsForTable(jobs);

  return (
    !isLoading ? rows.length ? 
      <TableContainer sx={{ maxHeight: '58vh' }} component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="table of jobs">
          <TableHead>
            <TableRow>
              <StyledTableCell width="25px" align="center">Date</StyledTableCell>
              <StyledTableCell width="10px" align="center">&#8470;</StyledTableCell>
              <StyledTableCell align="center">Employee</StyledTableCell>
              <StyledTableCell width="25px" align="center">From</StyledTableCell>
              <StyledTableCell align="center">To</StyledTableCell>
              <StyledTableCell align="center">H</StyledTableCell>
              <StyledTableCell align="center">Detail</StyledTableCell>
              <StyledTableCell align="center">Type of work</StyledTableCell>
              <StyledTableCell width="15px" align="center">Extra</StyledTableCell>
              <StyledTableCell width="25px" align="center">Quantity</StyledTableCell>
              <StyledTableCell align="center">Master</StyledTableCell>
              <StyledTableCell align="center">Comment</StyledTableCell>
              <StyledTableCell width="15px" align="center"><DeleteIcon style={{paddingTop: "5px"}}></DeleteIcon></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <CustumTableRow key={row._id} row={row}></CustumTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> :
      <p style={{margin: "50px 0 30px", color: "gray", textAlign: "center",
        textTransform: 'uppercase', fontSize: "18px"}}>No work has been created today yet</p> : <Loading/>
  );
});

export default MainTable;
