import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ReactNode, FC } from 'react';

type RestrictedRouteProps = {
  children: ReactNode;
  redirectTo?: string;
};

const RestrictedRoute: FC<RestrictedRouteProps> = ({ children, redirectTo = '/' }) => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default RestrictedRoute;
