import { RootState } from '@/store/store';

export const selectUserProfileData = (state: RootState) => state.users.profile.data;
export const selectUserProfileLoading = (state: RootState) => state.users.profile.isLoading;
export const selectUserProfileError = (state: RootState) => state.users.profile.error;

export const selectUsersList = (state: RootState) => state.users.list.data;
export const selectUsersListLoading = (state: RootState) => state.users.list.isLoading;
export const selectUsersListError = (state: RootState) => state.users.list.error;

export const selectSelectedUser = (state: RootState) => state.users.selected.data;
export const selectSelectedUserLoading = (state: RootState) => state.users.selected.isLoading;
export const selectSelectedUserError = (state: RootState) => state.users.selected.error;

export const selectUpdateUserLoading = (state: RootState) => state.users.mutations.update.isLoading;
export const selectUpdateUserError = (state: RootState) => state.users.mutations.update.error;
export const selectRemoveUserLoading = (state: RootState) => state.users.mutations.remove.isLoading;
export const selectRemoveUserError = (state: RootState) => state.users.mutations.remove.error;
export const selectUpdateUserAvatarLoading = (state: RootState) => state.users.mutations.updateAvatar.isLoading;
export const selectUpdateUserAvatarError = (state: RootState) => state.users.mutations.updateAvatar.error;
