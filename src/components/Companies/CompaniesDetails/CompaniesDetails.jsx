// ...existing code...
import { NavLink, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCompanyById } from '../../../store/companies/operations';

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
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const CompaniesDetails = () => {
  const { companyId } = useParams();
  const dispatch = useDispatch();
  const { selectedCompany, isLoading, error } = useSelector(state => state.companies);
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/companies';

  useEffect(() => {
    if (companyId) dispatch(fetchCompanyById(companyId));
  }, [dispatch, companyId]);

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

  if (!selectedCompany) {
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
  } = selectedCompany;

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', p: { xs: 2, md: 4 } }}>
      <Button component={NavLink} to={backLinkHref} startIcon={<ArrowBackIcon />} sx={{ mb: 2 }}>
        Back
      </Button>

      <Card variant="outlined">
        <CardHeader
          avatar={
            company_logo_url ? (
              <Avatar src={company_logo_url} alt={company_name} sx={{ width: 80, height: 80 }} />
            ) : (
              <Avatar sx={{ width: 80, height: 80 }}>
                {company_name
                  ?.split(' ')
                  .map(s => s[0])
                  .slice(0, 2)
                  .join('')}
              </Avatar>
            )
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
    </Box>
  );
};

export default CompaniesDetails;
// ...existing code...
