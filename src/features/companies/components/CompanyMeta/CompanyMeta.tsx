import { useTranslation } from 'react-i18next';
import { CompanyRole, CompanyStatus } from '../../types/companiesTypes';
import { Box, Chip, Typography } from '@mui/material';

type Props = {
  companyName: string;
  companyStatus: CompanyStatus;
  role: CompanyRole | undefined;
};

const CompanyMeta = ({ companyName, companyStatus, role }: Props) => {
  const { t } = useTranslation('companiesDetails');
  const isAdmin = role === 'owner' || role === 'admin';
  return (
    <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
      <Typography variant="h5">{companyName}</Typography>
      {isAdmin && (
        <Chip
          label={companyStatus === 'visible' ? t('status.visible') : t('status.hidden')}
          size="small"
          color={companyStatus === 'hidden' ? 'default' : 'primary'}
        />
      )}
    </Box>
  );
};

export default CompanyMeta;
