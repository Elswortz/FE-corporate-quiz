import ConfirmModal from '@/components/ui/ConfirmModal/ConfirmModal';

import EditCompanyModal from '../EditCompanyModal/EditCompanyModal';
import { useTranslation } from 'react-i18next';

type Props = {
  modalState: {
    isConfirmDeleteOpen: boolean;
    isConfirmLeaveOpen: boolean;
    isEditOpen: boolean;
  };

  modalActions: {
    closeDelete: () => void;
    closeLeave: () => void;
    closeEdit: () => void;
  };

  loading: {
    leaveCompanyLoading: boolean;
  };

  onDelete: () => Promise<void>;
  onLeave: () => Promise<void>;
};

const CompanyDetailsModals = ({ modalState, modalActions, loading, onDelete, onLeave }: Props) => {
  const { t } = useTranslation('companiesDetails');
  return (
    <>
      <ConfirmModal
        isOpen={modalState.isConfirmDeleteOpen}
        title={t('modals.delete.title')}
        description={t('modals.delete.description')}
        confirmText={t('modals.delete.confirmText')}
        confirmColor="error"
        onConfirm={onDelete}
        onCancel={modalActions.closeDelete}
      />

      <ConfirmModal
        isOpen={modalState.isConfirmLeaveOpen}
        title={t('modals.leave.title')}
        description={t('modals.leave.description')}
        confirmText={t('modals.leave.confirmText')}
        confirmColor="error"
        onConfirm={onLeave}
        onCancel={modalActions.closeLeave}
        isLoading={loading.leaveCompanyLoading}
      />

      <EditCompanyModal open={modalState.isEditOpen} onClose={modalActions.closeEdit} />
    </>
  );
};

export default CompanyDetailsModals;
