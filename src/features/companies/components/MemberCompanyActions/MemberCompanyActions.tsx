import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

type Props = {
  onLeave: () => void;
};

const MemberCompanyActions = ({ onLeave }: Props) => {
  const { t } = useTranslation('companiesDetails');
  return (
    <Button onClick={onLeave} size="small" variant="contained" color="error">
      {t('buttons.leave')}
    </Button>
  );
};

export default MemberCompanyActions;
