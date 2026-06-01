import { NavLink, useLocation } from 'react-router-dom';
import { Box, Tab, Tabs } from '@mui/material';
import { CompanyRole } from '../../types/companiesTypes';

type Props = {
  companyId: string;
  role: CompanyRole | null;
};

const CompanyDetailsTabs = ({ companyId, role }: Props) => {
  const location = useLocation();

  const basePath = `/companies/${companyId}`;

  const currentPath = location.pathname;

  let tabValue = 0;

  if (currentPath.endsWith('/quizzes')) {
    tabValue = 1;
  }

  if (currentPath.endsWith('/invitations')) {
    tabValue = 2;
  }

  const canViewInvitations = role === 'owner' || role === 'admin';

  return (
    <Box mt={4}>
      <Tabs value={tabValue} textColor="primary" indicatorColor="primary">
        <Tab label="Members" component={NavLink} to={`${basePath}/members`} />
        <Tab label="Quizzes" component={NavLink} to={`${basePath}/quizzes`} />
        {canViewInvitations && <Tab label="Invitations" component={NavLink} to={`${basePath}/invitations`} />}
      </Tabs>
    </Box>
  );
};

export default CompanyDetailsTabs;
