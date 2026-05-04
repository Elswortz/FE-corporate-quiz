import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectAuthIsLoading } from '../store/authSelectors';
import { selectProfileData } from '../../users/store/usersSelectors';

export const useAuth = () => {
  return {
    isLoggedIn: useSelector(selectIsAuthenticated),
    isLoading: useSelector(selectAuthIsLoading),
    user: useSelector(selectProfileData),
  };
};
