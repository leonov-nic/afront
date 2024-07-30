import { useState, useEffect } from 'react';
import DatePickerFilter from '../data-picker-filter/data-picker-filter';
import { Dayjs } from 'dayjs';
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchJobs } from '../../store/api-action';
import { getDataAndResetTime } from '../../utils/utils';

export default function DateFilter({onChangeDate}: {onChangeDate: (value: Dayjs | null)=> void}) {
  const dispatch = useAppDispatch();
  const [date, setDate] = useState<Dayjs | null>(null);

  useEffect(() => {
    dispatch(fetchJobs({createdAt: getDataAndResetTime(date)}));
  }, [date, dispatch]);

  const hundleChangeDate = (value: Dayjs | null) => {
    setDate(value);
    onChangeDate(value);
  }

  return (
    <>
      <DatePickerFilter onChange={hundleChangeDate} />
    </>
  );
}
