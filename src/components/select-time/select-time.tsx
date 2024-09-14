import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useFormikContext } from 'formik';
import { SyntheticEvent } from 'react';
import { toast } from 'react-toastify';
import { setJobBoxOne } from '../../const';

interface SelectTimeProps {
  name: string;
}

export default function SelectTime({ name }: SelectTimeProps): JSX.Element {
  const { setFieldValue, values, errors, touched, handleChange  } =  useFormikContext<{[key: string]: string}>();
  const error = errors[`${name}`];
  const value = values[`${name}`];

  const timeSlots = Array.from(new Array(24 * 2)).map(
    (_, index) =>
      `${index < 20 ? '0' : ''}${Math.floor(index / 2)}:${
        index % 2 === 0 ? '00' : '30'
      }`,
  );

  const handleChangeSelect = (_event: SyntheticEvent<Element, Event>, value: string | null) => {
    setFieldValue(name, value);

    if (name === 'timeTo' && values.timeFrom && value) {
      const timeFrom = Number(values.timeFrom.replace(':', ''));
      const timeTo = Number(value.replace(':', ''))
      if (timeFrom >= timeTo) {
        setFieldValue('timeTo', '');
        toast.warn('Time To must be more then Time From');
      }
    } else if (name === 'timeFrom' && values.timeTo && value) {
      const timeTo = Number(values['timeTo'].replace(':', ''));
      const timeFrom = Number(value.replace(':', ''))
      if (timeFrom >= timeTo) {
        setFieldValue('timeFrom', '');
        toast.warn('Time To must be more then Time From');
      }
    }

    handleChange(`${name}`);
  }

  return (
    <Autocomplete
      disabled={setJobBoxOne.has(values.typeOfJob)} 
      value={values[`${name}`] === '' ? null : values[`${name}`] }
      id={name}
      isOptionEqualToValue={(option: string, value: string) => {
        if (value === '-') {return true;}
        return option === value; 
      }}
      sx={{ minWidth: 160, maxWidth: 160, display: 'inline-flex'}}
      data-name={name}
      options={[...timeSlots.slice(12, 48), '24:00']}
      onChange={handleChangeSelect}
      // getOptionDisabled={(option) =>
      //   timeSlots.slice(0, 12).includes(option)}
      renderInput={(params) => 
        <TextField 
          error={!value && touched[`${name}`] }
          helperText={!value && touched[`${name}`] ? error : null}

          {...params} 
          placeholder={name} name={name}
        />}
    />
  );
}
