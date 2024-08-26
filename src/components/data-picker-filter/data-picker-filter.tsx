import { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Alert from '@mui/material/Alert';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import useQuery from '../../hooks/useQuery';
import { baseQuery } from '../../const';
import dayjs, { Dayjs } from 'dayjs';
import { setSortDate } from '../../store/job-process/job-process';
import { useAppDispatch } from '../../hooks/useAppDispatch';

export default function DatePickerFilter() {
  const dispatch = useAppDispatch();
  const [cleared, setCleared] = useState<boolean>(false);
  const { onChangeDate, setQuery, query } = useQuery();

  const hundleChangeDate = (value: Dayjs | null) => {
    if (value === null) {
      dispatch(setSortDate(''));
    }
    setQuery && setQuery(baseQuery);
    value && onChangeDate && onChangeDate(value);
  }

  useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }

    return () => {};
  }, [cleared, query]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        slots={{openPickerIcon: ArrowDropDownIcon}}
        defaultValue={null}
        value={query.offset === baseQuery.offset ? null : dayjs(query.createdAt)}
        // views={["day", "month"]}
        // timezone="Europe/Paris"
        disableFuture
        sx={{ width: 200, left: "calc(50% - 415px)" }}
        onChange={hundleChangeDate}
        slotProps={{
          field: { clearable: true, onClear: () => {setCleared(true); setQuery && setQuery(baseQuery);}},
        }}
      />

      {cleared && (
        <Alert
          sx={{ position: 'absolute', bottom: 0, right: 0 }}
          severity="success"
        >
          Field cleared!
        </Alert>
      )}
    </LocalizationProvider>
  );
}
