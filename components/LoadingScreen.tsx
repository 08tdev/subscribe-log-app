import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useThemeColors } from "@/constants/theme";

interface LoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({ message = "Loading..." }: LoadingScreenProps) {
  const themeColors = useThemeColors();

  return (
    <View className="flex-1 items-center justify-center bg-surface">
      <ActivityIndicator size="large" color={themeColors.primary} />
      <Text className="mt-4 text-muted">{message}</Text>
    </View>
  );
}
