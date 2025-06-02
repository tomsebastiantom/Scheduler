import type { FC } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export const HomeCta: FC = () => (
  <Box
    sx={{
      backgroundColor: 'neutral.800',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'top center',
      backgroundImage: 'url("/assets/gradient-bg.svg")',
      color: 'neutral.100',
      py: '120px'
    }}
  >
    <Container maxWidth="lg">
      <Stack spacing={2}>
        <Typography
          align="center"
          color="inherit"
          variant="h3"
        >
          Start Scheduling today!
        </Typography>
        <Typography
          align="center"
          color="inherit"
          variant="subtitle2"
        >
          A complete solutions for all your scheduling needs.
        </Typography>
      </Stack>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 3 }}
      >
        <Button
          component={RouterLink}
          href={paths.dashboard.index}
          variant="contained"
        >
          View Dashboard
        </Button>
        <Button
          component={RouterLink}
          href="/manual-login"
          variant="outlined"
          sx={{ color: 'neutral.100', borderColor: 'neutral.100' }}
        >
          Manual Login
        </Button>
      </Stack>
    </Container>
  </Box>
);
