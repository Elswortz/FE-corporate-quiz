import { Button } from '@mui/material';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { CompanyStatus } from '../../types/companiesTypes';
import { useTranslation } from 'react-i18next';

type Props = {
  companyStatus: CompanyStatus;

  isLoading: boolean;

  onToggleStatus: () => Promise<void>;
  onEdit: () => void;
  onDelete: () => void;
};

const OwnerCompanyActions = ({ companyStatus, isLoading, onToggleStatus, onEdit, onDelete }: Props) => {
  const { t } = useTranslation('companiesDetails');
  const isHidden = companyStatus === 'hidden';

  return (
    <>
      <Button
        onClick={onToggleStatus}
        startIcon={isHidden ? <VisibilityIcon /> : <VisibilityOffIcon />}
        disabled={isLoading}
        size="small"
        variant="outlined"
      >
        {isHidden ? t('buttons.show') : t('buttons.hide')}
      </Button>

      <Button onClick={onEdit} startIcon={<EditIcon />} size="small" variant="outlined">
        {t('buttons.edit')}
      </Button>

      <Button onClick={onDelete} startIcon={<DeleteIcon />} size="small" variant="contained" color="error">
        {t('buttons.delete')}
      </Button>
    </>
  );
};

export default OwnerCompanyActions;
