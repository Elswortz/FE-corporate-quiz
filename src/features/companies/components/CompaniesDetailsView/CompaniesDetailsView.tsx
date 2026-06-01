import { Company, CompanyRole } from '../../types/companiesTypes';
import { Card } from '@mui/material';
import CompanyDetailsHeader from '../CompaniesDetailsHeader/CompaniesDetailsHeader';
import CompanyDetailsInfo from '../CompanyDetailsInfo/CompanyDetailsInfo';
import CompanyDetailsTabs from '../CompanyDetailsTabs/CompanyDetailsTabs';
import CompanyDetailsModals from '../CompanyDetailsModals/CompanyDetailsModals';

type Props = {
  company: Company;

  role: CompanyRole | null;

  isLoggedIn: boolean;

  backLinkHref: string;

  hasPendingRequest: boolean;

  loading: {
    changeStatusLoading: boolean;
    sendRequestLoading: boolean;
    cancelRequestLoading: boolean;
    leaveCompanyLoading: boolean;
  };

  modalState: {
    isConfirmDeleteOpen: boolean;
    isConfirmLeaveOpen: boolean;
    isEditOpen: boolean;
  };

  modalActions: {
    openDelete: () => void;
    closeDelete: () => void;

    openLeave: () => void;
    closeLeave: () => void;

    openEdit: () => void;
    closeEdit: () => void;
  };

  actions: {
    handleToggleStatus: () => Promise<void>;
    handleRequest: () => Promise<void>;
    handleCancelRequest: () => Promise<void>;
    handleLeave: () => Promise<void>;
    handleDelete: () => Promise<void>;
    handleChangeLogo: (formData: FormData) => Promise<void>;
  };
};

const CompanyDetailsView = ({
  company,
  role,
  isLoggedIn,
  hasPendingRequest,
  loading,
  modalState,
  modalActions,
  actions,
}: Props) => {
  return (
    <>
      <Card variant="outlined">
        <CompanyDetailsHeader
          company={company}
          role={role}
          isLoggedIn={isLoggedIn}
          hasPendingRequest={hasPendingRequest}
          loading={loading}
          modalActions={modalActions}
          actions={actions}
        />

        <CompanyDetailsInfo company={company} />
      </Card>

      <CompanyDetailsTabs companyId={company.id} role={role} />

      <CompanyDetailsModals
        modalState={modalState}
        modalActions={modalActions}
        loading={loading}
        onDelete={actions.handleDelete}
        onLeave={actions.handleLeave}
      />
    </>
  );
};

export default CompanyDetailsView;
