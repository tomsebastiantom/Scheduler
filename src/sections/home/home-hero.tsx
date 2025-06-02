import type { FC } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import Stack from "@mui/material/Stack";

import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import { RouterLink } from "src/components/router-link";
import { paths } from "src/paths";

export const HomeHero: FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top center",
        pt: "120px",
      }}
    >
      <Container maxWidth="lg">
        <Box maxWidth="sm">
          <Typography variant="h1" sx={{ mb: 2 }}>
          
            <Typography component="span" color="primary.main" variant="inherit">
            A complete solutions for all your scheduling needs.
            </Typography>

          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              fontSize: 20,
              fontWeight: 500,
            }}
          >
            Elevate your workforce management with our comprehensive Employee
            Scheduling System. Simplify scheduling processes, enhance team
            communication, and increase productivity through an intuitive admin
            dashboard, precise time-tracking, and real-time shift updates.{" "}
          </Typography>
          <Stack
            alignItems="center"
            direction="row"
            flexWrap="wrap"
            spacing={1}
            sx={{ my: 3 }}
          ></Stack>
          <Stack alignItems="center" direction="row" spacing={2}>
            <Button
              component={RouterLink}
              href={paths.dashboard.index}
              sx={(theme) =>
                theme.palette.mode === "dark"
                  ? {
                      backgroundColor: "neutral.50",
                      color: "neutral.900",
                      "&:hover": {
                        backgroundColor: "neutral.200",
                      },
                    }
                  : {
                      backgroundColor: "neutral.900",
                      color: "neutral.50",
                      "&:hover": {
                        backgroundColor: "neutral.700",
                      },
                    }
              }
              variant="contained"
            >
              View Dashboard
            </Button>
              </Stack>
        </Box>
        <Box
          sx={{
            pt: "120px",
            position: "relative",
          }}
        ></Box>
      </Container>
    </Box>
  );
};
