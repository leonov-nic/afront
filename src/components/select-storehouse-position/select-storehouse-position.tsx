import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { SxProps, Theme } from '@mui/material/styles';
import { useFormikContext } from 'formik';

import { TStoreEditDTO, TStoreHouse } from '../../types';

export default function SelectStorehousePosition({sx, storeHouse}:{sx?: SxProps<Theme>, storeHouse: TStoreHouse[]}): JSX.Element {

  const { setFieldValue, setValues, values, errors, touched, handleChange } =  useFormikContext<TStoreEditDTO>();

  const value = values['productId'];
  const error = errors[`productId`];
  
  return (
    <Autocomplete
      autoComplete={false}
      id="select-storehouse"
      sx={[{display: "inline-flex", maxHeight: "100px"}, ...(Array.isArray(sx) ? sx : [sx])]}
      options={storeHouse}
      fullWidth={true}
      getOptionLabel={(option) => `${option.name} ${option.diameter ? option.diameter : option.size}`}
      isOptionEqualToValue={(option, value) => option._id === value._id} 
      onChange={(_event, value ) => {
        if (value === null) {
          setValues({...values,
            productId: '',
            name: '',
            company: '',
            characteristics: '',
            size: '',
            diameter: 0,
            type: '',
            price: 0,
          })
          setFieldValue('productId', '');
          handleChange('productId');
        }


        if (value) {
          setValues({...values,
            name: value && value.name ? value.name : '',
            company: value && value.company ? value.company : '',
            characteristics: value && value.characteristics ? value.characteristics : '',
            size: value && value.size ? value.size : '',
            diameter: value && value.diameter ? value.diameter : 0,
            type: value && value.type ? value.type : '',
            price: value && value.price ? value.price : 0,
            productId: value && value._id ? value._id : '',
          })
          setFieldValue('productId', value._id);
          handleChange('productId');
        }
      }}

      renderInput={(params) => (
        <TextField
          {...params}
          error={!value && touched.productId }
          helperText={!value && touched.productId ? error : null}

          name='productId'
          placeholder="StoreHouse"
        />
      )}
    />
  );
}
