import { CardContent, Grid } from '@mui/material';

import { Company } from '../../types/companiesTypes';

import CompanyContacts from '../CompanyContacts/CompanyContacts';
import CompanyDescription from '../CompanyDescription/CompanyDescription';

type Props = {
  company: Company;
};

const CompanyDetailsInfo = ({ company }: Props) => {
  return (
    <CardContent>
      <Grid container spacing={3} alignItems="flex-start">
        <Grid size={{ xs: 12, md: 4 }}>
          <CompanyContacts company={company} />
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <CompanyDescription description={company.company_description} />
        </Grid>
      </Grid>
    </CardContent>
  );
};

export default CompanyDetailsInfo;
