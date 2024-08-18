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
import { getJobs, getIsLoading } from '../../store/job-process/job-process';
import { TEmployeeRDO, TDetail, TNameOfJob, TUserRDO } from '../../types';
import { useState, useEffect } from 'react';
import { TJobRDO } from '../../types';


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
  const [jobs, setJobs] = useState<TJobRDO[]>([]);
  const isLoading = useAppSelector(getIsLoading);
  const fetchingJobs = useAppSelector(getJobs);
  console.log(fetchingJobs);
  console.log(jobs);

  useEffect(() => {
    setJobs(prevJobs => {
      const existingIds = new Set(prevJobs.map(job => job._id)); // Создаем множество существующих _id
      const newJobs = fetchingJobs.filter(job => !existingIds.has(job._id)); // Фильтруем новые работы
      return prevJobs.concat(newJobs); // Объединяем старые и новые работы
    });
  }, [fetchingJobs]);

  const createData = (
    _id: string,
    createdAt: string,
    employeeId: string,
    employee: TEmployeeRDO,
    timeFrom: string,
    timeTo: string,
    totalHours: number | undefined,
    detailId: string,
    detail: TDetail | undefined,
    typeOfJob: TNameOfJob,
    quantity: number,
    master: TUserRDO,
    extra?: number,
    comment?: string,
  ) => {
    return { _id, createdAt, employeeId, employee, timeFrom, timeTo, totalHours, detailId, detail, typeOfJob, extra, quantity, comment, master };
  }

  const rows = jobs.map(job => createData(
    job._id,
    job.createdAt,
    job.employeeId,
    job.employee,
    job.timeFrom,
    job.timeTo,
    job.totalHours,
    job.detailId,
    job.detail,
    job.typeOfJob,
    job.quantity,
    job.master,
    job.extra,
    job.comment
  ));

  return (
    !isLoading ? rows.length ? <TableContainer component={Paper}>
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
