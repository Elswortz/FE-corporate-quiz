import { Box } from '@mui/material';
import OwnerCompanyActions from '../OwnerCompanyActions/OwnerCompanyActions';
import GuestCompanyActions from '../GuestCompanyActions/GuestCompanyActions';
import MemberCompanyActions from '../MemberCompanyActions/MemberCompanyActions';

import { CompanyStatus, CompanyRole } from '../../types/companiesTypes';

type Props = {
  role: CompanyRole | null;

  companyStatus: CompanyStatus;

  hasPendingRequest: boolean;

  loading: {
    changeStatusLoading: boolean;
    sendRequestLoading: boolean;
    cancelRequestLoading: boolean;
  };

  modalActions: {
    openDelete: () => void;
    openLeave: () => void;
    openEdit: () => void;
  };

  actions: {
    handleToggleStatus: () => Promise<void>;
    handleRequest: () => Promise<void>;
    handleCancelRequest: () => Promise<void>;
  };
};

const CompanyDetailsActions = ({ role, companyStatus, hasPendingRequest, loading, modalActions, actions }: Props) => {
  const isGuest = role === null;

  return (
    <Box display="flex" gap={1} mt={0.5}>
      {role === 'owner' && (
        <OwnerCompanyActions
          companyStatus={companyStatus}
          isLoading={loading.changeStatusLoading}
          onToggleStatus={actions.handleToggleStatus}
          onEdit={modalActions.openEdit}
          onDelete={modalActions.openDelete}
        />
      )}

      {isGuest && (
        <GuestCompanyActions
          hasPendingRequest={hasPendingRequest}
          sendRequestLoading={loading.sendRequestLoading}
          cancelRequestLoading={loading.cancelRequestLoading}
          onRequest={actions.handleRequest}
          onCancelRequest={actions.handleCancelRequest}
        />
      )}

      {role === 'member' && <MemberCompanyActions onLeave={modalActions.openLeave} />}
    </Box>
  );
};

export default CompanyDetailsActions;
