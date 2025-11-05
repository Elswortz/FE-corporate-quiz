import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const PrivateRoute = ({ component: Component, redirectedTo = '/' }) => {
  const { isLoggedIn, isLoading } = useAuth();
  const shouldRedirect = !isLoading && !isLoggedIn;
  return shouldRedirect ? <Navigate to={redirectedTo} /> : <Component />;
};

export default PrivateRoute;
