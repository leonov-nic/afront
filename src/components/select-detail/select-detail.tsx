import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useFormikContext } from 'formik';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getDetails } from "../../store/job-process/job-process";

import { TDetail, TJob } from '../../types';
import { dictionary } from '../../utils/utils';

export default function SelectDetail(): JSX.Element {
  const details = useAppSelector(getDetails);
  const dictionaryDetails = dictionary<TDetail>(details);
  const { setFieldValue, values, errors, touched, handleChange  } =  useFormikContext<TJob>();
  const error = errors[`detailId`];
  const value = values['detailId'];

  return (
    <Autocomplete
      value={values.detailId ? dictionaryDetails.get(values.detailId) : null}
      autoComplete={false}
      id="select-detail"
      sx={{ maxWidth: 150, display: "inline-flex"}}
      options={details}
      fullWidth={true}
      getOptionLabel={(option) => option.shortName}
      onChange={(_event, value) => {
        if (value) {
          setFieldValue('detailId', value._id);
          handleChange('detailId');
        }}
      }

      renderInput={(params) => (
        <TextField
          {...params}
          error={!value && touched.detailId }
          helperText={!value && touched.detailId ? error : null}

          name='detailId'
          placeholder="Detail"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password',
          }}
        />
      )}
    />
  );
}
