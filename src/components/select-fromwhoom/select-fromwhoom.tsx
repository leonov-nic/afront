import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { SxProps, Theme } from '@mui/material/styles';
import { useFormikContext } from 'formik';

import { STORE_HOUSE_FROM_WHOOM } from '../../const';
import { TStoreHouseOperationDTO } from '../../types';

export default function SelectFromWhoom({sx}:{sx?: SxProps<Theme>}): JSX.Element {
  const { setFieldValue, values, errors, touched, handleChange } =  useFormikContext<TStoreHouseOperationDTO>();
  const value = values['fromWhom'];
  const error = errors[`fromWhom`];

  return (
    <Autocomplete
      autoComplete={false}
      id="fromWhom"
      sx={[{display: "inline-flex", maxHeight: "100px"}, ...(Array.isArray(sx) ? sx : [sx])]}
      options={STORE_HOUSE_FROM_WHOOM}
      fullWidth={true}
      getOptionLabel={(option) => option}
      onChange={(_event, value ) => {
        if (value) {
          setFieldValue('fromWhom', value);
          handleChange('fromWhom');
        }
      }}

      renderInput={(params) => (
        <TextField
          {...params}
          error={!value && touched.fromWhom }
          helperText={!value && touched.fromWhom ? error : null}

          name='fromWhom'
          placeholder="From Whom"
        />
      )}
    />
  );
}
