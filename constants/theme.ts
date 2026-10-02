import { useColorScheme } from "nativewind";

const lightTheme = {
  background: "#F7F8FC",
  surface: "#FFFFFF",
  surfaceMuted: "#F0F2F8",
  foreground: "#20243A",
  muted: "#65708A",
  subtle: "#8991A3",
  border: "#E8EAF3",
  primary: "#5546D8",
  primaryForeground: "#FFFFFF",
  primarySoft: "#F0F2FF",
  switchThumb: "#FFFFFF",
  success: "#078E7A",
  successSoft: "#DDF9F1",
  danger: "#D84D59",
  dangerForeground: "#FFFFFF",
  dangerSoft: "#FFE5E7",
  warning: "#B77819",
  warningSoft: "#FFF0D8",
} as const;

const darkTheme = {
  background: "#14151F",
  surface: "#1D1F2C",
  surfaceMuted: "#272A3A",
  foreground: "#F3F4FA",
  muted: "#AEB4C7",
  subtle: "#8C93AA",
  border: "#393C4D",
  primary: "#AB9CFF",
  primaryForeground: "#1D183A",
  primarySoft: "#393154",
  switchThumb: "#FFFFFF",
  success: "#5CD5B3",
  successSoft: "#20423D",
  danger: "#FF8F96",
  dangerForeground: "#492B34",
  dangerSoft: "#492B34",
  warning: "#F4C269",
  warningSoft: "#493B25",
} as const;

export function useThemeColors() {
  const { colorScheme } = useColorScheme();
  return colorScheme === "dark" ? darkTheme : lightTheme;
}
