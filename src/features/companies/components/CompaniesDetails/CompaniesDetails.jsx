import { NavLink, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchCompanyById, deleteCompany, changeCompanyStatus, changeCompanyLogo } from '../../store/companiesThunks';
import { clearCurrentCompany } from '../../store/companiesSlice';
import { requestMembership } from '../../../users/store/usersActionsThunks.js';
import { useNavigate } from 'react-router-dom';
import { selectProfileData } from '../../../users/store/usersSelectors.js';
import { showNotification } from '../../../notifications/store/notificationsSlice.js';

import ConfirmModal from '../../../../components/ui/ConfirmModal/ConfirmModal.jsx';
import EditCompanyModal from '../EditCompanyModal/EditCompanyModal';
import getUserRoleInCompany from '../../../../utils/getUserRoleInCompany.js';

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

const CompaniesDetails = () => {
  const { companyId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isLoading, error } = useSelector(state => state.companies.selected);
  const { isLoading: SatusLoading } = useSelector(state => state.companies.operations.changeStatus);
  const user = useSelector(selectProfileData);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const currentPath = location.pathname;
  const basePath = `/companies/${companyId}`;
  let tabValue = 0;
  if (currentPath.endsWith('/quizzes')) tabValue = 1;
  if (currentPath.endsWith('/invitations')) tabValue = 2;

  const backLinkHref = location.state?.from ?? '/companies';

  const handleToggleStatus = async () => {
    const newStatus = data.company_status === 'hidden' ? 'visible' : 'hidden';
    await dispatch(changeCompanyStatus({ companyId: data.id, status: newStatus })).unwrap();
    await dispatch(fetchCompanyById(data.id)).unwrap();
  };

  const handleChangeLogo = async e => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('logo_file', file);

    await dispatch(changeCompanyLogo({ companyId: data.id, logoFile: formData })).unwrap();
    await dispatch(fetchCompanyById(data.id)).unwrap();
  };

  const handleRequest = async () => {
    try {
      await dispatch(requestMembership(companyId)).unwrap();
      showNotification({ message: 'Request to join successfully sent', severity: 'success' });
    } catch (err) {
      showNotification({ message: err.response?.data?.message || 'Failed request to join company', severity: 'error' });
    }
  };

  const role = getUserRoleInCompany(data, user?.id);
  const isOwner = role === 'owner';
  // const isAdmin = role === 'admin';
  // const isMember = role === 'member';
  const isUser = user && role !== 'owner' && role !== 'admin' && role !== 'member';

  useEffect(() => {
    if (companyId) {
      dispatch(fetchCompanyById(companyId));
    }
    return () => {
      dispatch(clearCurrentCompany());
    };
  }, [dispatch, companyId]);

  const handleDelete = async () => {
    await dispatch(deleteCompany(data.id)).unwrap();
    setIsDialogOpen(false);
    navigate(backLinkHref);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" textAlign="center" mt={4}>
        {error}
      </Typography>
    );
  }

  if (!data) {
    return (
      <Typography textAlign="center" mt={4}>
        Company not found
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
  } = data;

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', p: { xs: 2, md: 4 } }}>
      <Button component={NavLink} to={backLinkHref} startIcon={<ArrowBackIcon />} sx={{ mb: 2 }}>
        Back
      </Button>

      <Card variant="outlined">
        <CardHeader
          avatar={
            <Box position="relative" width={80} height={80}>
              <input
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
                  if (isOwner) document.getElementById('logo-upload').click();
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
                  onClick={() => document.getElementById('logo-upload').click()}
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
                    startIcon={data.company_status === 'hidden' ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    disabled={SatusLoading}
                    size="small"
                    variant="outlined"
                  >
                    {data.company_status === 'hidden' ? 'Show' : 'Hide'}
                  </Button>

                  <Button onClick={() => setIsEditOpen(true)} startIcon={<EditIcon />} size="small" variant="outlined">
                    Edit
                  </Button>

                  <Button
                    onClick={() => setIsDialogOpen(true)}
                    startIcon={<DeleteIcon />}
                    size="small"
                    variant="contained"
                    color="error"
                  >
                    Delete
                  </Button>
                </Box>
              )}

              {isUser && (
                <Button onClick={handleRequest} size="small" variant="contained" color="primary">
                  Request to join
                </Button>
              )}
            </>
          }
        />

        <CardContent>
          <Grid container spacing={3} alignItems="flex-start">
            <Grid item xs={12} md={4}>
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

            <Grid item xs={12} md={8}>
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
          <Tab label="Invitations" component={NavLink} to={`${basePath}/invitations`} />
        </Tabs>
      </Box>

      <ConfirmModal
        isOpen={isDialogOpen}
        title={'Confirm Company Deletion'}
        description={'Are you sure you want to delete your company? This action cannot be undone.'}
        confirmText={'Delete'}
        confirmColor={'error'}
        onConfirm={handleDelete}
        onCancel={() => setIsDialogOpen(false)}
      />

      <EditCompanyModal open={isEditOpen} onClose={() => setIsEditOpen(false)} />
    </Box>
  );
};

export default CompaniesDetails;
