import { Stack, useSegments, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useCallback } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { useColorScheme } from "nativewind";
import { useThemeColors } from "@/constants/theme";
import { AuthProvider, useAuth } from "../context/AuthContext";
import "../global.css";

function AuthRoot() {
  const { isAuthenticated, isLoading } = useAuth();
  const { colorScheme } = useColorScheme();
  const themeColors = useThemeColors();
  const segments = useSegments();
  const router = useRouter();

  const handleNavigation = useCallback(() => {
    const inAuthGroup = segments[0] === "auth";

    if (isLoading) {
      return;
    }

    // if (!isAuthenticated && !inAuthGroup) {
    //   router.replace("/auth/login");
    // } else if (isAuthenticated && inAuthGroup) {
    //   router.replace("/");
    // }
  }, [isAuthenticated, segments, isLoading]);

  useEffect(() => {
    handleNavigation();
  }, [handleNavigation]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color={themeColors.primary} />
        <Text className="mt-4 text-muted">Loading...</Text>
      </View>
    );
  }
  return (
    <>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(app)" options={{}} />
        <Stack.Screen name="(tabs)" options={{}} />
        <Stack.Screen
          name="auth/login"
          options={{
            title: "Login",
          }}
        />
        <Stack.Screen
          name="auth/register"
          options={{
            title: "Create Account",
          }}
        />
        <Stack.Screen
          name="notification"
          options={{
            title: "Notification",
          }}
        />
        <Stack.Screen
          name="payment"
          options={{
            title: "Payment",
          }}
        />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthRoot />
    </AuthProvider>
  );
}
