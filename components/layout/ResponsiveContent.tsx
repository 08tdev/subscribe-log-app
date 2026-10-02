import { ReactNode } from "react";
import { View } from "react-native";
import useResponsiveLayout from "@/components/layout/useResponsiveLayout";

type ResponsiveContentProps = {
  children: ReactNode;
  className?: string;
  maxWidth?: number;
};

export default function ResponsiveContent({
  children,
  className = "",
  maxWidth = 1120,
}: ResponsiveContentProps) {
  const { horizontalInset, contentMaxWidth } = useResponsiveLayout();

  return (
    <View
      className={`w-full self-center ${className}`}
      style={{
        maxWidth: contentMaxWidth ? Math.min(maxWidth, contentMaxWidth) : undefined,
        paddingHorizontal: horizontalInset,
      }}
    >
      {children}
    </View>
  );
}
