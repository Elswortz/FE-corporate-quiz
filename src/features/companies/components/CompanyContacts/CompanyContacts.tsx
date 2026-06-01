import { Box, Typography } from '@mui/material';

import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';

import { Company } from '../../types/companiesTypes';

import CompanyContactRow from '../CompanyContactRow/CompanyContactRow';

type Props = {
  company: Company;
};

const CompanyContacts = ({ company }: Props) => {
  return (
    <Box display="flex" flexDirection="column" gap={1}>
      {company.company_email && (
        <CompanyContactRow
          icon={<EmailIcon fontSize="small" color="action" />}
          href={`mailto:${company.company_email}`}
        >
          {company.company_email}
        </CompanyContactRow>
      )}

      {company.company_phone && (
        <CompanyContactRow icon={<PhoneIcon fontSize="small" color="action" />} href={`tel:${company.company_phone}`}>
          {company.company_phone}
        </CompanyContactRow>
      )}

      {company.company_website && (
        <CompanyContactRow
          icon={<LanguageIcon fontSize="small" color="action" />}
          href={company.company_website}
          isExternal
        >
          {company.company_website}
        </CompanyContactRow>
      )}

      <Box mt={1}>
        <Typography variant="caption" color="text.secondary">
          ID: {company.id}
        </Typography>
      </Box>
    </Box>
  );
};

export default CompanyContacts;
