import { createContext, useState, useCallback, ReactNode, useMemo } from 'react';
import { Query } from '../../types';
import { baseQuery } from '../../const';
import { Dayjs } from 'dayjs';
import { getDataAndResetTime } from '../../utils/utils';
import { setSortDate } from '../../store/job-process/job-process';
import { getJobsCount, getAllJobsLength } from '../../store/job-process/job-process';
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

  const allJobslength = useAppSelector(getAllJobsLength);
  const memoAllJobslength = useMemo(() => allJobslength, [allJobslength])
  const count = useAppSelector(getJobsCount);
 
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState<Query>({...baseQuery});
  const memoQuery = useMemo(() => query, [query])

  const handleChangeDate = useCallback((date: Dayjs) => {
    dispatch(setSortDate(''));
    setQuery((prev: Query) => ({
      ...prev,
      createdAt: getDataAndResetTime(date),
    }));
  }, [dispatch]);


  // this.#renderTrips(trips.slice(0, Math.min(tripsCount, this.#renderedTripCount)));

  const handleChangeOffset = useCallback(() => {
    if (count && allJobslength < count) {
      setQuery(prev => ({
        ...prev,
        offset: prev.offset + Number(baseQuery.limit),
      }));
    } else if (allJobslength == count) {
      dispatch(setSortDate(''));
      setQuery({...baseQuery, createdAt: query.createdAt});
    } else {
        dispatch(setSortDate(''));
        setQuery({...baseQuery, createdAt: query.createdAt});
     }
  }, [dispatch, query.createdAt, count, allJobslength]);

  const value = {
    query: {...memoQuery, lengthJobs: memoAllJobslength},
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
