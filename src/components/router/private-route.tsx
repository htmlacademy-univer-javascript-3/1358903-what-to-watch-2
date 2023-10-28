import { FC, ReactElement } from 'react';
import {Navigate} from 'react-router-dom';

interface IPrivateRoute {
  isAuth: boolean;
  children: ReactElement;
  redirectPath?: string;
}
export const PrivateRoute: FC<IPrivateRoute> = ({isAuth, children, redirectPath = '/login'}) => isAuth ? children : <Navigate to={redirectPath} replace />;

