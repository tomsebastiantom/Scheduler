import "simplebar-react/dist/simplebar.min.css";

import type { FC } from "react";
import { useRoutes } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Provider as ReduxProvider } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { RTL } from "src/components/rtl";
import { SplashScreen } from "src/components/splash-screen";

import { Toaster } from "src/components/toaster";
import { AuthConsumer, AuthProvider } from "src/contexts/auth/jwt";
import { SettingsConsumer, SettingsProvider } from "src/contexts/settings";
import { useNprogress } from "src/hooks/use-nprogress";

import { routes } from "src/routes";
import { store } from "src/store";
import { createTheme } from "src/theme";

import "src/locales/i18n";

export const App: FC = () => {
  useNprogress();

  const element = useRoutes(routes);

  return (
    <ReduxProvider store={store}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AuthProvider>
          <AuthConsumer>
            {(auth) => (
              <SettingsProvider>
                <SettingsConsumer>
                  {(settings) => {
                    // Prevent theme flicker when restoring custom settings from browser storage
                    if (!settings.isInitialized) {
                      // return null;
                    }

                    const theme = createTheme({
                      colorPreset: settings.colorPreset,
                      contrast: settings.contrast,
                      direction: settings.direction,
                      paletteMode: settings.paletteMode,
                      responsiveFontSizes: settings.responsiveFontSizes,
                    });

                    // Prevent guards from redirecting
                    const showSlashScreen = !auth.isInitialized;

                    return (
                      <ThemeProvider theme={theme}>
                        <Helmet>
                          <meta
                            name="color-scheme"
                            content={settings.paletteMode}
                          />
                          <meta
                            name="theme-color"
                            content={theme.palette.neutral[900]}
                          />
                        </Helmet>
                        <RTL direction={settings.direction}>
                          <CssBaseline />
                          {showSlashScreen ? <SplashScreen /> : <>{element}</>}
                          <Toaster />
                        </RTL>
                      </ThemeProvider>
                    );
                  }}
                </SettingsConsumer>
              </SettingsProvider>
            )}
          </AuthConsumer>
        </AuthProvider>
      </LocalizationProvider>
    </ReduxProvider>
  );
};
