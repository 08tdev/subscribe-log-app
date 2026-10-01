import React from "react";
import { Pressable, Text } from "react-native";
import { useColorScheme } from "nativewind";

export default function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Pressable
      onPress={toggleColorScheme}
      className="absolute bottom-6 right-6 z-50 p-3 bg-card border border-border rounded-lg items-center"
    >
      <Text className="text-foreground font-semibold">
        {colorScheme === "dark" ? "🌙 Dark" : "☀️ Light"} (터치하여 변경)
      </Text>
    </Pressable>
  );
}
