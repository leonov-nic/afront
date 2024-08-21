import { memo } from 'react';

import TableBody from '@mui/material/TableBody';

import CustumTableRow from '../custom-table-row/custom-table-row';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getJobs } from '../../store/job-process/job-process';
import { TEmployeeRDO, TDetail, TNameOfJob, TUserRDO } from '../../types';
import { useState, useEffect } from 'react';
import { TJobRDO } from '../../types';

const MainTableBody = memo((): JSX.Element => {
  console.log('render TableBody');
  const [jobs, setJobs] = useState<TJobRDO[]>([]);
  const fetchingJobs = useAppSelector(getJobs);
//   console.log(fetchingJobs);
//   console.log(jobs);

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
    <TableBody>
        {rows.map((row) => (
        <CustumTableRow key={row._id} row={row}></CustumTableRow>
        ))}
    </TableBody> 
    // <TableBody style={{margin: "50px 0 30px", color: "gray", textAlign: "center",
    //   textTransform: 'uppercase', fontSize: "18px"}}>No work has been created today yet
    // </TableBody> 
  );
});

export default MainTableBody;


