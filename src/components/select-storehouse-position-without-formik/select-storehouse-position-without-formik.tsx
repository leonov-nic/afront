import { useMemo } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { SxProps, Theme } from '@mui/material/styles';

import { TStoreHouse } from '../../types';

export default function SelectStorehousePositionWithoutFormik({sx, onChange, storeHouse}:{sx?: SxProps<Theme>, onChange: (value:  string[]) => void, storeHouse: TStoreHouse[]}): JSX.Element {
  
  const memoizedStoreHouse = useMemo(() => storeHouse, [storeHouse]);
  console.log(memoizedStoreHouse);
  return (
    <Autocomplete
      autoComplete={false}
      id="select-storehouse"
      sx={[{display: "inline-flex", maxHeight: "100px", minWidth: "250px"}, ...(Array.isArray(sx) ? sx : [sx])]}
      options={memoizedStoreHouse}
      fullWidth={true}
      getOptionLabel={(option) => `${option.name} ${option.diameter ? option.diameter : option.size}`}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      onChange={(_event, value) => {
        if (value === null) {
          onChange([]);
        } else {
          onChange([value.name, value._id]);
        }
      }}

      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          name='prod'
          placeholder="StoreHouse"
        />
      )}
    />
  );
}
