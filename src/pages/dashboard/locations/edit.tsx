import { useCallback, useEffect, useState } from "react";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { RouterLink } from "src/components/router-link";
import { Seo } from "src/components/seo";
import { useMounted } from "src/hooks/use-mounted";

import { paths } from "src/paths";
import { LocationAddForm } from "src/sections/dashboard/location/location-add-form";
import type { Location } from "src/types/location";

import { mockGetLocation } from "src/api/data/test.api";
const useLocation = (id: string) => {
  const isMounted = useMounted();
  const [location, setLocation] = useState<Location | undefined>(undefined);

  const handleLocationGet = useCallback(async () => {
    try {
      const response = await mockGetLocation(id);
      if (isMounted()) {
        setLocation(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted, id]);

  useEffect(() => {
    handleLocationGet();
  }, [handleLocationGet]);

  return { location };
};

const Page = () => {
  const { locationId } = useParams<{ locationId: string }>();
  const { location } = useLocation(locationId || '');
  const [locationSuccess, setLocationSuccess] = useState({
    locationSaved: false,
    locationId: ""
  });

  const onSubmitSuccess = () => {
    setLocationSuccess({
      locationSaved: true,
      locationId: locationId || ""
    });
  };

 

  if (!location) {
    return null;
  }

  return (
    <>
      <Seo title="Dashboard: Location Edit" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={4}>
            <div>
              <Link
                color="text.primary"
                component={RouterLink}
                href={paths.dashboard.locations.index}
                sx={{
                  alignItems: "center",
                  display: "inline-flex",
                }}
                underline="hover"
              >
                <SvgIcon sx={{ mr: 1 }}>
                  <ArrowLeftIcon />
                </SvgIcon>
                <Typography variant="subtitle2">Locations</Typography>
              </Link>
            </div>
            <Stack
              alignItems="flex-start"
              direction={{
                xs: "column",
                md: "row",
              }}
              justifyContent="space-between"
              spacing={4}
            >
              <Stack alignItems="center" direction="row" spacing={2}>
                <Avatar
                  src={location.companyName}
                  sx={{
                    height: 64,
                    width: 64,
                  }}
                >
                  {location.locationName[0]}
                </Avatar>
                <Stack spacing={1}>
                  <Typography variant="h4">{location.locationName}</Typography>
                  <Stack alignItems="center" direction="row" spacing={1}>
                    <Typography variant="subtitle2">location_id:</Typography>
                    <Chip label={location.id} size="small" />
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            {!locationSuccess.locationSaved && (
              <LocationAddForm
                locationProp={location}
                title="Edit Location"
                onSubmitSuccess={onSubmitSuccess}
              />
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
