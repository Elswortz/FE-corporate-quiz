import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUser, selectisLoading } from '../store/auth/selectors';

export const useAuth = () => {
  return {
    isLoggedIn: useSelector(selectIsLoggedIn),
    isLoading: useSelector(selectisLoading),
    user: useSelector(selectUser),
  };
};
