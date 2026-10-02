import React from "react";
import { Pressable, Text, View } from "react-native";
import { useColorScheme } from "nativewind";

export default function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: isDark }}
      accessibilityLabel="다크 모드"
      onPress={toggleColorScheme}
      className="min-h-12 w-full flex-row items-center justify-between rounded-xl border border-border bg-surface px-4 py-3 active:opacity-80"
    >
      <Text className="text-sm font-medium text-foreground">다크 모드</Text>
      <View className={`rounded-full px-3 py-1 ${isDark ? "bg-primary" : "bg-surface-muted"}`}>
        <Text className={`text-xs font-semibold ${isDark ? "text-primary-foreground" : "text-muted"}`}>
          {isDark ? "켜짐" : "꺼짐"}
        </Text>
      </View>
    </Pressable>
  );
}
