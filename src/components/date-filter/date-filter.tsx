import { useState, useEffect } from 'react';
import DatePickerFilter from '../data-picker-filter/data-picker-filter';
import dayjs, { Dayjs } from 'dayjs';
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchJobs } from '../../store/api-action';
import { getDataAndResetTime } from '../../utils/utils';

export default function DateFilter({onChangeDate}: {onChangeDate: (value: Dayjs)=> void}) {
  const dispatch = useAppDispatch();
  const [date, setDate] = useState<Dayjs>(dayjs());

  useEffect(() => {
    dispatch(fetchJobs({createdAt: getDataAndResetTime(date), offset: 0, limit: 10}));
  }, [date, dispatch]);

  const hundleChangeDate = (value: Dayjs) => {
    setDate(value);
    onChangeDate(value);
  }

  return (
    <>
      <DatePickerFilter onChange={hundleChangeDate} />
    </>
  );
}
