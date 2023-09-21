import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { NewAdvertisement } from "../../pages/NewAdvertisement";
interface PrivateRouteProps {
  isLoggedIn: boolean;
}

export const PrivateRoute: React.FunctionComponent<PrivateRouteProps> = ({
  isLoggedIn,
}) => {
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};
