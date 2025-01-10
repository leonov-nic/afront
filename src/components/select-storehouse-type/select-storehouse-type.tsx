import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
import { SxProps, Theme } from '@mui/material/styles';
import { useFormikContext } from 'formik';

import { STORE_HOUSE_TYPES } from '../../const';
import { TStoreHouseDTO } from '../../types';

export default function SelectStorehouseType({sx}:{sx?: SxProps<Theme>}): JSX.Element {
  const { setFieldValue, values, errors, touched, handleChange } =  useFormikContext<TStoreHouseDTO>();
  const value = values['type'];
  const error = errors[`type`];
  
  // const handleChangeSelect = (event: SelectChangeEvent) => {
  //   setFieldValue('type', event.target.value);
  //   handleChange('type');
  // };

  return (
    
    // <Select
    //   label={null}
    //   fullWidth={true}
    //   sx={[{display: "inline-flex", maxHeight: "100px"}, ...(Array.isArray(sx) ? sx : [sx])]}
    //   placeholder='Type'
    //   value={value}
    //   onChange={handleChangeSelect}
    //   displayEmpty
    //   inputProps={{ 'aria-label': 'Select type' }}
    // >
    //   <MenuItem disabled value="">
    //     <span style={{
    //       fontWeight: 300,
    //       fontSize: '1rem',
    //       lineHeight: '1.4375em',
    //       letterSpacing: '0.00938em',
    //       color: 'silver'
    //     }}>Select Type</span>
    //   </MenuItem>
    //   {STORE_HOUSE_TYPES.map((item) => <MenuItem value={item}>{item}</MenuItem>)}
    // </Select>
    <Autocomplete
      autoComplete={false}
      id="type"
      sx={[{display: "inline-flex", maxHeight: "100px"}, ...(Array.isArray(sx) ? sx : [sx])]}
      options={STORE_HOUSE_TYPES}
      fullWidth={true}
      getOptionLabel={(option) => option}
      onChange={(_event, value ) => {
        if (value) {
          setFieldValue('type', value);
          handleChange('type');
        }
      }}

      renderInput={(params) => (
        <TextField
          {...params}
          error={!value && touched.type }
          helperText={!value && touched.type ? error : null}

          name='type'
          placeholder="Type"
        />
      )}
    />
  );
}
