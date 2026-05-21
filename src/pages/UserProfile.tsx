import { useEffect } from 'react';
import UserInfo from '../features/users/components/UserInfo/UserInfo';
import CompaniesList from '../features/companies/components/CompaniesList/CompaniesList';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectOwnedCompanies,
  selectOwnedCompaniesLoading,
  selectOwnedCompaniesError,
  selectJoinedCompanies,
  selectJoinedCompaniesLoading,
  selectJoinedCompaniesError,
} from '@/features/companies/store/companiesSelectors';

import { fetchOwnedCompanies, fetchJoinedCompanies } from '@/features/companies/store/companiesThunks';

const UserProfile = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOwnedCompanies({ limit: 10, offset: 0 }));
    dispatch(fetchJoinedCompanies({ limit: 10, offset: 0 }));
  }, [dispatch]);

  const ownedCompanies = useAppSelector(selectOwnedCompanies);
  const ownedCompaniesLoading = useAppSelector(selectOwnedCompaniesLoading);
  const ownedCompaniesError = useAppSelector(selectOwnedCompaniesError);

  const joinedCompanies = useAppSelector(selectJoinedCompanies);
  const joinedCompaniesLoading = useAppSelector(selectJoinedCompaniesLoading);
  const joinedCompaniesError = useAppSelector(selectJoinedCompaniesError);

  return (
    <>
      <UserInfo />
      <Box
        sx={{
          maxWidth: 1000,
          mx: 'auto',
          mt: 5,
          p: 4,
          boxShadow: 3,
          borderRadius: 3,
          backgroundColor: 'background.paper',
        }}
      >
        <CompaniesList companies={ownedCompanies} isLoading={ownedCompaniesLoading} error={ownedCompaniesError} />
        <CompaniesList companies={joinedCompanies} isLoading={joinedCompaniesLoading} error={joinedCompaniesError} />
      </Box>
    </>
  );
};

export default UserProfile;
