import * as Yup from "yup";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
import Slide from "@mui/material/Slide";
import Zoom from "@mui/material/Zoom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import DemoIcon from "@mui/icons-material/PlayArrow";

import { RouterLink } from "src/components/router-link";
import { Seo } from "src/components/seo";
import type { AuthContextType } from "src/contexts/auth/jwt";
import { useAuth } from "src/hooks/use-auth";
import { useMounted } from "src/hooks/use-mounted";

import { useRouter } from "src/hooks/use-router";
import { useSearchParams } from "src/hooks/use-search-params";
import { paths } from "src/paths";

interface Values {
  email: string;
  password: string;
  submit: null;
}

const initialValues: Values = {
  email: "",
  password: "",
  submit: null,
};

const validationSchema = Yup.object({
  email: Yup.string().max(255).required("Username is required"),
  password: Yup.string().max(255).required("Password is required"),
});

const Page = () => {
  const isMounted = useMounted();
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo");
  const { issuer, signIn } = useAuth<AuthContextType>();
  const [showPassword, setShowPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    formik.setValues({ email: "test", password: "test", submit: null });
    try {
      await signIn("test", "test");
      if (isMounted()) {
        router.push(returnTo || paths.dashboard.index);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers): Promise<void> => {
      setIsLoading(true);
      try {
        await signIn(values.email, values.password);
        if (isMounted()) {
          router.push(returnTo || paths.dashboard.index);
        }
      } catch (err) {
        console.error(err);

        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      } finally {
        setIsLoading(false);
      }
    },
  });
  return (
    <>
      <Seo title="Welcome to Scheduler Pro" />
      <Fade in={isVisible} timeout={800}>
        <div>
          <Box sx={{ mb: 4 }}>
            <Slide direction="down" in={isVisible} timeout={600}>
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{ mb: 3 }}
              >
                {" "}
                <WavingHandIcon sx={{ color: "#2970FF", fontSize: 32 }} />
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    background:
                      "linear-gradient(45deg, #2970FF 30%, #06AED4 90%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Welcome Back
                </Typography>
              </Stack>
            </Slide>
            <Slide direction="up" in={isVisible} timeout={800}>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  mb: 2,
                  fontSize: "1.1rem",
                  lineHeight: 1.6,
                }}
              >
                Sign in to access your professional scheduling dashboard
              </Typography>
            </Slide>
          </Box>

          <Zoom in={isVisible} timeout={1000}>
            <Card
              elevation={24}
              sx={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 4,
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                },
              }}
            >
              <CardHeader
                subheader={
                  <Typography color="text.secondary" variant="body2">
                    New to Scheduler Pro? &nbsp;{" "}
                    <Link
                      component={RouterLink}
                      href={paths.register}
                      underline="hover"
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        color: "primary.main",
                        "&:hover": {
                          color: "primary.dark",
                        },
                      }}
                    >
                      Create Account
                    </Link>
                  </Typography>
                }
                sx={{ pb: 2 }}
                title={
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 600, color: "text.primary" }}
                  >
                    Sign In
                  </Typography>
                }
              />
              <CardContent sx={{ pt: 0 }}>
                {/* Demo Login Section */}
                <Box sx={{ mb: 4 }}>
                  <Divider sx={{ mb: 3 }}>
                    <Chip
                      label="Portfolio Demo"
                      color="primary"
                      variant="outlined"
                      icon={<DemoIcon />}
                      sx={{
                        fontWeight: 600,
                        backgroundColor: "rgba(33, 150, 243, 0.1)",
                        borderColor: "primary.main",
                      }}
                    />
                  </Divider>
                  <Alert
                    severity="info"
                    sx={{
                      mb: 3,
                      backgroundColor: "rgba(33, 150, 243, 0.1)",
                      border: "1px solid rgba(33, 150, 243, 0.3)",
                      borderRadius: 2,
                      "& .MuiAlert-icon": {
                        color: "primary.main",
                      },
                    }}
                  >
                    <Stack spacing={1}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        🚀 Experience the Demo
                      </Typography>
                      <Typography variant="body2">
                        Click below to instantly access the full scheduling
                        platform with sample data
                      </Typography>
                    </Stack>
                  </Alert>{" "}
                  <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    onClick={handleDemoLogin}
                    disabled={isLoading}
                    startIcon={<DemoIcon />}
                    sx={{
                      mb: 3,
                      py: 2,
                      backgroundColor: "#2970FF",
                      color: "#FFFFFF",
                      fontWeight: 600,
                      fontSize: "1.1rem",
                      textTransform: "none",
                      borderRadius: 2,
                      boxShadow: "0 8px 32px rgba(41, 112, 255, 0.24)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#004EEB",
                        boxShadow: "0 12px 40px rgba(41, 112, 255, 0.32)",
                        transform: "translateY(-2px)",
                      },
                      "&:disabled": {
                        backgroundColor: "#9DA4AE",
                        color: "#FFFFFF",
                      },
                    }}
                  >
                    {isLoading
                      ? "Launching Demo..."
                      : "🚀 Enter Demo Dashboard"}
                  </Button>
                  {/* Demo Credentials Display */}
             
                </Box>{" "}
                {/* Alternative Manual Login */}
                <Box>
                  <Divider sx={{ my: 3 }}>
                    <Chip
                      label="Manual Login"
                      size="small"
                      sx={{
                        backgroundColor: "#F3F4F6",
                        color: "#6C737F",
                        border: "1px solid #E5E7EB",
                      }}
                    />
                  </Divider>

                  <form noValidate onSubmit={formik.handleSubmit}>
                    <Stack spacing={3}>
                      <TextField
                        autoFocus
                        error={!!(formik.touched.email && formik.errors.email)}
                        fullWidth
                        helperText={formik.touched.email && formik.errors.email}
                        label="Username"
                        name="email"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.email}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccountCircleIcon color="action" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            transition: "all 0.3s ease",
                            "&:hover": {
                              boxShadow: "0 4px 12px rgba(41, 112, 255, 0.08)",
                            },
                            "&.Mui-focused": {
                              boxShadow: "0 4px 20px rgba(41, 112, 255, 0.16)",
                            },
                          },
                        }}
                      />
                      <TextField
                        error={
                          !!(formik.touched.password && formik.errors.password)
                        }
                        fullWidth
                        helperText={
                          formik.touched.password && formik.errors.password
                        }
                        label="Password"
                        name="password"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type={showPassword ? "text" : "password"}
                        value={formik.values.password}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockIcon color="action" />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            transition: "all 0.3s ease",
                            "&:hover": {
                              boxShadow: "0 4px 12px rgba(41, 112, 255, 0.08)",
                            },
                            "&.Mui-focused": {
                              boxShadow: "0 4px 20px rgba(41, 112, 255, 0.16)",
                            },
                          },
                        }}
                      />
                    </Stack>
                    {formik.errors.submit && (
                      <FormHelperText error sx={{ mt: 3 }}>
                        {formik.errors.submit as string}
                      </FormHelperText>
                    )}
                    <Button
                      disabled={formik.isSubmitting || isLoading}
                      fullWidth
                      size="large"
                      sx={{
                        mt: 3,
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 600,
                        fontSize: "1.1rem",
                        textTransform: "none",
                        borderColor: "#2970FF",
                        color: "#2970FF",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: "#2970FF",
                          color: "#FFFFFF",
                          transform: "translateY(-1px)",
                          boxShadow: "0 8px 25px rgba(41, 112, 255, 0.24)",
                        },
                      }}
                      type="submit"
                      variant="outlined"
                    >
                      {formik.isSubmitting || isLoading
                        ? "Signing In..."
                        : "Sign In"}
                    </Button>
                  </form>
                </Box>
              </CardContent>
            </Card>
          </Zoom>

          <Fade in={isVisible} timeout={1200}>
            <Box sx={{ mt: 4 }}>
              <Alert
                severity="success"
                sx={{
                  backgroundColor: "rgba(76, 175, 80, 0.1)",
                  border: "1px solid rgba(76, 175, 80, 0.3)",
                  borderRadius: 2,
                }}
              >
                <Stack spacing={1}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    💡 Demo Credentials
                  </Typography>
                  <Typography variant="body2">
                    Username: <strong>test</strong> | Password:{" "}
                    <strong>test</strong>
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    This is a portfolio demonstration of a complete scheduling
                    management system
                  </Typography>
                </Stack>
              </Alert>{" "}
            </Box>
          </Fade>
        </div>
      </Fade>
    </>
  );
};

export default Page;
