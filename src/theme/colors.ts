import { alpha } from "@mui/system/colorManipulator";
import type {
  ColorRange,
  PaletteColor,
} from "@mui/material/styles/createPalette";

const withAlphas = (color: PaletteColor): PaletteColor => {
  return {
    ...color,
    alpha4: alpha(color.main, 0.04),
    alpha8: alpha(color.main, 0.08),
    alpha12: alpha(color.main, 0.12),
    alpha30: alpha(color.main, 0.3),
    alpha50: alpha(color.main, 0.5),
  };
};

export const neutral: ColorRange = {
  50: "#F8FAFC",
  100: "#F1F5F9",
  200: "#E2E8F0",
  300: "#CBD5E1",
  400: "#94A3B8",
  500: "#64748B",
  600: "#475569",
  700: "#334155",
  800: "#1E293B",
  900: "#0F172A",
};

export const blue = withAlphas({
  lightest: "#F0F9FF",
  light: "#E0F2FE",
  main: "#3B82F6",
  dark: "#1D4ED8",
  darkest: "#1E3A8A",
  contrastText: "#FFFFFF",
});

export const green = withAlphas({
  lightest: "#F0FDF4",
  light: "#DCFCE7",
  main: "#22C55E",
  dark: "#16A34A",
  darkest: "#15803D",
  contrastText: "#FFFFFF",
});

export const indigo = withAlphas({
  lightest: "#EEF2FF",
  light: "#E0E7FF",
  main: "#6366F1",
  dark: "#4F46E5",
  darkest: "#3730A3",
  contrastText: "#FFFFFF",
});

export const purple = withAlphas({
  lightest: "#FAF5FF",
  light: "#F3E8FF",
  main: "#A855F7",
  dark: "#9333EA",
  darkest: "#7C3AED",
  contrastText: "#FFFFFF",
});

export const success = withAlphas({
  lightest: "#F0FDF9",
  light: "#3FC79A",
  main: "#10B981",
  dark: "#0B815A",
  darkest: "#134E48",
  contrastText: "#FFFFFF",
});

export const info = withAlphas({
  lightest: "#ECFDFF",
  light: "#CFF9FE",
  main: "#06AED4",
  dark: "#0E7090",
  darkest: "#164C63",
  contrastText: "#FFFFFF",
});

export const warning = withAlphas({
  lightest: "#FFFAEB",
  light: "#FEF0C7",
  main: "#F79009",
  dark: "#B54708",
  darkest: "#7A2E0E",
  contrastText: "#FFFFFF",
});

export const error = withAlphas({
  lightest: "#FEF3F2",
  light: "#FEE4E2",
  main: "#F04438",
  dark: "#B42318",
  darkest: "#7A271A",
  contrastText: "#FFFFFF",
});
