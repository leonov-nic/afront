import { useContext } from "react";
import { QueryStorehouseOperationsContext } from "../components/query-provider-store-operations/query-provider-store-operations";

export default function useQueryStoreOperations() {
  return useContext(QueryStorehouseOperationsContext);
}
