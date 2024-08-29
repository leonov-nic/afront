import DatePickerFilter from '../data-picker-filter/data-picker-filter';
import ButtonLoadFile from '../button-load-file/button-load-file';
import { Stack  } from '@mui/material';

export default function DateFilter() {
  return (
    <Stack  direction="row" spacing={2} 
      sx={{ justifyContent: "center", 
        alignItems: "center", 
        marginLeft: 'auto',
        marginRight: 'calc(50% - 140px)'
      }}
    >
      <DatePickerFilter  />
      <ButtonLoadFile  />
    </Stack >
  );
}
