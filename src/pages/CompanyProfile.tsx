import CompaniesDetails from '../features/companies/components/CompaniesDetails/CompaniesDetails';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';

const CompanyProfile = () => {
  return (
    <>
      <Container maxWidth="lg">
        <CompaniesDetails />
        <Outlet />
      </Container>
    </>
  );
};

export default CompanyProfile;
