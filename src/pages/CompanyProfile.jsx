import CompaniesDetails from '../features/companies/components/CompaniesDetails/CompaniesDetails';
import { Outlet } from 'react-router-dom';

const CompanyProfile = () => {
  return (
    <>
      <CompaniesDetails />
      <Outlet />
    </>
  );
};

export default CompanyProfile;
