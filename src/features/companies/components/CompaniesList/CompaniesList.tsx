import { Grid, Typography, CircularProgress, Box, Alert } from '@mui/material';
import CompaniesItem from '../CompaniesItem/CompaniesItem';
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
    return <Alert severity="error">{error}</Alert>;
  }

  if (!companies.length) {
    return <Alert severity="info">No companies found</Alert>;
  }

  return (
    <Box>
      <Grid container spacing={2}>
        {companies.map(company => (
          <Grid key={company.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <CompaniesItem company={company} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CompaniesList;
