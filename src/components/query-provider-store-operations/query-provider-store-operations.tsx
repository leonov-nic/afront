import { createContext, useState, ReactNode } from 'react';
import { QueryStorehouseOperations } from '../../types';
import { baseQueryOperations } from '../../const';

const BaseContextStorehouseOperations = {
  query: baseQueryOperations,
  setQuery: undefined,
} 

export const QueryStorehouseOperationsContext = createContext<{
  query: QueryStorehouseOperations;
  setQuery: ((query: QueryStorehouseOperations) => void) | undefined;
}>(BaseContextStorehouseOperations); 

export default function QueryProviderStoreOperations({children}: {children: ReactNode}): JSX.Element {
  const [query, setQuery] = useState<QueryStorehouseOperations>({...baseQueryOperations});
  
  const theme = {
    query,
    setQuery,
  }

  return (
    <QueryStorehouseOperationsContext.Provider value={theme}>
      {children}
    </QueryStorehouseOperationsContext.Provider>
  );
}
