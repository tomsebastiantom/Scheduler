import type { FC } from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
import Slide from "@mui/material/Slide";
import Zoom from "@mui/material/Zoom";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import { RouterLink } from "src/components/router-link";
import { paths } from "src/paths";

export const HomeHero: FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <Box
      sx={{
        background:
          "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating elements for visual appeal */}
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          right: "10%",
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: "rgba(59, 130, 246, 0.1)",
          backdropFilter: "blur(15px)",
          border: "1px solid rgba(59, 130, 246, 0.2)",
          animation: "float 6s ease-in-out infinite",
          zIndex: 1,
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
          left: "5%",
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "rgba(14, 165, 233, 0.1)",
          backdropFilter: "blur(15px)",
          border: "1px solid rgba(14, 165, 233, 0.2)",
          animation: "float 8s ease-in-out infinite reverse",
          zIndex: 1,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Fade in={isVisible} timeout={800}>
          <Box maxWidth="lg">
            {/* Hero Badge */}
            <Slide direction="down" in={isVisible} timeout={600}>
              <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
                {" "}
                <Chip
                  icon={<AutoAwesomeIcon />}
                  label="Portfolio Demo - Full Stack Scheduler"
                  sx={{
                    background: "rgba(59, 130, 246, 0.1)",
                    backdropFilter: "blur(15px)",
                    border: "1px solid rgba(59, 130, 246, 0.3)",
                    color: "#1e293b",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    py: 2,
                    px: 3,
                    "& .MuiChip-icon": {
                      color: "#3b82f6",
                    },
                  }}
                />
              </Box>
            </Slide>
            {/* Main Heading */}{" "}
            <Slide direction="up" in={isVisible} timeout={800}>
              <Typography
                variant="h1"
                sx={{
                  mb: 3,
                  textAlign: "center",
                  fontWeight: 800,
                  fontSize: { xs: "3rem", md: "4.5rem" },
                  lineHeight: 1.1,
                  color: "#1e293b",
                }}
              >
                Modern{" "}
                <Typography
                  component="span"
                  sx={{
                    background:
                      "linear-gradient(45deg, #3b82f6 30%, #0ea5e9 90%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: 800,
                  }}
                  variant="inherit"
                >
                  Scheduling
                </Typography>{" "}
                Platform
              </Typography>
            </Slide>
            {/* Subtitle */}
            <Slide direction="up" in={isVisible} timeout={1000}>
              <Typography
                sx={{
                  fontSize: { xs: "1.2rem", md: "1.4rem" },
                  fontWeight: 400,
                  color: "#475569",
                  textAlign: "center",
                  mb: 4,
                  lineHeight: 1.6,
                  maxWidth: "800px",
                  mx: "auto",
                }}
              >
                A complete workforce management solution with real-time
                scheduling, advanced analytics, and intuitive dashboard. Built
                with modern technologies for optimal performance.
              </Typography>
            </Slide>
            {/* CTA Buttons */}
            <Zoom in={isVisible} timeout={1200}>
              <Stack
                alignItems="center"
                direction={{ xs: "column", sm: "row" }}
                spacing={3}
                sx={{ justifyContent: "center", mb: 6 }}
              >
                <Button
                  component={RouterLink}
                  href={paths.dashboard.index}
                  size="large"
                  startIcon={<RocketLaunchIcon />}
                  sx={{
                    py: 2,
                    px: 4,
                    backgroundColor: "#3b82f6",
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    textTransform: "none",
                    borderRadius: 3,
                    boxShadow: "0 12px 40px rgba(59, 130, 246, 0.3)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#2563eb",
                      transform: "translateY(-2px)",
                      boxShadow: "0 16px 50px rgba(59, 130, 246, 0.4)",
                    },
                  }}
                  variant="contained"
                >
                  Launch Demo Dashboard
                </Button>{" "}
                <Button
                  component={RouterLink}
                  href={paths.login}
                  size="large"
                  startIcon={<DashboardIcon />}
                  sx={{
                    py: 2,
                    px: 4,
                    color: "#475569",
                    borderColor: "#94a3b8",
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    textTransform: "none",
                    borderRadius: 3,
                    background: "rgba(255, 255, 255, 0.8)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#ffffff",
                      color: "#1e293b",
                      borderColor: "#64748b",
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                  variant="outlined"
                >
                  View Login
                </Button>
              </Stack>
            </Zoom>
            {/* Feature Highlights */}
            <Fade in={isVisible} timeout={1400}>
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={3}
                sx={{ justifyContent: "center", maxWidth: "900px", mx: "auto" }}
              >
                {[
                  {
                    icon: "🚀",
                    title: "Real-time Updates",
                    desc: "Live scheduling changes",
                  },
                  {
                    icon: "📊",
                    title: "Advanced Analytics",
                    desc: "Comprehensive reporting",
                  },
                  {
                    icon: "👥",
                    title: "Team Management",
                    desc: "Efficient workforce control",
                  },
                ].map((feature, index) => (
                  <Paper
                    key={index}
                    elevation={0}
                    sx={{
                      background: "rgba(255, 255, 255, 0.9)",
                      backdropFilter: "blur(15px)",
                      border: "1px solid rgba(59, 130, 246, 0.2)",
                      borderRadius: 3,
                      p: 3,
                      textAlign: "center",
                      color: "#475569",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        background: "#ffffff",
                        borderColor: "rgba(59, 130, 246, 0.4)",
                        boxShadow: "0 20px 40px rgba(59, 130, 246, 0.15)",
                      },
                    }}
                  >
                    <Typography sx={{ fontSize: "2rem", mb: 1 }}>
                      {feature.icon}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, mb: 1, color: "#1e293b" }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#64748b" }}>
                      {feature.desc}
                    </Typography>
                  </Paper>
                ))}
              </Stack>
            </Fade>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};
