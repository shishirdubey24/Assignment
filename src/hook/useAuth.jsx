import { useContext } from "react";
import AuthContext from "../contenxt/AuthContext";
const useAuth = () => useContext(AuthContext);

export default useAuth;