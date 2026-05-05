import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ReactNode, FC } from 'react';

type PrivateRouteProps = {
  children: ReactNode;
  redirectTo?: string;
};

const PrivateRoute: FC<PrivateRouteProps> = ({ children, redirectTo = '/login' }) => {
  const { isLoggedIn, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
