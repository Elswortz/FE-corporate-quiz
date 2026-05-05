import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { NavLink, useLocation } from 'react-router-dom';

const getInitials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(s => s[0]?.toUpperCase() ?? '')
    .join('');

const CompaniesItem = ({ company }) => {
  const location = useLocation();
  if (!company) return null;

  const {
    company_name,
    company_address,
    company_email,
    company_phone,
    company_website,
    company_logo_url,
    company_description,
    company_status,
  } = company;

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardHeader
        avatar={
          company_logo_url ? (
            <Avatar src={company_logo_url} alt={company_name} />
          ) : (
            <Avatar>{getInitials(company_name)}</Avatar>
          )
        }
        title={
          <Box display="flex" alignItems="center" gap={1}>
            <NavLink to={`/companies/${company.id.toString()}`} state={{ from: location }}>
              <Typography variant="h6">{company_name}</Typography>
            </NavLink>
            <Chip
              label={company_status || 'unknown'}
              size="small"
              color={company_status === 'hidden' ? 'default' : 'primary'}
            />
          </Box>
        }
        subheader={
          company_address && (
            <Box display="flex" alignItems="center" gap={0.5}>
              <LocationOnIcon fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                {company_address}
              </Typography>
            </Box>
          )
        }
      />

      <CardContent>
        <Stack spacing={1}>
          {company_email && (
            <Box display="flex" alignItems="center" gap={1}>
              <EmailIcon fontSize="small" color="action" />
              <Link href={`mailto:${company_email}`} underline="hover">
                <Typography variant="body2">{company_email}</Typography>
              </Link>
            </Box>
          )}

          {company_phone && (
            <Box display="flex" alignItems="center" gap={1}>
              <PhoneIcon fontSize="small" color="action" />
              <Link href={`tel:${company_phone}`} underline="hover">
                <Typography variant="body2">{company_phone}</Typography>
              </Link>
            </Box>
          )}

          {company_website && (
            <Box display="flex" alignItems="center" gap={1}>
              <LanguageIcon fontSize="small" color="action" />
              <Link href={company_website} target="_blank" rel="noopener noreferrer" underline="hover">
                <Typography variant="body2">{company_website}</Typography>
              </Link>
            </Box>
          )}

          {company_description && (
            <Typography variant="body2" color="text.secondary">
              {company_description}
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CompaniesItem;
