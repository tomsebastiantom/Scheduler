import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import { useState } from "react";
import Box from "@mui/material/Box";

import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";

import { RouterLink } from "src/components/router-link";
import { Seo } from "src/components/seo";

import { paths } from "src/paths";
import { LocationAddForm } from "src/sections/dashboard/location/location-add-form";

const Page = () => {
  const [locationSuccess, setLocationSuccess] = useState({
    locationSaved: false,
    locationId: "",
  });
  const onSubmitSuccess = (Id?: string) => {
    setLocationSuccess({
      locationSaved: true,
      ...(Id ? { locationId: Id } : { locationId: "" }),
    });
  };

  return (
    <>
      <Seo title="Dashboard: Add Location" />
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
                <Typography variant="subtitle2">Back to Locations</Typography>
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
            ></Stack>
            {!locationSuccess.locationSaved && (
              <LocationAddForm
                title="Add Location"
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
