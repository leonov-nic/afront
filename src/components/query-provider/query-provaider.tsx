import { createContext, useState, useCallback, ReactNode } from 'react';
import { Query } from '../../types';
import { baseQuery } from '../../const';
import { Dayjs } from 'dayjs';
import { getDataAndResetTime } from '../../utils/utils';
import { setSortDate } from '../../store/job-process/job-process';
import { getJobsLength, getJobsCount } from '../../store/job-process/job-process';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';

const BaseContext = {
    query: baseQuery,
    onChangeDate: undefined,
    onChangeOffset: undefined,
    setQuery: undefined,
  } 

export const QueryContext = createContext<{
    query: Query;
    onChangeDate: ((date: Dayjs) => void) | undefined;
    onChangeOffset: (() => void) | undefined;
    setQuery: ((query: Query) => void) | undefined;
  }>(BaseContext); 

export default function QueryProvider({children}: {children: ReactNode}): JSX.Element {

  const length = useAppSelector(getJobsLength);
  const count = useAppSelector(getJobsCount);
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState<Query>({...baseQuery});

  const handleChangeDate = useCallback((date: Dayjs) => {
    dispatch(setSortDate(''));
    setQuery((prev: Query) => ({
      ...prev,
      createdAt: getDataAndResetTime(date),
    }));
  }, [dispatch]);

  const handleChangeOffset = useCallback(() => {
    if (length === baseQuery.limit) {
      setQuery(prev => ({
        ...prev,
        offset: prev.offset + Number(baseQuery.limit),
      }));
    } else if (count && length < count) {
        dispatch(setSortDate(''));
        setQuery({...baseQuery, createdAt: query.createdAt});
    } else {
        dispatch(setSortDate(''));
        setQuery({...baseQuery, createdAt: query.createdAt});
    }
  }, [length, dispatch, query.createdAt, count]);

  const value = {
    query: {...query, lengthJobs: length},
    onChangeDate: handleChangeDate,
    onChangeOffset: handleChangeOffset,
    setQuery: setQuery,
  }

  return (
    <QueryContext.Provider value={value}>
      {children}
    </QueryContext.Provider>
  );
}
