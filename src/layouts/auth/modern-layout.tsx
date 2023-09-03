import type { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import { Logo } from 'src/components/logo';

import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = (props) => {
  const { children } = props;

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: {
          xs: 'column-reverse',
          md: 'row'
        }
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          backgroundColor: 'neutral.800',
          backgroundImage: 'url("/assets/gradient-bg.svg")',
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat',
          color: 'common.white',
          display: 'flex',
          flex: {
            xs: '0 0 auto',
            md: '1 1 auto'
          },
          justifyContent: 'center',
          p: {
            xs: 4,
            md: 8
          }
        }}
      >
        {/* <Box maxWidth="md">
          <Typography
            sx={{ mb: 1 }}
            variant="h4"
          >
            Welcome 
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ mb: 4 }}
          >
          Unlock the full potential of your business operations with our cutting-edge scheduling software, designed to meet the unique challenges of your organization. Created with an intuitive user interface, our system allows for seamless integration into your existing processes, enabling effortless coordination and resource allocation. </Typography>
          <Typography
            variant="subtitle2"
            sx={{ mb: 2 }}
          >
         Login to experience the magic </Typography>
        
        </Box> */}
    
      <Box
        sx={{
          backgroundColor: 'background.paper',
          display: 'flex',
          flex: {
            xs: '1 1 auto',
            md: '0 0 auto'
          },
          flexDirection: 'column',
          justifyContent: {
            md: 'center'
          },
          maxWidth: '100%',
          p: {
            xs: 4,
            md: 8
          },
          width: {
            md: 600
          }
        }}
      >
        <div>
          <Box sx={{ mb: 4 }}>
            <Stack
              alignItems="center"
              component={RouterLink}
              direction="row"
              display="inline-flex"
              href={paths.index}
              spacing={1}
              sx={{ textDecoration: 'none' }}
            >
              <Box
                sx={{
                  display: 'inline-flex',
                  height: 24,
                  width: 24
                }}
              >
                <Logo />
              </Box>
              <Box
                sx={{
                  color: 'text.primary',
                  fontFamily: '\'Plus Jakarta Sans\', sans-serif',
                  fontSize: 14,
                  fontWeight: 800,
                  letterSpacing: '0.3px',
                  lineHeight: 2.5,
                  '& span': {
                    color: 'primary.main'
                  }
                }}
              >
                Scheduler <span> Pro</span>
              </Box>
            </Stack>
          </Box>
          {children}
        </div>
      </Box>
    </Box>
    </Box>
  );
};

Layout.propTypes = {
  children: PropTypes.node
};
