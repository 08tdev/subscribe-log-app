import { Pressable, Text, View } from "react-native";

type AuthSignupPromptProps = {
  onSignUp: () => void;
};

export default function AuthSignupPrompt({ onSignUp }: AuthSignupPromptProps) {
  return (
    <View className="mt-5 flex-row items-center justify-center">
      <Text className="text-[9px] text-muted">아직 구독쥐 회원이 아니신가요? </Text>
      <Pressable accessibilityRole="button" onPress={onSignUp}>
        <Text className="text-[9px] font-semibold text-primary">회원가입하기</Text>
      </Pressable>
    </View>
  );
}