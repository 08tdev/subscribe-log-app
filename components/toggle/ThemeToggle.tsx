import React from "react";
import { Pressable, Text } from "react-native";
import { useColorScheme } from "nativewind";

export function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Pressable 
      onPress={toggleColorScheme}
      className="p-3 bg-card border border-border rounded-lg items-center"
    >
      <Text className="text-foreground font-semibold">
        현재 테마: {colorScheme === "dark" ? "🌙 Dark" : "☀️ Light"} (터치하여 변경)
      </Text>
    </Pressable>
  );
}