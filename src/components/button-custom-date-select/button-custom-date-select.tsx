import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useFormikContext } from "formik";

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

function iconCustomDateSelect() {
  return (
    <CalendarMonthIcon sx={{color: '#1976d2'}} ></CalendarMonthIcon>
  )
}

export default function ButtonCustomDateSelect() {
  const { setFieldValue  } = useFormikContext();

  const hundleChangeDate = (value: Dayjs | null) => {
    if (value === null) {
      setFieldValue('createdAt', null)
    }
    setFieldValue('createdAt', dayjs(value).format('YYYY-MM-DDTHH:mm:ssZ'))
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        slots={{openPickerIcon: iconCustomDateSelect}}
        defaultValue={null}
        name="createdAt"
        // views={["day", "month"]}
        // timezone="Europe/Paris"
        disableFuture
        sx={{ width: 170 }}
        onChange={hundleChangeDate}
      />
    </LocalizationProvider>
  );
}
