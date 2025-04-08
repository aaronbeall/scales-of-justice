import { ReactNode } from 'react';
import { Box, Breadcrumbs, Typography, Link as MuiLink } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
}

export function PageLayout({ children, title }: PageLayoutProps) {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Box sx={{ mb: title ? 3 : 2 }}>
        <Breadcrumbs>
          <MuiLink
            component={Link}
            to="/"
            color="inherit"
            underline="hover"
          >
            Home
          </MuiLink>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            
            return isLast ? (
              <Typography color="text.primary" key={routeTo}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
            ) : (
              <MuiLink
                component={Link}
                to={routeTo}
                key={routeTo}
                color="inherit"
                underline="hover"
              >
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </MuiLink>
            );
          })}
        </Breadcrumbs>
        {title && (
          <Typography variant="h4" sx={{ mt: 1 }}>
            {title}
          </Typography>
        )}
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        {children}
      </Box>
    </Box>
  );
}