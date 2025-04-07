import { useContext } from "react";
import { QueryStorehouseOperationsContext } from "../components/query-provider-store-operations/query-provider-store-operations";

export default function useQueryStoreOperations() {
  const context =  useContext(QueryStorehouseOperationsContext);
  if (!context) {
    throw new Error('You must use QueryProviderStoreOperations');
  }
  return context;
}
