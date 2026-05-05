import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { selectIsAuthenticated, selectAuthIsLoading } from '../store/authSelectors';
import { selectProfileData } from '../../users/store/usersSelectors';
import type { RootState } from '../../../store/store';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type UseAuthReturn = {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: ReturnType<typeof selectProfileData>;
};

export const useAuth = (): UseAuthReturn => {
  const isLoggedIn = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectAuthIsLoading);
  const user = useAppSelector(selectProfileData);

  return { isLoggedIn, isLoading, user };
};
