import { CompanyStatus } from '../../types/companiesTypes';
import { Box, Chip, Typography } from '@mui/material';

type Props = {
  companyName: string;
  companyStatus: CompanyStatus;
};

const CompanyMeta = ({ companyName, companyStatus }: Props) => {
  return (
    <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
      <Typography variant="h5">{companyName}</Typography>
      <Chip label={companyStatus} size="small" color={companyStatus === 'hidden' ? 'default' : 'primary'} />
    </Box>
  );
};

export default CompanyMeta;
