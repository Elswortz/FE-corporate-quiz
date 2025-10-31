import { Box, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

const Logo = () => {
  return (
    <Box display="flex" alignItems="center" gap={1} sx={{ marginRight: 8 }}>
      <SchoolIcon />
      <Typography variant="h6" component="div">
        Company Quiz
      </Typography>
    </Box>
  );
};

export default Logo;
