import { Typography } from '@mui/material';

type Props = {
  description?: string;
};

const CompanyDescription = ({ description }: Props) => {
  return (
    <>
      <Typography variant="subtitle1" gutterBottom>
        About
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          whiteSpace: 'pre-line',
        }}
      >
        {description || 'No description provided.'}
      </Typography>
    </>
  );
};

export default CompanyDescription;
