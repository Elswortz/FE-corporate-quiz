import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { selectIsAuthenticated, selectAuthIsLoading } from '../store/authSelectors';
import { selectUserProfileData } from '@/features/users/store/usersSelectors';
import type { RootState } from '../../../store/store';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type UseAuthReturn = {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: ReturnType<typeof selectUserProfileData>;
};

export const useAuth = (): UseAuthReturn => {
  const isLoggedIn = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectAuthIsLoading);
  const user = useAppSelector(selectUserProfileData);

  return { isLoggedIn, isLoading, user };
};
