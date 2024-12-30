import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { SxProps, Theme } from '@mui/material/styles';
import { useFormikContext } from 'formik';

import { useAppSelector } from '../../hooks/useAppSelector';
import { getStoreHousePositions } from '../../store/stotrehouse-process/storehouse-process';

import { TStoreHouseOperationDTO } from '../../types';
// import { dictionary } from '../../utils/utils';
// import { setJobBoxOne } from '../../const';

export default function SelectStorehousePosition({sx}:{sx?: SxProps<Theme>}): JSX.Element {
  const storeHousePositions = useAppSelector(getStoreHousePositions);

  // const dictionaryStoreHousePositions = dictionary<TStoreHouse>(storeHousePositions);
  const { setFieldValue, values, errors, touched, handleChange } =  useFormikContext<TStoreHouseOperationDTO>();
  const value = values['productId'];
  const error = errors[`productId`];
  return (
    <Autocomplete
      // disabled={setJobBoxOne.has(values.typeOfJob)} 
      // value={values ? dictionaryStoreHousePositions.get(values.productId) : null}
      autoComplete={false}
      id="select-storehouse"
      sx={[{display: "inline-flex", maxHeight: "100px"}, ...(Array.isArray(sx) ? sx : [sx])]}
      options={storeHousePositions}
      fullWidth={true}
      getOptionLabel={(option) => `${option.name} ${option.diameter ? option.diameter : option.size}`}
      onChange={(_event, value ) => {
        if (value) {
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
