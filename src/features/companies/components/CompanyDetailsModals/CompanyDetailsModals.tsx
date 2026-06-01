import ConfirmModal from '@/components/ui/ConfirmModal/ConfirmModal';

import EditCompanyModal from '../EditCompanyModal/EditCompanyModal';

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
  return (
    <>
      <ConfirmModal
        isOpen={modalState.isConfirmDeleteOpen}
        title="Confirm Company Deletion"
        description="Are you sure you want to delete your company? This action cannot be undone."
        confirmText="Delete"
        confirmColor="error"
        onConfirm={onDelete}
        onCancel={modalActions.closeDelete}
      />

      <ConfirmModal
        isOpen={modalState.isConfirmLeaveOpen}
        title="Confirm Leave From Company"
        description="Are you sure you want to leave this company? This action cannot be undone."
        confirmText="Leave"
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
