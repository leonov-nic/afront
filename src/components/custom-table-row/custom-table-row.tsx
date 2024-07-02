import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';

import ControlsColumn from '../controls-column/controls-column';
import useVisibility from '../../hooks/useVisibility';
import { TJobRDO } from '../../types';
import { getHours, getDayAndMonth } from '../../utils/utils';

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

export default function CustumTableRow({row}: {row: TJobRDO}): JSX.Element {
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
          <TableCell data-id={row['_id']} align="center">{getDayAndMonth(row.createdAt)}</TableCell>
          <TableCell align="center">{row.employee.registrationNumber}</TableCell>
          <TableCell component="th" align="center">{row.employee.familyName}</TableCell>
          <TableCell align="center">{getHours(row.timeFrom)}</TableCell>
          <TableCell align="center">{getHours(row.timeTo)}</TableCell>
          <TableCell align="center">{row.totalHours}</TableCell>
          <TableCell align="center">{row.detail && row.detail.shortName}</TableCell>
          <TableCell align="center">{row.typeOfJob}</TableCell>
          <TableCell align="center">{row.extra}</TableCell>
          <TableCell align="center">{row.quantity}</TableCell>
          <TableCell align="center">{row.master.name}</TableCell>
          <TableCell align="center">{row.comment || "–"}</TableCell>
          <TableCell align="center" width="15px" style={{position: 'relative', right: 0, top: 0, padding: 0}}><ControlsColumn opacity={visibility} fun={handleLeaveRow} row={row}/></TableCell>
        </StyledTableRow>
      }
    </>
  );
}
