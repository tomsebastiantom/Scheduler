import type { FC } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { Logo } from "src/components/logo";
import { RouterLink } from "src/components/router-link";
import { paths } from "src/paths";

interface Section {
  title: string;
  items: {
    external?: boolean;
    title: string;
    path: string;
  }[];
}

const sections: Section[] = [
  {
    title: "Menu",
    items: [
      {
        title: "Contact Us",
        path: "#",
      },
    ],
  },
  {
    title: "Legal",
    items: [
      {
        title: "Terms & Conditions",
        path: "#",
      },
    ],
  },
  {
    title: "Social",
    items: [
      {
        title: "LinkedIn",
        path: "#",
      },
    ],
  },
];

export const Footer: FC = (props) => {
  return (
    <Box
      sx={{
        background:
          "linear-gradient(135deg, #0f1729 0%, #1e293b 50%, #365780 100%)",
        color: "#f8fafc",
        position: "relative",
        overflow: "hidden",
        pb: 6,
        pt: {
          md: 15,
          xs: 6,
        },
      }}
      {...props}
    >
      {" "}
      {/* Floating decorative elements */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          right: "5%",
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "rgba(59, 130, 246, 0.1)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(59, 130, 246, 0.2)",
          animation: "float 8s ease-in-out infinite",
          zIndex: 1,
          "@keyframes float": {
            "0%, 100%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(-15px)" },
          },
        }}
      />
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Grid container spacing={3}>
          <Grid
            xs={12}
            sm={4}
            md={3}
            sx={{
              order: {
                xs: 4,
                md: 1,
              },
            }}
          >
            <Stack spacing={1}>
              <Stack
                alignItems="center"
                component={RouterLink}
                direction="row"
                display="inline-flex"
                href={paths.index}
                spacing={1}
                sx={{
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                  },
                }}
              >
                {" "}
                <Box
                  sx={{
                    display: "inline-flex",
                    height: 32,
                    width: 32,
                    background: "rgba(59, 130, 246, 0.15)",
                    backdropFilter: "blur(10px)",
                    borderRadius: 2,
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(59, 130, 246, 0.3)",
                  }}
                >
                  <Logo />
                </Box>{" "}
                <Box
                  sx={{
                    color: "#f8fafc",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 18,
                    fontWeight: 800,
                    letterSpacing: "0.3px",
                    lineHeight: 2.5,
                    "& span": {
                      background:
                        "linear-gradient(45deg, #3b82f6 30%, #0ea5e9 90%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    },
                  }}
                >
                  Scheduler <span>Pro</span>
                </Box>
              </Stack>{" "}
              <Typography
                sx={{
                  color: "#e2e8f0",
                  fontWeight: 500,
                }}
                variant="caption"
              >
                © 2025 Scheduler Pro - Portfolio Demo
              </Typography>
              <Typography
                sx={{
                  color: "#cbd5e1",
                  fontSize: "0.75rem",
                  mt: 1,
                }}
              >
                Modern workforce management solution
              </Typography>
            </Stack>
          </Grid>{" "}
          {sections.map((section, index) => (
            <Grid
              key={section.title}
              xs={12}
              sm={4}
              md={3}
              sx={{
                order: {
                  md: index + 2,
                  xs: index + 1,
                },
              }}
            >
              {" "}
              <Typography
                sx={{
                  color: "#e2e8f0",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  mb: 2,
                }}
                variant="overline"
              >
                {section.title}
              </Typography>
              <Stack
                component="ul"
                spacing={1.5}
                sx={{
                  listStyle: "none",
                  m: 0,
                  p: 0,
                }}
              >
                {section.items.map((item) => {
                  const linkProps = item.path
                    ? item.external
                      ? {
                          component: "a",
                          href: item.path,
                          target: "_blank",
                        }
                      : {
                          component: RouterLink,
                          href: item.path,
                        }
                    : {};

                  return (
                    <Stack
                      alignItems="center"
                      direction="row"
                      key={item.title}
                      spacing={2}
                    >
                      {" "}
                      <Box
                        sx={{
                          background:
                            "linear-gradient(45deg, #3b82f6 30%, #0ea5e9 90%)",
                          height: 2,
                          width: 12,
                          borderRadius: 1,
                        }}
                      />
                      <Link
                        sx={{
                          color: "#cbd5e1",
                          fontWeight: 500,
                          textDecoration: "none",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            color: "#f8fafc",
                            textDecoration: "none",
                            transform: "translateX(2px)",
                          },
                        }}
                        variant="subtitle2"
                        {...linkProps}
                      >
                        {item.title}
                      </Link>
                    </Stack>
                  );
                })}
              </Stack>
            </Grid>
          ))}
        </Grid>
        <Divider
          sx={{
            my: 6,
            borderColor: "rgba(59, 130, 246, 0.3)",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.4) 50%, transparent 100%)",
            height: 1,
            border: "none",
          }}
        />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          {" "}
          <Typography
            sx={{
              color: "#cbd5e1",
              fontWeight: 400,
            }}
            variant="caption"
          >
            All Rights Reserved. Built with ❤️ using modern technologies.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Typography
              sx={{
                color: "#94a3b8",
                fontSize: "0.75rem",
                fontWeight: 500,
              }}
            >
              React • TypeScript • Material-UI
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
