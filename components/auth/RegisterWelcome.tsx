import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { useThemeColors } from "@/constants/theme";

export default function RegisterWelcome({ step }: { step: 1 | 2 | 3 }) {
  const colors = useThemeColors();

  return (
    <View className="mb-3">
      <View className="mb-1.5 flex-row items-center gap-1.5">
        <Text className="text-[18px] font-bold leading-6 text-foreground">
          {step === 1
            ? "환영해요!"
            : step === 2
              ? "거의 다 왔어요!"
              : "관심 구독 분야를 모두 알려주세요!"}
        </Text>
        <Ionicons name="sparkles" size={16} color={colors.warning} />
      </View>
      <Text className="text-[10px] font-semibold leading-[15px] text-foreground">
        {step === 1
          ? "구독 관리 스마트 라이프를 시작해볼까요?"
          : step === 2
            ? "비밀번호를 확인하고 약관에 동의해 주세요."
            : "관심 분야에 맞춰 혜택과 절약 정보를 추천해 드릴게요."}
      </Text>
      <Text className="mt-0.5 text-[8px] leading-[12px] text-muted">
        {step === 1
          ? "이메일과 안전한 비밀번호를 입력해 주세요."
          : step === 2
            ? "닉네임을 정하고 필수 약관에 동의해 주세요."
            : "이용 중인 구독과 월간 지출 규모를 선택해 주세요."}
      </Text>
    </View>
  );
}
