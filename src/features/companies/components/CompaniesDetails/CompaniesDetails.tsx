import { NavLink, useParams, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks.js';
import { ChangeEvent, useEffect, useState, useRef } from 'react';
import {
  fetchCompanyById,
  deleteCompany,
  changeCompanyStatus,
  changeCompanyLogo,
  leaveCompany,
} from '../../store/companiesThunks.js';
import { clearCurrentCompany } from '../../store/companiesSlice.js';
import { sendRequest, cancelRequest, fetchUserInvitations } from '@/features/invitations/store/invitationsThunks.js';
import { useNavigate } from 'react-router-dom';
import { showNotification } from '../../../notifications/store/notificationsSlice.js';

import ConfirmModal from '../../../../components/ui/ConfirmModal/ConfirmModal.js';
import EditCompanyModal from '../EditCompanyModal/EditCompanyModal.js';
import { getUserRoleInCompany } from '@/utils/companyHelpers.js';

import {
  Box,
  CircularProgress,
  Typography,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Grid,
  Chip,
  Link as MuiLink,
  Button,
  Tabs,
  Tab,
  Backdrop,
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import {
  selectChangeStatusError,
  selectChangeStatusLoading,
  selectDeleteCompanyLoading,
  selectLeaveCompanyError,
  selectLeaveCompanyLoading,
  selectPendingInvitationIdByCompany,
  selectSelectedCompany,
  selectSelectedCompanyError,
} from '../../store/companiesSelectors.js';
import {
  selectCancelRequestError,
  selectCancelRequestLoading,
  selectSendRequestError,
  selectSendRequestLoading,
} from '@/features/invitations/store/invitationsSelectors.js';
import { selectUserProfileData } from '@/features/users/store/usersSelectors.js';

const CompaniesDetails = () => {
  const params = useParams();
  const companyId = params.companyId;
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!companyId) {
    return null;
  }

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const pendingInvitationId = useAppSelector(selectPendingInvitationIdByCompany(companyId));
  const hasPendingRequest = Boolean(pendingInvitationId);

  const selectedCompany = useAppSelector(selectSelectedCompany);

  const selectedCompanyLoading = useAppSelector(selectDeleteCompanyLoading);
  const selectedCompanyError = useAppSelector(selectSelectedCompanyError);

  const changeStatusLoading = useAppSelector(selectChangeStatusLoading);
  // const changeStatusError = useAppSelector(selectChangeStatusError);

  const sendRequestLoading = useAppSelector(selectSendRequestLoading);
  // const sendRequestError = useAppSelector(selectSendRequestError);

  const cancelRequestLoading = useAppSelector(selectCancelRequestLoading);
  // const cancelRequestError = useAppSelector(selectCancelRequestError);

  const leaveCompanyLoading = useAppSelector(selectLeaveCompanyLoading);
  // const leaveCompanyError = useAppSelector(selectLeaveCompanyError);

  const user = useAppSelector(selectUserProfileData);

  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [isConfirmLeaveOpen, setIsConfirmLeaveOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const currentPath = location.pathname;
  const basePath = `/companies/${companyId}`;
  let tabValue = 0;
  if (currentPath.endsWith('/quizzes')) tabValue = 1;
  if (currentPath.endsWith('/invitations')) tabValue = 2;

  const backLinkHref = location.state?.from ?? '/companies';

  useEffect(() => {
    if (!companyId) return;

    dispatch(fetchCompanyById(companyId));
    dispatch(fetchUserInvitations());

    return () => {
      dispatch(clearCurrentCompany());
    };
  }, [dispatch, companyId]);

  if (!selectedCompany) {
    return (
      <Typography textAlign="center" mt={4}>
        Company not found
      </Typography>
    );
  }

  const handleToggleStatus = async () => {
    const newStatus = selectedCompany.company_status === 'hidden' ? 'visible' : 'hidden';
    await dispatch(changeCompanyStatus({ companyId: selectedCompany.id, status: newStatus })).unwrap();
    await dispatch(fetchCompanyById(selectedCompany.id)).unwrap();
  };

  const handleChangeLogo = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('logo_file', file);
    await dispatch(
      changeCompanyLogo({
        companyId: selectedCompany.id,
        formData,
      })
    ).unwrap();

    await dispatch(fetchCompanyById(selectedCompany.id)).unwrap();
  };

  const handleRequest = async () => {
    try {
      await dispatch(sendRequest(companyId)).unwrap();
      await dispatch(fetchUserInvitations()).unwrap();
      dispatch(showNotification({ message: 'Request to join successfully sent', severity: 'success' }));
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

      dispatch(showNotification({ message: 'Request successfully canceled', severity: 'info' }));
    } catch (err: any) {
      dispatch(
        showNotification({ message: err.response?.data?.message || 'Failed to cancel request', severity: 'error' })
      );
    }
  };

  const handleLeave = async () => {
    try {
      await dispatch(leaveCompany(companyId)).unwrap();
      await dispatch(fetchCompanyById(companyId)).unwrap();
      setIsConfirmLeaveOpen(false);
      dispatch(showNotification({ message: 'You have successfully left the company', severity: 'success' }));
    } catch (err: any) {
      dispatch(
        showNotification({ message: err.response?.data?.message || 'Failed to leave the company', severity: 'error' })
      );
    }
  };

  const role = getUserRoleInCompany(selectedCompany, user?.id);
  const isOwner = role === 'owner';
  const isAdmin = role === 'admin';
  const isMember = role === 'member';
  const isUser = user && role !== 'owner' && role !== 'admin' && role !== 'member';

  const handleDelete = async () => {
    try {
      await dispatch(deleteCompany(selectedCompany.id)).unwrap();
      setIsConfirmDeleteOpen(false);
      navigate(backLinkHref);
      dispatch(showNotification({ message: 'Your company successfully deleted', severity: 'success' }));
    } catch (err: any) {
      showNotification({ message: err.response?.data?.message || 'Unable to delete a company', severity: 'error' });
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

  const {
    id,
    company_name,
    company_address,
    company_email,
    company_phone,
    company_website,
    company_logo_url,
    company_description,
    company_status,
  } = selectedCompany;

  return (
    <Box sx={{ mx: 'auto', p: { xs: 2, md: 4 } }}>
      <Button component={NavLink} to={backLinkHref} startIcon={<ArrowBackIcon />} sx={{ mb: 2 }}>
        Back
      </Button>

      <Card variant="outlined">
        <CardHeader
          avatar={
            <Box position="relative" width={80} height={80}>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                id="logo-upload"
                style={{ display: 'none' }}
                onChange={handleChangeLogo}
              />
              <Avatar
                src={company_logo_url}
                alt={company_name}
                sx={{
                  width: 80,
                  height: 80,
                  fontSize: 24,
                  cursor: isOwner ? 'pointer' : 'default',
                }}
                onClick={() => {
                  if (isOwner) fileInputRef.current?.click();
                }}
              >
                {!company_logo_url &&
                  company_name
                    ?.split(' ')
                    .map(s => s[0])
                    .slice(0, 2)
                    .join('')}
              </Avatar>
              {isOwner && (
                <Box
                  onClick={() => fileInputRef.current?.click()}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    cursor: 'pointer',
                    transition: 'opacity 0.2s ease-in-out',
                    '&:hover': { opacity: 1 },
                  }}
                >
                  <EditIcon sx={{ color: 'white', fontSize: 26 }} />
                </Box>
              )}
            </Box>
          }
          title={
            <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
              <Typography variant="h5">{company_name}</Typography>
              <Chip
                label={company_status || 'unknown'}
                size="small"
                color={company_status === 'hidden' ? 'default' : 'primary'}
              />
            </Box>
          }
          subheader={
            company_address && (
              <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                <LocationOnIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {company_address}
                </Typography>
              </Box>
            )
          }
          sx={{ pb: 0 }}
          action={
            <>
              {isOwner && (
                <Box display="flex" gap={1}>
                  <Button
                    onClick={handleToggleStatus}
                    startIcon={company_status === 'hidden' ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    disabled={changeStatusLoading}
                    size="small"
                    variant="outlined"
                  >
                    {company_status === 'hidden' ? 'Show' : 'Hide'}
                  </Button>

                  <Button onClick={() => setIsEditOpen(true)} startIcon={<EditIcon />} size="small" variant="outlined">
                    Edit
                  </Button>

                  <Button
                    onClick={() => setIsConfirmDeleteOpen(true)}
                    startIcon={<DeleteIcon />}
                    size="small"
                    variant="contained"
                    color="error"
                  >
                    Delete
                  </Button>
                </Box>
              )}

              {isUser &&
                (hasPendingRequest ? (
                  <Button
                    onClick={handleCancelRequest}
                    size="small"
                    variant="outlined"
                    color="warning"
                    loading={cancelRequestLoading}
                  >
                    Cancel request
                  </Button>
                ) : (
                  <Button
                    onClick={handleRequest}
                    size="small"
                    variant="contained"
                    color="primary"
                    loading={sendRequestLoading}
                  >
                    Request to join
                  </Button>
                ))}

              {isMember && (
                <Button onClick={() => setIsConfirmLeaveOpen(true)} size="small" variant="contained" color="error">
                  Leave
                </Button>
              )}
            </>
          }
        />

        <CardContent>
          <Grid container spacing={3} alignItems="flex-start">
            <Grid size={{ xs: 12, md: 4 }}>
              <Box display="flex" flexDirection="column" gap={1}>
                {company_email && (
                  <Box display="flex" alignItems="center" gap={1}>
                    <EmailIcon fontSize="small" color="action" />
                    <MuiLink href={`mailto:${company_email}`} underline="hover">
                      <Typography variant="body2">{company_email}</Typography>
                    </MuiLink>
                  </Box>
                )}

                {company_phone && (
                  <Box display="flex" alignItems="center" gap={1}>
                    <PhoneIcon fontSize="small" color="action" />
                    <MuiLink href={`tel:${company_phone}`} underline="hover">
                      <Typography variant="body2">{company_phone}</Typography>
                    </MuiLink>
                  </Box>
                )}

                {company_website && (
                  <Box display="flex" alignItems="center" gap={1}>
                    <LanguageIcon fontSize="small" color="action" />
                    <MuiLink href={company_website} target="_blank" rel="noopener noreferrer" underline="hover">
                      <Typography variant="body2" noWrap>
                        {company_website}
                      </Typography>
                    </MuiLink>
                  </Box>
                )}

                <Box mt={1}>
                  <Typography variant="caption" color="text.secondary">
                    ID: {id}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="subtitle1" gutterBottom>
                About
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
                {company_description || 'No description provided.'}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box mt={4}>
        <Tabs value={tabValue} textColor="primary" indicatorColor="primary">
          <Tab label="Members" component={NavLink} to={`${basePath}/members`} />
          <Tab label="Quizzes" component={NavLink} to={`${basePath}/quizzes`} />
          {(isOwner || isAdmin) && <Tab label="Invitations" component={NavLink} to={`${basePath}/invitations`} />}
        </Tabs>
      </Box>

      <ConfirmModal
        isOpen={isConfirmDeleteOpen}
        title={'Confirm Company Deletion'}
        description={'Are you sure you want to delete your company? This action cannot be undone.'}
        confirmText={'Delete'}
        confirmColor={'error'}
        onConfirm={handleDelete}
        onCancel={() => setIsConfirmDeleteOpen(false)}
      />

      <ConfirmModal
        isOpen={isConfirmLeaveOpen}
        title={'Confirm Leave From Company'}
        description={'Are you sure you want to leave this company? This action cannot be undone'}
        confirmText={'Leave'}
        confirmColor={'error'}
        onConfirm={handleLeave}
        onCancel={() => setIsConfirmLeaveOpen(false)}
        isLoading={leaveCompanyLoading}
      />
      <EditCompanyModal open={isEditOpen} onClose={() => setIsEditOpen(false)} />
    </Box>
  );
};

export default CompaniesDetails;
