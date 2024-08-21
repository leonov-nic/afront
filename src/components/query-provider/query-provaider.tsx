import { createContext, useState, useCallback, ReactNode } from 'react';
import { Query } from '../../types';
import { baseQuery } from '../../const';
import { Dayjs } from 'dayjs';
import { getDataAndResetTime } from '../../utils/utils';

const BaseContext = {
    query: baseQuery,
    onChangeDate: undefined,
    onChangeOffset: undefined,
  } 

export const QueryContext = createContext<{
    query: Query;
    onChangeDate: ((date: Dayjs) => void) | undefined;
    onChangeOffset: (() => void) | undefined;
  }>(BaseContext); 

export default function QueryProvider({children}: {children: ReactNode}): JSX.Element {
  const [query, setQuery] = useState<Query>(baseQuery);

  const handleChangeDate = useCallback((date: Dayjs) => {
    setQuery((prev: Query) => ({
      ...prev,
      createdAt: getDataAndResetTime(date),
    }));
  }, []);

  const handleChangeOffset = useCallback(() => {
    setQuery(prev => ({
      ...prev,
      offset: prev.offset + Number(baseQuery.limit),
    }));
    console.log(query);
  }, [query]);

  const value = {
    query,
    onChangeDate: handleChangeDate,
    onChangeOffset: handleChangeOffset,
  }

  return (
    <QueryContext.Provider value={value}>
      {children}
    </QueryContext.Provider>
  );
}
