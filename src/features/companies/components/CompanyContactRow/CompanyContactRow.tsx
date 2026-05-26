import { ReactNode } from 'react';

import { Box, Link as MuiLink, Typography } from '@mui/material';

type Props = {
  icon: ReactNode;
  href?: string;
  children: ReactNode;
  isExternal?: boolean;
};

const CompanyContactRow = ({ icon, href, children, isExternal = false }: Props) => {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      {icon}

      {href ? (
        <MuiLink
          href={href}
          underline="hover"
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          <Typography variant="body2" noWrap={isExternal}>
            {children}
          </Typography>
        </MuiLink>
      ) : (
        <Typography variant="body2">{children}</Typography>
      )}
    </Box>
  );
};

export default CompanyContactRow;
