import { FC, ReactElement } from 'react';
import {Navigate} from 'react-router-dom';
import { useAppSelector } from '../../hooks/store.ts';
import { authorizationStatusData } from '../../store/auth/auth-selectors.ts';

interface IPrivateRouteProps {
  children: ReactElement;
  redirectPath?: string;
}
export const PrivateRoute: FC<IPrivateRouteProps> = ({children, redirectPath = '/login'}) => {
  const isAuth = useAppSelector(authorizationStatusData);
  return isAuth ? children : <Navigate to={redirectPath} replace />;
};

