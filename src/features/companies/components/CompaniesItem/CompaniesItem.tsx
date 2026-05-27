import {
  CardActionArea,
  Box,
  Stack,
  Link,
  Chip,
  Typography,
  CardContent,
  Avatar,
  CardHeader,
  Card,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { NavLink, useLocation } from 'react-router-dom';
import { Company } from '../../types/companiesTypes';

type Props = {
  company: Company;
};

const getInitials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(s => s[0]?.toUpperCase() ?? '')
    .join('');

const CompaniesItem = ({ company }: Props) => {
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
    <Card variant="outlined" sx={{ width: '100%', height: '100%' }}>
      <CardActionArea
        component={NavLink}
        to={`/companies/${company.id}`}
        state={{ from: location }}
        sx={{
          alignItems: 'stretch',
        }}
      >
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
              <Typography variant="h6">{company_name}</Typography>

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
                <Link href={`mailto:${company_email}`} underline="hover" onClick={e => e.stopPropagation()}>
                  <Typography variant="body2">{company_email}</Typography>
                </Link>
              </Box>
            )}

            {company_phone && (
              <Box display="flex" alignItems="center" gap={1}>
                <PhoneIcon fontSize="small" color="action" />
                <Link href={`tel:${company_phone}`} underline="hover" onClick={e => e.stopPropagation()}>
                  <Typography variant="body2">{company_phone}</Typography>
                </Link>
              </Box>
            )}

            {company_website && (
              <Box display="flex" alignItems="center" gap={1}>
                <LanguageIcon fontSize="small" color="action" />
                <Link
                  href={company_website}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  onClick={e => e.stopPropagation()}
                >
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
      </CardActionArea>
    </Card>
  );
};

export default CompaniesItem;
