import { useSelector } from 'react-redux';
import { selectisAuthenticated, selectUser, selectisLoading } from '../store/authSelectors';

export const useAuth = () => {
  return {
    isLoggedIn: useSelector(selectisAuthenticated),
    isLoading: useSelector(selectisLoading),
    user: useSelector(selectUser),
  };
};
