import { typesJob, TypesOfJob, setJobBoxOne, setJobBoxTwo } from "../../const";
import { TTypeOfJob, TJob } from "../../types";

import { SxProps, Theme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// import { Autocomplete } from 'formik-mui';
import { useFormikContext } from 'formik';

type SelectTypeOfJobProps = {
  name: string;
  sx?: SxProps<Theme>;
}

export default function SelectTypeOfJob({name, sx = []}: SelectTypeOfJobProps): JSX.Element {
  const { setFieldValue, values, errors, touched, handleChange, setValues  } = useFormikContext<TJob>();
  const error = errors['typeOfJob'];
  const value = values['typeOfJob'];

  return (
    <Autocomplete
      value={values.typeOfJob ? TypesOfJob[values.typeOfJob] : null}
      id={name}
      sx={[{ minWidth: 150, width: '100%', maxWidth: 200, display: "inline-flex"}, ...(Array.isArray(sx) ? sx : [sx]),]}
      options={typesJob}
      autoComplete={false}
      fullWidth={true}
      getOptionLabel={(option: TTypeOfJob) => `${option.name} / ${option.longName}`}
      isOptionEqualToValue={(option: TTypeOfJob, value: TTypeOfJob) => option.name === value.name && option.longName === value.longName}
      onChange={(_event, value) => {
        if (value) {
          if (setJobBoxOne.has(value.name)) {
            setValues({...values,
              quantity: 0,
              timeFrom: '-',
              timeTo: '-',
              detailId: '66e3fa22873f13f61db28d36',
              // detailId: '66e482d2f776718b37d41d2b',
            })
          } else if (setJobBoxTwo.has(value.name)) {
            setValues({...values,
              quantity: 0,
              detailId: '66e3fa22873f13f61db28d36',
              // detailId: '66e482d2f776718b37d41d2b',
            })
          }
          setFieldValue(`${name}`, value.name);
          handleChange(`${name}`);
        } 
      }}

      renderInput={(params) => (
        <TextField
          // error={!!error}
          error={!value && touched.typeOfJob }
          helperText={!value && touched.typeOfJob ? error : null}
          {...params}
          name={name}
          placeholder={`${values.typeOfJob ? values.typeOfJob : "Type Of Job"}`}
        />
      )}
    />
  );
}

