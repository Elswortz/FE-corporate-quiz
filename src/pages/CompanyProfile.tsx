import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useLocation, NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import {
  fetchCompanyById,
  deleteCompany,
  changeCompanyStatus,
  changeCompanyLogo,
  leaveCompany,
} from '@/features/companies/store/companiesThunks';

import { clearCurrentCompany } from '@/features/companies/store/companiesSlice';

import { sendRequest, cancelRequest, fetchUserInvitations } from '@/features/invitations/store/invitationsThunks';

import {
  selectChangeStatusLoading,
  selectDeleteCompanyLoading,
  selectLeaveCompanyLoading,
  selectPendingInvitationIdByCompany,
  selectSelectedCompany,
  selectSelectedCompanyError,
} from '@/features/companies/store/companiesSelectors';

import {
  selectCancelRequestLoading,
  selectSendRequestLoading,
} from '@/features/invitations/store/invitationsSelectors';

import { showNotification } from '@/features/notifications/store/notificationsSlice';

import { getUserRoleInCompany } from '@/utils/companyHelpers';
import CompanyDetailsView from '@/features/companies/components/CompaniesDetailsView/CompaniesDetailsView';
import { Outlet } from 'react-router-dom';
import { Container, Typography, Box, CircularProgress, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAuth } from '@/features/auth/hooks/useAuth';

const CompanyProfile = () => {
  const { companyId } = useParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, user } = useAuth();

  const selectedCompany = useAppSelector(selectSelectedCompany);
  const selectedCompanyLoading = useAppSelector(selectDeleteCompanyLoading);
  const selectedCompanyError = useAppSelector(selectSelectedCompanyError);

  const changeStatusLoading = useAppSelector(selectChangeStatusLoading);
  const sendRequestLoading = useAppSelector(selectSendRequestLoading);
  const cancelRequestLoading = useAppSelector(selectCancelRequestLoading);
  const leaveCompanyLoading = useAppSelector(selectLeaveCompanyLoading);

  const pendingInvitationId = useAppSelector(selectPendingInvitationIdByCompany(companyId || ''));
  const hasPendingRequest = Boolean(pendingInvitationId);

  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [isConfirmLeaveOpen, setIsConfirmLeaveOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const backLinkHref = location.state?.from ?? '/companies';

  useEffect(() => {
    if (!companyId) return;
    dispatch(fetchCompanyById(companyId));
    dispatch(fetchUserInvitations());

    return () => {
      dispatch(clearCurrentCompany());
    };
  }, [dispatch, companyId]);

  const role = useMemo(() => {
    if (!selectedCompany || !user) return null;
    return getUserRoleInCompany(selectedCompany, user.id);
  }, [selectedCompany, user]);

  const handleToggleStatus = async () => {
    if (!selectedCompany) return;

    const newStatus = selectedCompany.company_status === 'hidden' ? 'visible' : 'hidden';

    await dispatch(
      changeCompanyStatus({
        companyId: selectedCompany.id,
        status: newStatus,
      })
    ).unwrap();

    await dispatch(fetchCompanyById(selectedCompany.id)).unwrap();
  };

  const handleChangeLogo = async (formData: FormData) => {
    if (!selectedCompany) return;

    await dispatch(
      changeCompanyLogo({
        companyId: selectedCompany.id,
        formData,
      })
    ).unwrap();

    await dispatch(fetchCompanyById(selectedCompany.id)).unwrap();
  };

  const handleRequest = async () => {
    if (!companyId) return;

    try {
      await dispatch(sendRequest(companyId)).unwrap();
      await dispatch(fetchUserInvitations()).unwrap();

      dispatch(
        showNotification({
          message: 'Request to join successfully sent',
          severity: 'success',
        })
      );
    } catch (err: any) {
      dispatch(
        showNotification({
          message: err.response?.data?.message || 'Failed request to join company',
          severity: 'error',
        })
      );
    }
  };

  const handleCancelRequest = async () => {
    if (!pendingInvitationId) return;

    try {
      await dispatch(cancelRequest(pendingInvitationId)).unwrap();
      await dispatch(fetchUserInvitations()).unwrap();

      dispatch(
        showNotification({
          message: 'Request successfully canceled',
          severity: 'info',
        })
      );
    } catch (err: any) {
      dispatch(
        showNotification({
          message: err.response?.data?.message || 'Failed to cancel request',
          severity: 'error',
        })
      );
    }
  };

  const handleLeave = async () => {
    if (!companyId) return;

    try {
      await dispatch(leaveCompany(companyId)).unwrap();
      await dispatch(fetchCompanyById(companyId)).unwrap();
      setIsConfirmLeaveOpen(false);
      dispatch(
        showNotification({
          message: 'You have successfully left the company',
          severity: 'success',
        })
      );
    } catch (err: any) {
      dispatch(
        showNotification({
          message: err.response?.data?.message || 'Failed to leave the company',
          severity: 'error',
        })
      );
    }
  };

  const handleDelete = async () => {
    if (!selectedCompany) return;

    try {
      await dispatch(deleteCompany(selectedCompany.id)).unwrap();

      setIsConfirmDeleteOpen(false);

      navigate(backLinkHref);

      dispatch(
        showNotification({
          message: 'Your company successfully deleted',
          severity: 'success',
        })
      );
    } catch (err: any) {
      dispatch(
        showNotification({
          message: err.response?.data?.message || 'Unable to delete company',
          severity: 'error',
        })
      );
    }
  };

  if (selectedCompanyLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  if (selectedCompanyError) {
    return (
      <Typography color="error" textAlign="center" mt={4}>
        {selectedCompanyError}
      </Typography>
    );
  }

  if (!selectedCompany) {
    return (
      <Typography textAlign="center" mt={4}>
        Company not found
      </Typography>
    );
  }

  return (
    <>
      <Container maxWidth="lg">
        <Button component={NavLink} to={backLinkHref} startIcon={<ArrowBackIcon />} sx={{ mt: 4 }}>
          Back
        </Button>
        <CompanyDetailsView
          company={selectedCompany}
          role={role}
          isLoggedIn={isLoggedIn}
          backLinkHref={backLinkHref}
          hasPendingRequest={hasPendingRequest}
          loading={{
            changeStatusLoading,
            sendRequestLoading,
            cancelRequestLoading,
            leaveCompanyLoading,
          }}
          modalState={{
            isConfirmDeleteOpen,
            isConfirmLeaveOpen,
            isEditOpen,
          }}
          modalActions={{
            openDelete: () => setIsConfirmDeleteOpen(true),
            closeDelete: () => setIsConfirmDeleteOpen(false),

            openLeave: () => setIsConfirmLeaveOpen(true),
            closeLeave: () => setIsConfirmLeaveOpen(false),

            openEdit: () => setIsEditOpen(true),
            closeEdit: () => setIsEditOpen(false),
          }}
          actions={{
            handleToggleStatus,
            handleChangeLogo,
            handleRequest,
            handleCancelRequest,
            handleLeave,
            handleDelete,
          }}
        />
        <Outlet />
      </Container>
    </>
  );
};

export default CompanyProfile;
