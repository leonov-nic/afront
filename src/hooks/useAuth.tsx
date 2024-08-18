import { useContext } from "react";
import { AuthContext } from "../components/auth-provider/auth-provider";

export default function useAuth() {
  return useContext(AuthContext);
}
