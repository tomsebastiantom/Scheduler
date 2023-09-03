import type { FC } from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

interface Feature {
  id: string;
  title: string;
  description: string;
 
}

const features: Feature[] = [
  {
    id: "optimized",
    title: "Streamlined Scheduling",
    description:
      "Our Employee Scheduling Software is designed to optimize your workforce management. Developed by experts in human resource planning, it offers a secure and reliable solution for scheduling shifts, vacations, and off-hours.",
  },
  {
    id: "efficient",
    title: "Maximized Efficiency",
    description:
      "Experience a more efficient way to manage your workforce with our scheduling software. Effortlessly assign shifts, manage leaves, and track employee availability in real-time, enhancing the overall efficiency of your operations.",
  },
  {
    id: "integration",
    title: "Easy Integration",
    description:
      "Our scheduling software seamlessly integrates with your existing HR systems, saving you the headache of complicated setups. The software can be up and running quickly, helping you enhance your workforce management without disruption.",
  },
  {
    id: "customization",
    title: "Tailored to Your Needs",
    description:
      "Personalize our Employee Scheduling Software to match your specific operational requirements. With a wide range of customization options, the software can be adapted to align with your unique business goals and scheduling challenges.",
  },
  {
    id: "productivity",
    title: "Boost Productivity",
    description:
      "Leverage the full potential of our Employee Scheduling Software to improve productivity across your organization. From optimizing shift assignments to reducing conflicts and ensuring adequate staffing, our software brings a new level of efficiency to your workforce management.",
  }
];


export const HomeFeatures: FC = () => {
  const theme = useTheme();
  const [activeFeature, setActiveFeature] = useState<number>(0);
  const feature = features[activeFeature];
 

  return (
    <Box
      sx={{
        backgroundColor: "neutral.800",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top center",
        // backgroundImage: 'url("/assets/gradient-bg.svg")',
        color: "common.white",
        py: "120px",
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={2} sx={{ mb: 8 }}>
          <Typography align="center" color="inherit" variant="h3">
            Everything you need to schedule your staffs.
          </Typography>
          <Typography align="center" color="inherit" variant="subtitle2">
            Complete scheduling solution at your fingertips
          </Typography>
        </Stack>
        <Grid alignItems="center" container spacing={3}>
          {features.map((feature, index) => {
            const isActive = activeFeature === index;

            return (
              <Grid xs={12} md={6} key={feature.id}>
                <Box
                  onClick={() => setActiveFeature(index)}
                  sx={{
                    borderRadius: 2.5,
                    color: "neutral.400",
                    cursor: "pointer",
                    p: 3,
                    transition: (theme) =>
                      theme.transitions.create(
                        ["background-color, box-shadow", "color"],
                        {
                          easing: theme.transitions.easing.easeOut,
                          duration: theme.transitions.duration.enteringScreen,
                        }
                      ),
                    ...(isActive && {
                      backgroundColor: "primary.alpha12",
                      boxShadow: (theme) =>
                        `${theme.palette.primary.main} 0 0 0 1px`,
                      color: "common.white",
                    }),
                    "&:hover": {
                      ...(!isActive && {
                        backgroundColor: "primary.alpha4",
                        boxShadow: (theme) =>
                          `${theme.palette.primary.main} 0 0 0 1px`,
                        color: "common.white",
                      }),
                    },
                  }}
                >
                  <Typography color="inherit" sx={{ mb: 1 }} variant="h6">
                    {feature.title}
                  </Typography>
                  <Typography color="inherit" variant="body2">
                    {feature.description}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};
