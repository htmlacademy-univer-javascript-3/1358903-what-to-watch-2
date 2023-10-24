import {FC} from 'react';
import {Navigate} from "react-router-dom";

interface IPrivateRoute {
  isAuth: boolean,
  children: JSX.Element,
  redirectPath?: string,
}
export const PrivateRoute: FC<IPrivateRoute> = ({isAuth, children, redirectPath = '/login'}) => {
  return isAuth ? children : <Navigate to={redirectPath} replace />;
};

