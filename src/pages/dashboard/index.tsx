import { addDays, subDays, subHours, subMinutes } from 'date-fns';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { Seo } from 'src/components/seo';

import { useSettings } from 'src/hooks/use-settings';


const now = new Date();

const Page = () => {
  const settings = useSettings();



  return (
    <>
      <Seo title="Dashboard: Overview" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={settings.stretch ? false : 'xl'}>
          <Grid
            container
            disableEqualOverflow
            spacing={{
              xs: 3,
              lg: 4
            }}
          >
            <Grid xs={12}>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <div>
                  <Typography variant="h4">
                    Overview
                  </Typography>
                </div>
                <div>
                  <Stack
                    direction="row"
                    spacing={4}
                  >
                  
                  </Stack>
                </div>
              </Stack>
            </Grid>
            <Grid
              xs={12}
              md={4}
            >
             
            </Grid>
            <Grid
              xs={12}
              md={4}
            >
              
            </Grid>
            <Grid
              xs={12}
              md={4}
            >
          
            </Grid>
            <Grid
              xs={12}
              md={7}
            >
             
            </Grid>
            <Grid
              xs={12}
              md={5}
            >
            
            </Grid>
            <Grid
              xs={12}
              md={7}
            >
             
            </Grid>
            <Grid
              xs={12}
              md={5}
            >
             
            </Grid>
            <Grid
              xs={12}
              md={7}
            >
              
            </Grid>
            <Grid
              xs={12}
              md={5}
            >
             
            </Grid>
            <Grid xs={6}>
            
            </Grid>
            <Grid xs={6}>
             
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Page;
