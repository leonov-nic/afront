import { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Alert from '@mui/material/Alert';
import { Dayjs } from 'dayjs';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


export default function DatePickerFilter({ onChange }: { onChange: (value: Dayjs | null) => void }) {
  const [cleared, setCleared] = useState<boolean>(false);

  useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        slots={{openPickerIcon: ArrowDropDownIcon}}
        defaultValue={null}
        // views={["day", "month"]}
        // timezone="Europe/Paris"
        disableFuture
        sx={{ width: 200, left: "calc(50% - 415px)" }}
        onChange={onChange}
        slotProps={{
          field: { clearable: true, onClear: () => setCleared(true)},
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
