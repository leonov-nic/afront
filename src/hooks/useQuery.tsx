import { useContext } from "react";
import { QueryContext } from "../components/query-provider/query-provaider";

export default function useQuery() {
  return useContext(QueryContext);
}
