import { useEffect, useState } from 'react';
import UserInfo from '../features/users/components/UserInfo/UserInfo';
import CompaniesList from '../features/companies/components/CompaniesList/CompaniesList';
import { Box, Container, Tabs, Tab } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectOwnedCompanies,
  selectOwnedCompaniesLoading,
  selectOwnedCompaniesError,
  selectOwnedCompaniesMeta,
  selectJoinedCompanies,
  selectJoinedCompaniesLoading,
  selectJoinedCompaniesError,
  selectJoinedCompaniesMeta,
} from '@/features/companies/store/companiesSelectors';

import { fetchOwnedCompanies, fetchJoinedCompanies } from '@/features/companies/store/companiesThunks';
import { usePagination } from '@/hooks/usePagination';
import LoadMoreButton from '@/components/ui/LoadMoreButton/LoadMoreButton';

const UserProfile = () => {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<'owned' | 'joined'>('owned');

  const ownedCompanies = useAppSelector(selectOwnedCompanies);
  const ownedCompaniesLoading = useAppSelector(selectOwnedCompaniesLoading);
  const ownedCompaniesError = useAppSelector(selectOwnedCompaniesError);
  const ownedCompaniesMeta = useAppSelector(selectOwnedCompaniesMeta);

  const joinedCompanies = useAppSelector(selectJoinedCompanies);
  const joinedCompaniesLoading = useAppSelector(selectJoinedCompaniesLoading);
  const joinedCompaniesError = useAppSelector(selectJoinedCompaniesError);
  const joinedCompaniesMeta = useAppSelector(selectJoinedCompaniesMeta);

  const ownedPagination = usePagination({ limit: 4 });
  const joinedPagination = usePagination({ limit: 4 });

  useEffect(() => {
    dispatch(
      fetchOwnedCompanies({
        limit: ownedPagination.limit,
        offset: ownedPagination.offset,
      })
    );
  }, [dispatch, ownedPagination.limit, ownedPagination.offset]);

  useEffect(() => {
    dispatch(
      fetchJoinedCompanies({
        limit: joinedPagination.limit,
        offset: joinedPagination.offset,
      })
    );
  }, [dispatch, joinedPagination.limit, joinedPagination.offset]);

  return (
    <>
      <Container maxWidth="lg">
        <UserInfo />
        <Box
          sx={{
            mx: 'auto',
            mt: 4,
            p: 4,
            boxShadow: 2,
            borderRadius: 1,
            backgroundColor: 'background.paper',
          }}
        >
          <Tabs value={activeTab} onChange={(_, value) => setActiveTab(value)} sx={{ mb: 3 }}>
            <Tab label="Owned Companies" value="owned" />
            <Tab label="Joined Companies" value="joined" />
          </Tabs>

          {activeTab === 'owned' && (
            <>
              <CompaniesList companies={ownedCompanies} isLoading={ownedCompaniesLoading} error={ownedCompaniesError} />

              <LoadMoreButton
                hasMore={ownedCompaniesMeta?.has_next}
                isLoading={ownedCompaniesLoading}
                onClick={ownedPagination.loadMore}
              />
            </>
          )}
          {activeTab === 'joined' && (
            <>
              <CompaniesList
                companies={joinedCompanies}
                isLoading={joinedCompaniesLoading}
                error={joinedCompaniesError}
              />

              <LoadMoreButton
                hasMore={joinedCompaniesMeta?.has_next}
                isLoading={joinedCompaniesLoading}
                onClick={joinedPagination.loadMore}
              />
            </>
          )}
        </Box>
      </Container>
    </>
  );
};

export default UserProfile;
