import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { useThemeColors } from "@/constants/theme";

type RegisterActionsProps = {
  step: 1 | 2 | 3;
  isLoading: boolean;
  error: string | null;
  onNext: () => void;
  onSubmit: () => void;
  onLogin: () => void;
};

export default function RegisterActions({
  step,
  isLoading,
  error,
  onNext,
  onSubmit,
  onLogin,
}: RegisterActionsProps) {
  const colors = useThemeColors();
  const isFinalStep = step === 3;

  return (
    <View className="mt-3">
      {!!error && (
        <Text accessibilityRole="alert" className="mb-2 text-center text-[8px] text-danger">
          {error}
        </Text>
      )}
      <Pressable
        accessibilityRole="button"
        disabled={isFinalStep && isLoading}
        onPress={isFinalStep ? onSubmit : onNext}
        className="h-9 flex-row items-center justify-center gap-1.5 rounded-[8px] bg-primary active:opacity-80"
      >
        {isFinalStep && isLoading ? (
          <ActivityIndicator size="small" color={colors.primaryForeground} />
        ) : (
          <>
            {isFinalStep && (
              <Ionicons name="gift-outline" size={12} color={colors.primaryForeground} />
            )}
            <Text className="text-[9px] font-bold text-primary-foreground">
              {isFinalStep ? "관심사 저장하고 시작하기 (+100)" : "다음 단계로"}
            </Text>
            <Ionicons name="arrow-forward" size={13} color={colors.primaryForeground} />
          </>
        )}
      </Pressable>

      <View className="mt-2.5 flex-row items-center justify-center">
        <Text className="text-[8px] text-muted">이미 계정이 있으신가요? </Text>
        <Pressable accessibilityRole="button" onPress={onLogin}>
          <Text className="text-[8px] font-semibold text-primary">로그인하기</Text>
        </Pressable>
      </View>

      <View className="mt-3 flex-row items-start gap-1.5 rounded-[9px] bg-primary-soft px-2.5 py-2">
        <Ionicons name="shield-checkmark-outline" size={12} color={colors.primary} />
        <Text className="min-w-0 flex-1 text-[7px] leading-[11px] text-muted">
          구독쥐는 안전한 금융 정보와 개인정보 보호를 최우선으로 관리하고 있으며, 중요한 정보는
          암호화되어 안전하게 보호됩니다.
        </Text>
      </View>
    </View>
  );
}
