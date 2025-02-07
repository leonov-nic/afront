import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';

import ControlsColumnStorage from '../controls-column-storage/controls-column-storage';
import useVisibility from '../../hooks/useVisibility';
import { TStoreHouseOperationRDO } from '../../types';
import { getDayAndMonth } from '../../utils/utils';
import { TypeOperation } from '../../const';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
    whiteSpace: 'nowrap',
  },
  '&:hover': {
    backgroundColor: "#dee6eb",
    cursor: "pointer",
  },
  '&:focus-visible': {
    backgroundColor: "#d3dce1",
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustumTableOperationRow({row}: {row: TStoreHouseOperationRDO}): JSX.Element {
  const { visibility, hide, show } = useVisibility();

  const handleHoverRow = () => {
    show();
  }

  const handleLeaveRow = () => {
    hide();
  }

  return (
    <>
      {
        <StyledTableRow
          tabIndex={0}
          key={row._id}
          sx={{ '&:last-child td, &:last-child th': { border: 0 }, position: 'relative' }}
          onMouseLeave={handleLeaveRow}
          onMouseEnter={handleHoverRow}
          data-id={row._id}
        >
            
          <TableCell sx={{ backgroundColor: row.typeOperation === TypeOperation.Arrival ? '#fcf7b1' : 'inherit' }}  align="left">{row.typeOperation}</TableCell>
          <TableCell align="center">{row.employee ? row.employee.registrationNumber : '-'}</TableCell>
          <TableCell align="center">{row.employee ? row.employee.familyName : '-'}</TableCell>
          <TableCell align="center" width="10%">{getDayAndMonth(row.createdAt)}</TableCell>
          <TableCell align="center">{`${row.product.name} ${row.product.size ? row.product.size : row.product.diameter}`}</TableCell>
          <TableCell align="center">{row.totalAmount}</TableCell>
          <TableCell align="center">{row.currentQuantityProduct}</TableCell>
          <TableCell align="center">{`${row.fromWhom ? row.fromWhom : '-'}`}</TableCell>
          <TableCell align="center">{`${row.comment ? row.comment : '-'}`}</TableCell>
          <TableCell align="center" width="15px" style={{position: 'relative', right: 0, top: 0, padding: 0}}><ControlsColumnStorage opacity={visibility} fun={handleLeaveRow} row={row}/></TableCell>
        </StyledTableRow>
      }
    </>
  );
}
