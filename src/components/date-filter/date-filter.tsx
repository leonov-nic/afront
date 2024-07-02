import { useState, useEffect } from 'react';
import DatePickerFilter from '../data-picker-filter/data-picker-filter';
import { Dayjs } from 'dayjs';
// import { useAppDispatch } from "../../hooks/useAppDispatch";
// import { fetchJobs } from '../../store/api-action';

export default function DateFilter() {
  // const dispatch = useAppDispatch();
  const [date, setDate] = useState<Dayjs | null>(null);

  useEffect(() => {
    console.log(date);
    // dispatch(fetchJobs({createdAt: date}));

  }, [date]);

  const hundleChangeDate = (value: Dayjs | null) => {
    setDate(value);
  }

  return (
    <>
      <DatePickerFilter onChange={hundleChangeDate} />
    </>
  );
}
