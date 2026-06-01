import { Button } from '@mui/material';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { CompanyStatus } from '../../types/companiesTypes';

type Props = {
  companyStatus: CompanyStatus;

  isLoading: boolean;

  onToggleStatus: () => Promise<void>;
  onEdit: () => void;
  onDelete: () => void;
};

const OwnerCompanyActions = ({ companyStatus, isLoading, onToggleStatus, onEdit, onDelete }: Props) => {
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
        {isHidden ? 'Show' : 'Hide'}
      </Button>

      <Button onClick={onEdit} startIcon={<EditIcon />} size="small" variant="outlined">
        Edit
      </Button>

      <Button onClick={onDelete} startIcon={<DeleteIcon />} size="small" variant="contained" color="error">
        Delete
      </Button>
    </>
  );
};

export default OwnerCompanyActions;
