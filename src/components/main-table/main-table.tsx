import { memo, useState, useEffect, useLayoutEffect } from 'react';

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

import FilterByEmployee from '../filter-by-employee/filter-by-employee';

import CustumTableRow from '../custom-table-row/custom-table-row';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getNewJobs, getIsLoading } from '../../store/job-process/job-process';
import { createRowsForTable } from '../../utils/utils';
import { TJobRDO } from '../../types';
import useQuery from '../../hooks/useQuery';

const StyledTableCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#96b8cc',
    color: theme.palette.common.white,
    padding: 1,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    whiteSpace: 'nowrap'
  },
}));

const MainTable = memo((): JSX.Element => {
  const { query } = useQuery();
  const [family, setFamily] = useState<string | null>(null);
  const [rows, setRows] = useState<TJobRDO[]>([]);


  const isLoading = useAppSelector(getIsLoading);
  const jobs = useAppSelector(getNewJobs);

  useLayoutEffect(() => {
    setFamily(null);
  }, [query.createdAt]);

  useEffect(() => {
    if (family) {
      const filteredJobs = jobs.filter(job => job.employee.familyName === family);
      setRows(createRowsForTable(filteredJobs));
    } else {
      setRows(createRowsForTable(jobs));
    }
  }, [family, jobs]);
  
  return (
    !isLoading ? rows && rows.length ? 
      <TableContainer sx={{ maxHeight: '63vh' }} component={Paper}>
        <Table stickyHeader sx={{ minWidth: 700 }} aria-label="table of jobs">
          <TableHead>
            <TableRow>
              <StyledTableCell width="25px" align="center">Date</StyledTableCell>
              <StyledTableCell width="10px" align="center">&#8470;</StyledTableCell>
              <StyledTableCell style={{backgroundColor: family ? "#17c1bc" : "#96b8cc"}} align="center"><FilterByEmployee jobs={jobs} fun={setFamily}></FilterByEmployee>{family ? family : 'Employee'}</StyledTableCell>
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
