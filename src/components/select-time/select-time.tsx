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
  const nextDaySlots = ['24:00', '24:30', '25:00', '25:30', '26:00']; 

  const handleChangeSelect = (_event: SyntheticEvent<Element, Event>, value: string | null) => {
    setFieldValue(name, value);
    const getMinutes = (s: string): number => {
      if (!s || s === '-') return 0;
      const [h, m] = s.split(':').map(Number);
      return h * 60 + m;
    };
    // Определяем актуальные значения для сравнения
    const tFrom = name === 'timeFrom' ? value : values.timeFrom;
    const tTo = name === 'timeTo' ? value : values.timeTo;

    // Запускаем валидацию только если оба поля заполнены и не являются заглушкой '-'
    if (tFrom && tTo && tFrom !== '-' && tTo !== '-') {
      const fromMin = getMinutes(tFrom);
      const toMin = getMinutes(tTo);

      // Считаем чистую разницу
      let duration = toMin - fromMin;

      // Логика перехода через полночь:
      // Если время To меньше или равно времени From, значит это следующий день (добавляем 24 часа)
      if (duration <= 0) {
        duration += 24 * 60;
      }

      // 1. Проверка на равенство (смена 0 минут или ровно 24 часа)
      if (tFrom === tTo) {
        toast.warn('Time From and Time To cannot be identical');
        // setFieldValue(name, ''); // Можно очистить поле, если это критично
      } 
      // 2. Проверка на "слишком длинную смену" 
      // Если после коррекции суток смена > 20 часов, вероятно, пользователь ошибся
      else if (duration > 12 * 60) {
        toast.error('Shift duration is too long. Please check if Time From/To are swapped.');
      }
    }


    // if (name === 'timeTo' && values.timeFrom && value) {
    //   const timeFrom = Number(values.timeFrom.replace(':', ''));
    //   const timeTo = Number(value.replace(':', ''))
    //   if (timeFrom >= timeTo) {
    //     setFieldValue('timeTo', '');
    //     toast.warn('Time To must be more then Time From');
    //   }
    // } else if (name === 'timeFrom' && values.timeTo && value) {
    //   const timeTo = Number(values['timeTo'].replace(':', ''));
    //   const timeFrom = Number(value.replace(':', ''))
    //   if (timeFrom >= timeTo) {
    //     setFieldValue('timeFrom', '');
    //     toast.warn('Time To must be more then Time From');
    //   }
    // }

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
      sx={{ minWidth: 130, maxWidth: 130, display: 'inline-flex'}}
      data-name={name}
      options={[...timeSlots.slice(0, 48), ...nextDaySlots]}
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
