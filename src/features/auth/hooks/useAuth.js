import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUser, selectAuthIsLoading } from '../store/authSelectors';

export const useAuth = () => {
  return {
    isLoggedIn: useSelector(selectIsAuthenticated),
    isLoading: useSelector(selectAuthIsLoading),
    user: useSelector(selectUser),
  };
};
