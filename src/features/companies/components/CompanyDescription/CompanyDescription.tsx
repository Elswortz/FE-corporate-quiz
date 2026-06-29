import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

type Props = {
  description?: string;
};

const CompanyDescription = ({ description }: Props) => {
  const { t } = useTranslation('companiesDetails');
  return (
    <>
      <Typography variant="subtitle1" gutterBottom>
        {t('aboutTitle')}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          whiteSpace: 'pre-line',
        }}
      >
        {description || 'No description provided.'}
      </Typography>
    </>
  );
};

export default CompanyDescription;
