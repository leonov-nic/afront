import DatePickerFilter from '../data-picker-filter/data-picker-filter';
import ButtonLoadFile from '../button-load-file/button-load-file';
import Stack from '@mui/material/Stack';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getUser } from '../../store/user-process/user-process';

export default function DateFilter() {
  const user = useAppSelector(getUser);
  const shouldShowButton = user && user.name === "Liza S";

  return (
    <Stack direction="row" spacing={2} 
      sx={{ justifyContent: "center", 
        alignItems: "center", 
        marginLeft: 'auto',
        marginRight: ButtonLoadFile() ? 'calc(50% - 140px)' : 'calc(50% - 105px)'
      }}
    >
      <DatePickerFilter  />
      {shouldShowButton ? ButtonLoadFile() : null}
    </Stack >
  );
}
