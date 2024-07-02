import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useFormikContext } from 'formik';
import { SyntheticEvent } from 'react';

import { toast } from 'react-toastify';

import { isTimeSameOrAfter, isTimeSameOrBefore } from '../../utils/utils';

interface SelectTimeProps {
  name: string;
}

export default function SelectTime({ name }: SelectTimeProps): JSX.Element {
  const { setFieldValue, values } =  useFormikContext<{[key: string]: string}>();

  const timeSlots = Array.from(new Array(24 * 2)).map(
    (_, index) =>
      `${index < 20 ? '0' : ''}${Math.floor(index / 2)}:${
        index % 2 === 0 ? '00' : '30'
      }`,
  );

  const handleChangeSelect = (_event: SyntheticEvent<Element, Event>, value: string | null) => {
    setFieldValue(name, value);
    if (value && values.timeFrom && name === 'timeTo' && !isTimeSameOrBefore(values.timeFrom, value)) {
      setFieldValue(name, '');
      toast.warn('Time To must be more then Time From');
    } else if (value && values.timeTo && name === 'timeFrom' && !isTimeSameOrAfter(values.timeTo, value)) {
      setFieldValue(name, '')
      toast.warn('Time From must be less then Time To')
    }
  }

  return (
    <Autocomplete
      value={values[`${name}`] === '' ? null : values[`${name}`]}
      id={name}
      sx={{ minWidth: 160, maxWidth: 160, display: 'inline-flex'}}
      data-name={name}
      options={[...timeSlots.slice(12, 48), '00:00']}
      onChange={handleChangeSelect}
      // getOptionDisabled={(option) =>
      //   timeSlots.slice(0, 12).includes(option)}
      renderInput={(params) => <TextField error={!!values.error} {...params} placeholder={name} name={name}/>}
    />
  );
}
