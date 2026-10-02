import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import AuthSignupPrompt from "@/components/auth/AuthSignupPrompt";
import LoginBrand from "@/components/auth/LoginBrand";
import LoginCredentialsForm from "@/components/auth/LoginCredentialsForm";
import LoginSocialOptions, { SocialProvider } from "@/components/auth/LoginSocialOptions";
import { useAuth } from "@/context/AuthContext";
import { LoginCredentials } from "@/types/user";

export default function LoginScreen() {
  const [error, setError] = useState<string | null>(null);
  const { login, isLoading } = useAuth();

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      setError(null);
      await login(credentials);
    } catch (err) {
      const message = err instanceof Error ? err.message : "로그인 중 문제가 발생했습니다.";
      setError(message);
      Alert.alert("로그인 실패", message);
    }
  };

  const handleSocialLogin = (provider: SocialProvider) => {
    Alert.alert(`${provider} 로그인`, "해당 로그인 방식은 준비 중입니다.");
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        className="flex-1 bg-background"
      >
        <View className="flex-1 items-center justify-center px-4 py-4">
          <View className="w-full max-w-[420px]">
            <LoginBrand />
            <LoginCredentialsForm onSubmit={handleLogin} isLoading={isLoading} error={error} />
            <LoginSocialOptions onSelectProvider={handleSocialLogin} />
            <AuthSignupPrompt onSignUp={() => router.push("/auth/register")} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
