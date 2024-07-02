// import Box from '@mui/material/Box';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useFormikContext } from 'formik';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getEmployees } from "../../store/job-process/job-process";
import { SxProps, Theme } from '@mui/material/styles';

import { TEmployee, TSelectJob } from '../../types';
import { dictionary } from '../../utils/utils';

type SelectEmployeeProps = {
  sx?: SxProps<Theme>;
  onChangeSelect?: (value: TEmployee) => void
}

export default function SelectEmployee({sx, onChangeSelect}: SelectEmployeeProps): JSX.Element {
  const employees = useAppSelector(getEmployees);
  const dictionaryEmployees = dictionary<TEmployee>(employees);

  const { setValues, values} =  useFormikContext<TSelectJob>();

  return (
    <Autocomplete
      value={values.employeeId ? dictionaryEmployees.get(values.employeeId) : null}
      id="select-employee"
      sx={[{ maxWidth: 180, display: "inline-flex"}, ...(Array.isArray(sx) ? sx : [sx]),]}
      options={employees}
      fullWidth={true}
      getOptionLabel={(option) => option.familyName}
      onChange={(_event, value) => {
        value && onChangeSelect && onChangeSelect(value)
        value && setValues({...values,
          typeOfJob: value.mainJob,
          familyName: value.familyName,
          registrationNumber: value.registrationNumber,
          employeeId: `${value._id && value._id.toString()}`
        })
      }}

      renderInput={(params) => (
        <TextField
          {...params}
          name='employeeId'
          placeholder="Employee"
        />
      )}
    />
  );
}
