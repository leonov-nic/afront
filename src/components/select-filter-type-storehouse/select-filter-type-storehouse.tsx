import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import { STORE_HOUSE_TYPES, TypeProduct, baseQueryOperations } from '../../const';
import useQueryStoreOperations from '../../hooks/useQueryStoreOperations';

export default function SelectFilterTypeStorehouse({onChange}: {onChange?: (value: string) => void}): JSX.Element {
  const [type, setType] = useState('');
  const {query, setQuery} = useQueryStoreOperations();

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as keyof typeof TypeProduct | '');
      setQuery && setQuery({...query, typeProduct: event.target.value as keyof typeof TypeProduct | ''});
    if (event.target.value === '' && setQuery) {setQuery(baseQueryOperations)}
    if(event.target.value === 'Arrival' && setQuery) {
      setQuery({...query, type: event.target.value, typeProduct: ''});
    } else {
      setQuery && setQuery({...query, typeProduct: event.target.value as keyof typeof TypeProduct | '', type: ''});
    }
    onChange && onChange(type);
  };

  return (
    <Box sx={{ minWidth: 200, left: 'calc(50% - 300px)', color: 'black', position: "relative", borderRadius: '3px'}}>
      <FormControl fullWidth 
        sx={{ 
          '& div.MuiInputBase-root': {backgroundColor: '#96c8cc'}, 
          '& label.Mui-focused': {color: 'white'},
          '& [data-shrink=false]': {color: 'white', top: 3,},
          '& [data-shrink=true]': {color: 'white', top: 9,}
        }}>
        <InputLabel sx={{fontSize: 0.7, }} id="select-type-storehouse">Filter</InputLabel>
        <Select
          
          sx={[{
            display: 'inline-flex', maxHeight: '100px', 
            textTransform: "capitalize",
            backgroundColor: '#247cc1',
            minWidth: '25%',
            // display: 'flex',
            fontSize: '16px',
            color: '#2F4F4F'
            // left: '50%',
          }]}

          // labelId="select-type-storehouse"
          id="select-type-storehouse"
          value={type}
          // label="Filter"
          onChange={handleChange}
          placeholder='filter'
        >
        <MenuItem value=""><em>None</em></MenuItem>
          {STORE_HOUSE_TYPES.map(item => <MenuItem key={item} sx={{background: 'transparent'}} value={item}>{item[0].toUpperCase() + item.slice(1)}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
  );
}
