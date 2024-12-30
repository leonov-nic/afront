import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useFormikContext } from 'formik';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getEmployees } from "../../store/job-process/job-process";
import { SxProps, Theme } from '@mui/material/styles';

import { TStoreHouseOperationDTO, TEmployee } from '../../types';
import { dictionary } from '../../utils/utils';

type SelectEmployeeProps = {
  sx?: SxProps<Theme>;
}

export default function SelectEmployeeStorage({sx}: SelectEmployeeProps): JSX.Element {
  const employees = useAppSelector(getEmployees);
  const dictionaryEmployees = dictionary<TEmployee>(employees);

  const { setFieldValue, values, errors, touched, handleChange } =  useFormikContext<TStoreHouseOperationDTO>();
  const error = errors['employeeId'];
  const value = values['employeeId'];
  
  return (
    <>
      <Autocomplete
        value={values.employeeId ? dictionaryEmployees.get(values.employeeId) : null}
        id="select-employee-storage"
        sx={[...(Array.isArray(sx) ? sx : [sx]),]}
        options={employees}
        fullWidth={true}
        getOptionLabel={(option) => option.familyName}
        onChange={(_event, value) => {
          if (value) {
            setFieldValue('employeeId', value._id);
            handleChange('employeeId');
          }
        }}

        renderInput={(params) => (
          <TextField
            error={!value && touched.employeeId }
            helperText={!value && touched.employeeId ? error : null}
            {...params}
            name='employeeId'
            placeholder="Employee"
          />
        )}
      />
    </>
  );
}
