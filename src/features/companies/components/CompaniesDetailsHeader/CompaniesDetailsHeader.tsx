import { Company, CompanyRole } from '../../types/companiesTypes';
import { CardHeader } from '@mui/material';

import BusinessIcon from '@mui/icons-material/Business';
import CompanyMeta from '../CompanyMeta/CompanyMeta';
import CompanyAddress from '../CompanyAddress/CompanyAddress';
import CompanyDetailsActions from '../CompanyDetailsActions/CompanyDetailsActions';
import ImageUploader from '@/components/ui/ImageUpload/ImageUpload';

type Props = {
  company: Company;

  role: CompanyRole | undefined;

  isLoggedIn: boolean;

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
    handleChangeLogo: (file: File) => Promise<void>;
  };
};

const CompanyDetailsHeader = ({
  company,
  role,
  isLoggedIn,
  hasPendingRequest,
  loading,
  modalActions,
  actions,
}: Props) => {
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
      avatar={
        <ImageUploader
          src={company.company_logo_url}
          alt={company.company_name}
          size={80}
          disabled={role !== 'owner'}
          onUpload={actions.handleChangeLogo}
          fallback={<BusinessIcon fontSize="large" />}
        />
      }
      title={<CompanyMeta companyName={company.company_name} companyStatus={company.company_status} role={role} />}
      subheader={<CompanyAddress address={company.company_address} />}
      action={
        <CompanyDetailsActions
          role={role}
          isLoggedIn={isLoggedIn}
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
