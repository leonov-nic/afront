import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { SxProps, Theme } from '@mui/material/styles';
import { useFormikContext } from 'formik';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getDetails } from "../../store/job-process/job-process";

import { TDetail, TNewDetail, TJob } from '../../types';
import { dictionary } from '../../utils/utils';
import { setJobBoxOne } from '../../const';

export default function SelectDetail({sx}:{sx?: SxProps<Theme>}): JSX.Element {
  const details = useAppSelector(getDetails);
  const dictionaryDetails = dictionary<TDetail>(details);
  const { setFieldValue, setValues, values, errors, touched, handleChange } =  useFormikContext<Pick<TJob, 'detailId' | 'typeOfJob'> & TNewDetail>();
  const error = errors[`detailId`];
  const value = values['detailId'];

  return (
    <Autocomplete
      disabled={setJobBoxOne.has(values.typeOfJob)} 
      value={values.detailId ? dictionaryDetails.get(values.detailId) : null}
      autoComplete={false}
      id="select-detail"
      sx={[{ maxWidth: 185, display: "inline-flex"}, ...(Array.isArray(sx) ? sx : [sx])]}
      options={details}
      fullWidth={true}
      getOptionDisabled={(option) =>
        details.slice(-1).includes(option)}
      getOptionLabel={(option) => `${option.shortName} / ${option.longName}`}
      onChange={(_event, value ) => {

        if (value === null) {
          setValues({...values,
            shortName: '',
            longName: '',
            normOfMinute: undefined,
            customer: '',
          })
          setFieldValue('detailId', '');
          handleChange('detailId');
        }
        
        if (value) {
          setValues({...values,
            shortName: value.shortName,
            longName: value.longName,
            normOfMinute: value.normOfMinute,
            customer: value.customer,
          })
          setFieldValue('detailId', value._id);
          handleChange('detailId');
        }
      }}

      renderInput={(params) => (
        <TextField
          {...params}
          error={!value && touched.detailId }
          helperText={!value && touched.detailId ? error : null}

          name='detailId'
          placeholder="Detail"
        />
      )}
    />
  );
}
