import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import Mail01Icon from '@untitled-ui/icons-react/build/esm/Mail01';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';


import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';

import { paths } from 'src/paths';
import { ContactForm } from 'src/sections/contact/contact-form';

const Page = () => {


  return (
    <>
      <Seo title="Contact" />
      <Box
        component="main"
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            lg: 'repeat(2, 1fr)',
            xs: 'repeat(1, 1fr)'
          },
          flexGrow: 1
        }}
      >
        <Box
          sx={{
            backgroundColor: (theme) => theme.palette.mode === 'dark'
              ? 'neutral.800'
              : 'neutral.50',
            py: 8
          }}
        >
          <Container
            maxWidth="md"
            sx={{ pl: { lg: 15 } }}
          >
            <Stack spacing={3}>
              <div>
                <Link
                  color="text.primary"
                  component={RouterLink}
                  href={paths.index}
                  sx={{
                    alignItems: 'center',
                    display: 'inline-flex'
                  }}
                  underline="hover"
                >
                  <SvgIcon sx={{ mr: 1 }}>
                    <ArrowLeftIcon />
                  </SvgIcon>
                  <Typography variant="subtitle2">
                    Home
                  </Typography>
                </Link>
              </div>
              <Typography variant="h3">
                Contact
              </Typography>
            </Stack>
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
              sx={{
                mb: 6,
                mt: 8
              }}
            >
              <Avatar
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText'
                }}
                variant="rounded"
              >
                <SvgIcon>
                  <Mail01Icon />
                </SvgIcon>
              </Avatar>
              <Typography variant="overline">
                Contact support
              </Typography>
            </Stack>
            <Typography
              sx={{ mb: 3 }}
              variant="h1"
            >
              Talk to our experts
            </Typography>
            <Typography
              sx={{ mb: 3 }}
              variant="body1"
            >
              Have questions? Fill out the form
              and we will be in touch shortly.
            </Typography>
            <Typography
              color="primary"
              sx={{ mb: 3 }}
              variant="h6"
            >
            
            </Typography>
            <Stack
              alignItems="center"
              direction="row"
              flexWrap="wrap"
              gap={4}
              sx={{
                color: 'text.primary',
                '& > *': {
                  flex: '0 0 auto'
                }
              }}
            >
             
            </Stack>
          </Container>
        </Box>
        <Box
          sx={{
            backgroundColor: 'background.paper',
            px: 6,
            py: 15
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              pr: {
                lg: 15
              }
            }}
          >
            <Typography
              sx={{ pb: 3 }}
              variant="h6"
            >
              Fill the form below
            </Typography>
            <ContactForm />
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Page;
