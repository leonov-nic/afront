// import Box from '@mui/material/Box';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useFormikContext } from 'formik';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getEmployees } from "../../store/job-process/job-process";
import { SxProps, Theme } from '@mui/material/styles';

import { TEmployee, TSelectJob } from '../../types';
import { dictionary } from '../../utils/utils';

import { setJobBoxTwo } from "../../const";

type SelectEmployeeProps = {
  sx?: SxProps<Theme>;
  onChangeSelect?: (value: TEmployee) => void
}

export default function SelectEmployee({sx, onChangeSelect}: SelectEmployeeProps): JSX.Element {
  const employees = useAppSelector(getEmployees);
  const dictionaryEmployees = dictionary<TEmployee>(employees);

  const { setValues, values, errors, touched, handleChange } =  useFormikContext<TSelectJob>();
  const error = errors['employeeId'];
  const value = values['employeeId'];
  
  return (
    <>
      <Autocomplete
        value={values.employeeId ? dictionaryEmployees.get(values.employeeId) : null}
        id="select-employee"
        sx={[{ maxWidth: 180, display: "inline-flex"}, ...(Array.isArray(sx) ? sx : [sx]),]}
        options={employees}
        fullWidth={true}
        getOptionLabel={(option) => option.familyName}
        onChange={(_event, value) => {
          value && onChangeSelect && onChangeSelect(value)
          if (value === null) {
            setValues({...values,
              typeOfJob: '',
              familyName: '',
              registrationNumber: undefined,
              employeeId: '',
              timeFrom: '',
              timeTo: '',
              detailId: '',
            })
          }
          if (value && setJobBoxTwo.has(value.mainJob)) {
            setValues({...values,
              typeOfJob: value.mainJob,
              familyName: value.familyName,
              registrationNumber: value.registrationNumber,
              employeeId: `${value._id && value._id.toString()}`,
              quantity: 0,
              detailId: '66e3fa22873f13f61db28d36',
              // detailId: '66e482d2f776718b37d41d2b',
            })
          } else {
            value && setValues({...values,
              typeOfJob: value.mainJob,
              familyName: value.familyName,
              registrationNumber: value.registrationNumber,
              employeeId: `${value._id && value._id.toString()}`
            })
          }

          handleChange('employeeId');
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
