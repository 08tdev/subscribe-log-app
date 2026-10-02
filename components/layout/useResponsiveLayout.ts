import { useWindowDimensions } from "react-native";

export const RESPONSIVE_BREAKPOINTS = {
  compact: 360,
  tablet: 768,
  desktop: 1024,
} as const;

export default function useResponsiveLayout() {
  const { width, height, fontScale } = useWindowDimensions();

  return {
    width,
    height,
    fontScale,
    isCompact: width < RESPONSIVE_BREAKPOINTS.compact,
    isTablet: width >= RESPONSIVE_BREAKPOINTS.tablet,
    isDesktop: width >= RESPONSIVE_BREAKPOINTS.desktop,
    isLandscape: width > height,
    horizontalInset: width < RESPONSIVE_BREAKPOINTS.compact ? 12 : width >= 768 ? 24 : 16,
    contentMaxWidth: width >= 1024 ? 1120 : width >= 768 ? 880 : undefined,
    gridColumns: width >= 1024 ? 3 : width >= 600 ? 2 : 1,
  };
}
