import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }: any) => {
  const { user } = useSelector((state: any) => state.auth);
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
