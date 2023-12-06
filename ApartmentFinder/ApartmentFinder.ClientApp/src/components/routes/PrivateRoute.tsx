import { Navigate, Outlet } from "react-router-dom";
interface PrivateRouteProps {
  isLoggedIn: boolean;
}

export const PrivateRoute: React.FunctionComponent<PrivateRouteProps> = ({
  isLoggedIn,
}) => {
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};
