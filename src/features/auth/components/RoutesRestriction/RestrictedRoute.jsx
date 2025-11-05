import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const RestrictedRoute = ({ component: Component, redirectedTo = '/' }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Navigate to={redirectedTo} /> : <Component />;
};

export default RestrictedRoute;
