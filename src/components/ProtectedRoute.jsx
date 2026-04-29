import { Navigate } from "react-router-dom";
import useAuth from "../hook/useAuth";
const ProtectedRoute = ({ children, roleRequired }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (roleRequired && user.role !== roleRequired) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ProtectedRoute;