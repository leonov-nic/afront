import ToggleButton from '@mui/material/ToggleButton';
import { styled } from '@mui/material/styles';
import ToggleButtonGroup, { toggleButtonGroupClasses } from '@mui/material/ToggleButtonGroup';
import { useFormikContext } from 'formik';
import { TStoreHouseOperationDTO } from '../../types';


const StyledToggleButtonGroup = styled(ToggleButtonGroup)(() => ({
[`&.${toggleButtonGroupClasses.root} .${toggleButtonGroupClasses.selected}`]:
{
  backgroundColor: "#17c1bc",
  color: "white",
  '&:hover': {
    backgroundColor: "#17d1bc"
  }
},
}));

export default function ToggleButonSelectStorehouseOperation({onChange} :{onChange: (value: string) => void}) {
  const { setFieldValue, values, handleChange } =  useFormikContext<TStoreHouseOperationDTO>();
  const value = values['typeOperation'];

  const handleChangeOperation = (_event: unknown, value: string) => {
    setFieldValue('typeOperation', value);
    handleChange('typeOperation');
    onChange(value);
  };

  return (
    <StyledToggleButtonGroup
      fullWidth
      color="info"
      value={value}
      id="typeOperation"
      exclusive
      onChange={handleChangeOperation}
      aria-label="Type of Operation"
      sx={{width: "80%", mx: 6.7}}
      size="large"
    >
      <ToggleButton sx={{borderRadius: 10 }} value="Shipment" key="justify">Shipment</ToggleButton>
      <ToggleButton sx={{borderRadius: 10}} value="Arrival" key="right">Arrival</ToggleButton>
    </StyledToggleButtonGroup>
  );
}