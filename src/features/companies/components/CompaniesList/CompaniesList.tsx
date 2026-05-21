import { useEffect } from 'react';

import { Grid, Typography, CircularProgress, Box } from '@mui/material';

import CompaniesItem from '../CompaniesItem/CompaniesItem';
import Pagination from '../../../../components/ui/Pagination/Pagination';

import { Company } from '../../types/companiesTypes';

interface CompaniesListProps {
  companies: Company[];
  isLoading: boolean;
  error: string | null;
}

const CompaniesList = ({ companies = [], isLoading, error }: CompaniesListProps) => {
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {companies.length === 0 ? (
        <Typography variant="body1">No companies found</Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            {companies.map(company => (
              <Grid key={company.id} sx={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <CompaniesItem company={company} />
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 3 }}>{/* pagination */}</Box>
        </>
      )}
    </Box>
  );
};

export default CompaniesList;
