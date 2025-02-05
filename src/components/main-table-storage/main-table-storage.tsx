import { memo, useState, useLayoutEffect } from 'react';

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

import CustumTableOperationRow from '../custom-table-operation-row/custom-table-operation-row';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getStoreHouseOperations, getIsLoading } from '../../store/stotrehouse-process/storehouse-process';
import { createRowsForTableStorage } from '../../utils/utils';
import { TStoreHouseOperationRDO } from '../../types';

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

const MainTableStorage = memo((): JSX.Element => {
  const [rows, setRows] = useState<TStoreHouseOperationRDO[]>([]);

  const isLoading = useAppSelector(getIsLoading);
  const storehouseOperations = useAppSelector(getStoreHouseOperations);

  useLayoutEffect(() => {
    setRows(createRowsForTableStorage(storehouseOperations));
  }, [storehouseOperations]);
  
  return (
    !isLoading ? rows && rows.length ? 
      <TableContainer sx={{ maxHeight: '70.3vh' }} component={Paper}>
        <Table stickyHeader sx={{ minWidth: 700 }} aria-label="table of jobs">
          <TableHead>
            <TableRow>
              <StyledTableCell width="10%" align="center">Operation</StyledTableCell>
              <StyledTableCell width="10%" align="center">№</StyledTableCell>
              <StyledTableCell width="10%" align="center">Employee</StyledTableCell>
              <StyledTableCell width="10%" align="center">Data</StyledTableCell>
              <StyledTableCell width="10%" align="center">Position</StyledTableCell>
              <StyledTableCell width="10%" align="center">Quantity</StyledTableCell>
              <StyledTableCell width="10%" align="center">Availible</StyledTableCell>
              <StyledTableCell width="10%" align="center">From Whom</StyledTableCell>
              <StyledTableCell width="10%" align="center">Comment</StyledTableCell>
              <StyledTableCell width="15px" align="center"><DeleteIcon style={{paddingTop: "5px"}}></DeleteIcon></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <CustumTableOperationRow key={row._id} row={row}></CustumTableOperationRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> :
      <p style={{margin: "50px 0 30px", color: "gray", textAlign: "center",
        textTransform: 'uppercase', fontSize: "18px"}}>No operation has been created yet</p> : <Loading/>
  );
});

export default MainTableStorage;
