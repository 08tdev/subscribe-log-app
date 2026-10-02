import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

type RegisterProgressHeaderProps = {
  step: 1 | 2 | 3;
  onBack: () => void;
};

export default function RegisterProgressHeader({ step, onBack }: RegisterProgressHeaderProps) {
  const progress: `${number}%` =
    step === 1 ? `${0}%` : `${Math.round(((step - 1) / 3) * 100)}%`;
  const stepTitle =
    step === 1
      ? "이메일 및 비밀번호 입력"
      : step === 2
        ? "비밀번호 확인 및 약관 동의"
        : "관심 구독 분야 설정";

  return (
    <View className="mb-3">
      <View className="mb-1.5 flex-row items-center justify-between">
        <View className="flex-row items-center gap-1.5">
          {step > 1 && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="이전 단계"
              hitSlop={8}
              onPress={onBack}
              className="mr-0.5"
            >
              <Ionicons name="chevron-back" size={13} color="#5546D8" />
            </Pressable>
          )}
          <Text className="text-[8px] font-bold text-primary">STEP {step}/3</Text>
          <View className="h-2.5 w-px bg-border" />
          <Text className="text-[8px] font-medium text-foreground">{stepTitle}</Text>
        </View>
        <Text className="text-[8px] font-semibold text-primary">{progress}</Text>
      </View>
      <View className="h-1 overflow-hidden rounded-full bg-border">
        <View className="h-full rounded-full bg-primary" style={{ width: progress }} />
      </View>
    </View>
  );
}
