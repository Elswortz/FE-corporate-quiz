import { Box, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

type Props = {
  address?: string;
};

const CompanyAddress = ({ address }: Props) => {
  if (!address) {
    return null;
  }

  return (
    <Box display="flex" alignItems="center" gap={1} mt={0.5}>
      <LocationOnIcon fontSize="small" color="action" />

      <Typography variant="body2" color="text.secondary">
        {address}
      </Typography>
    </Box>
  );
};

export default CompanyAddress;
