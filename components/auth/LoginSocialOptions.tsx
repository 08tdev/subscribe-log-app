import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

export type SocialProvider = "카카오" | "Apple" | "Google";

type LoginSocialOptionsProps = {
  onSelectProvider: (provider: SocialProvider) => void;
};

export default function LoginSocialOptions({ onSelectProvider }: LoginSocialOptionsProps) {
  return (
    <View className="mt-3 w-full">
      <View className="mb-2.5 flex-row items-center gap-2">
        <View className="h-px flex-1 bg-border" />
        <Text className="text-[8px] text-muted">간편 소셜 로그인</Text>
        <View className="h-px flex-1 bg-border" />
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={() => onSelectProvider("카카오")}
        className="mb-1.5 h-[34px] flex-row items-center justify-center gap-2 rounded-[9px] bg-[#FEE500] active:opacity-80"
      >
        <Ionicons name="chatbubble" size={13} color="#191919" />
        <Text className="text-[9px] font-bold text-[#191919]">카카오로 3초 만에 시작하기</Text>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        onPress={() => onSelectProvider("Apple")}
        className="mb-1.5 h-[34px] flex-row items-center justify-center gap-2 rounded-[9px] bg-black active:opacity-80"
      >
        <Ionicons name="logo-apple" size={14} color="#FFFFFF" />
        <Text className="text-[9px] font-semibold text-white">Apple로 계속하기</Text>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        onPress={() => onSelectProvider("Google")}
        className="h-[34px] flex-row items-center justify-center gap-2 rounded-[9px] border border-border bg-surface active:opacity-80"
      >
        <Ionicons name="logo-google" size={13} color="#4285F4" />
        <Text className="text-[9px] font-medium text-foreground">Google 계정으로 계속하기</Text>
      </Pressable>
    </View>
  );
}