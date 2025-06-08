import type { FC, ReactNode } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";

import { Logo } from "src/components/logo";

import { RouterLink } from "src/components/router-link";
import { paths } from "src/paths";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = (props) => {
  const { children } = props;

  return (
    <Box
      sx={{
        backgroundColor: "#f8fafc",
        display: "flex",
        flex: "1 1 auto",
        flexDirection: {
          xs: "column-reverse",
          md: "row",
        },
        minHeight: "100vh",
      }}
    >
      {" "}
      {/* Left side - Welcome Section */}
      <Box
        sx={{
          alignItems: "center",
          backgroundColor: "#0f1729",
          color: "#f8fafc",
          display: "flex",
          flex: {
            xs: "0 0 auto",
            md: "1 1 auto",
          },
          justifyContent: "center",
          p: {
            xs: 4,
            md: 8,
          },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <Stack spacing={4} alignItems="center" textAlign="center">
            {" "}
            <Box
              sx={{
                display: "inline-flex",
                height: 80,
                width: 80,
                mb: 2,
                borderRadius: "50%",
                backgroundColor: "rgba(59, 130, 246, 0.15)",
                backdropFilter: "blur(10px)",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid rgba(59, 130, 246, 0.3)",
              }}
            >
              <Logo />
            </Box>{" "}
            <Typography
              variant="h2"
              sx={{
                mb: 2,
                fontWeight: 800,
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                background: "linear-gradient(45deg, #3b82f6 30%, #0ea5e9 90%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Scheduler Pro
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 3,
                fontWeight: 300,
                opacity: 0.9,
                fontSize: { xs: "1.2rem", md: "1.5rem" },
                lineHeight: 1.4,
              }}
            >
              Professional Workforce Management
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 4,
                opacity: 0.8,
                fontSize: { xs: "1rem", md: "1.1rem" },
                lineHeight: 1.6,
                maxWidth: 600,
              }}
            >
              Streamline your operations with our cutting-edge scheduling
              platform. Built for modern businesses that demand efficiency,
              flexibility, and scalability.
            </Typography>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                backgroundColor: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 3,
                maxWidth: 400,
              }}
            >
              {" "}
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, mb: 2, color: "#f8fafc" }}
              >
                ✨ Portfolio Showcase Features
              </Typography>
              <Stack spacing={1} alignItems="flex-start">
                <Typography variant="body2" sx={{ color: "#e2e8f0" }}>
                  🚀 Real-time Scheduling Dashboard
                </Typography>
                <Typography variant="body2" sx={{ color: "#e2e8f0" }}>
                  👥 Advanced User Management
                </Typography>
                <Typography variant="body2" sx={{ color: "#e2e8f0" }}>
                  📊 Analytics & Reporting
                </Typography>
                <Typography variant="body2" sx={{ color: "#e2e8f0" }}>
                  🎯 Drag & Drop Interface
                </Typography>
              </Stack>
            </Paper>
          </Stack>
        </Container>

        {/* Floating elements for visual appeal */}
        <Box
          sx={{
            position: "absolute",
            top: "10%",
            right: "10%",
            width: 100,
            height: 100,
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.05)",
            animation: "float 6s ease-in-out infinite",
            "@keyframes float": {
              "0%, 100%": { transform: "translateY(0px)" },
              "50%": { transform: "translateY(-20px)" },
            },
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "20%",
            left: "10%",
            width: 60,
            height: 60,
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.05)",
            animation: "float 4s ease-in-out infinite 2s",
          }}
        />
      </Box>
      {/* Right side - Login Form */}{" "}
      <Box
        sx={{
          backgroundColor: "background.paper",
          display: "flex",
          flex: {
            xs: "1 1 auto",
            md: "0 0 auto",
          },
          flexDirection: "column",
          justifyContent: "flex-start",
          maxWidth: "100%",
          p: {
            xs: 4,
            md: 8,
          },
          pt: {
            xs: 2,
            md: 4,
          },
          width: {
            md: 600,
          },
          position: "relative",
          minHeight: "100vh",
          overflowY: "auto",
        }}
      >
        <Container maxWidth="sm">
          <Box sx={{ mb: 6 }}>
            <Stack
              alignItems="center"
              component={RouterLink}
              direction="row"
              display="inline-flex"
              href={paths.index}
              spacing={2}
              sx={{
                textDecoration: "none",
                mb: 4,
                p: 2,
                borderRadius: 2,
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "action.hover",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  height: 32,
                  width: 32,
                }}
              >
                <Logo />
              </Box>
              <Box
                sx={{
                  color: "text.primary",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 18,
                  fontWeight: 800,
                  letterSpacing: "0.3px",
                  lineHeight: 2.5,
                  "& span": {
                    color: "primary.main",
                  },
                }}
              >
                Scheduler <span>Pro</span>
              </Box>
            </Stack>
          </Box>

          {children}
        </Container>
      </Box>
    </Box>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};
