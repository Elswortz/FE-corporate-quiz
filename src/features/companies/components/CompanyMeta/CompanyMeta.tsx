import { CompanyRole, CompanyStatus } from '../../types/companiesTypes';
import { Box, Chip, Typography } from '@mui/material';

type Props = {
  companyName: string;
  companyStatus: CompanyStatus;
  role: CompanyRole | undefined;
};

const CompanyMeta = ({ companyName, companyStatus, role }: Props) => {
  const isAdmin = role === 'owner' || role === 'admin';
  return (
    <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
      <Typography variant="h5">{companyName}</Typography>
      {isAdmin && (
        <Chip label={companyStatus} size="small" color={companyStatus === 'hidden' ? 'default' : 'primary'} />
      )}
    </Box>
  );
};

export default CompanyMeta;
