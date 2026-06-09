import { Card, CardActionArea, Box, Stack, Link, Typography, Avatar } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useLocation, useNavigate } from 'react-router-dom';
import { Company } from '../../types/companiesTypes';

type Props = {
  company: Company;
};

const getInitials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word[0]?.toUpperCase() ?? '')
    .join('');

const CompaniesItem = ({ company }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    company_name,
    company_address,
    company_email,
    company_phone,
    company_website,
    company_logo_url,
    company_description,
  } = company;

  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
      }}
    >
      <CardActionArea
        onClick={() =>
          navigate(`/companies/${company.id}`, {
            state: { from: location },
          })
        }
        sx={{
          height: '100%',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        }}
      >
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <Avatar
            src={company_logo_url}
            alt={company_name}
            sx={{
              width: 48,
              height: 48,
              flexShrink: 0,
            }}
          >
            {getInitials(company_name)}
          </Avatar>

          <Box flex={1} minWidth={0}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {company_name}
            </Typography>

            <Stack direction="row" spacing={0.5} alignItems="flex-start" mt={1}>
              <LocationOnIcon
                fontSize="small"
                color="action"
                sx={{
                  mt: '2px',
                  flexShrink: 0,
                }}
              />

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  minHeight: 40,
                }}
              >
                {company_address || 'No address'}
              </Typography>
            </Stack>
          </Box>
        </Stack>

        <Stack
          spacing={1}
          mt={3}
          sx={{
            minHeight: 84,
          }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <EmailIcon fontSize="small" color="action" sx={{ flexShrink: 0 }} />

            <Typography
              variant="body2"
              noWrap
              sx={{
                flex: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {company_email || '—'}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <PhoneIcon fontSize="small" color="action" sx={{ flexShrink: 0 }} />

            <Typography
              variant="body2"
              noWrap
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {company_phone || '—'}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <LanguageIcon fontSize="small" color="action" sx={{ flexShrink: 0 }} />

            {company_website ? (
              <Link
                href={company_website}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                onClick={e => e.stopPropagation()}
                sx={{
                  flex: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {company_website}
              </Link>
            ) : (
              <Typography variant="body2">—</Typography>
            )}
          </Box>
        </Stack>

        <Typography
          variant="body2"
          color="text.secondary"
          noWrap
          sx={{
            mt: 'auto',
            pt: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {company_description || 'No description'}
        </Typography>
      </CardActionArea>
    </Card>
  );
};

export default CompaniesItem;
