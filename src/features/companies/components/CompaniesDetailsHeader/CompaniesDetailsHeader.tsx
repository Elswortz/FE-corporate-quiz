import { Company, CompanyRole } from '../../types/companiesTypes';
import { CardHeader } from '@mui/material';

import CompanyLogo from '../CompanyLogo/CompanyLogo';
import CompanyMeta from '../CompanyMeta/CompanyMeta';
import CompanyAddress from '../CompanyAddress/CompanyAddress';
import CompanyDetailsActions from '../CompanyDetailsActions/CompanyDetailsActions';

type Props = {
  company: Company;

  role: CompanyRole | null;

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
    handleChangeLogo: (formData: FormData) => Promise<void>;
  };
};

const CompanyDetailsHeader = ({ company, role, hasPendingRequest, loading, modalActions, actions }: Props) => {
  return (
    <CardHeader
      sx={{
        alignItems: 'flex-start',
        pb: 0,

        '& .MuiCardHeader-action': {
          margin: 0,
          alignSelf: 'flex-start',
          ml: 2,
        },
      }}
      avatar={<CompanyLogo company={company} isOwner={role === 'owner'} onChangeLogo={actions.handleChangeLogo} />}
      title={<CompanyMeta companyName={company.company_name} companyStatus={company.company_status} />}
      subheader={<CompanyAddress address={company.company_address} />}
      action={
        <CompanyDetailsActions
          role={role}
          companyStatus={company.company_status}
          hasPendingRequest={hasPendingRequest}
          loading={loading}
          modalActions={modalActions}
          actions={actions}
        />
      }
    />
  );
};

export default CompanyDetailsHeader;
