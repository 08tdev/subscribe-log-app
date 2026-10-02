import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { useThemeColors } from "@/constants/theme";

export default function AddWelcomeSection() {
  const colors = useThemeColors();

  return (
    <View className="mb-4">
      <View className="mb-2 flex-row items-center justify-between gap-2">
        <View className="flex-row flex-wrap items-center gap-1.5">
          <Text className="rounded-full bg-primary-soft px-2 py-1 text-[8px] font-semibold text-primary">
            신규 등록
          </Text>
          <View className="flex-row items-center gap-1 rounded-full bg-success-soft px-2 py-1">
            <View className="h-1.5 w-1.5 rounded-full bg-success" />
            <Text className="text-[8px] font-semibold text-success">스마트 자동 감지 중</Text>
          </View>
        </View>
        <View className="h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-soft">
          <Ionicons name="happy-outline" size={19} color={colors.primary} />
        </View>
      </View>

      <Text className="text-[20px] font-bold leading-[26px] text-foreground">
        어떤 구독을 등록할까요?
      </Text>
      <Text className="mt-1 text-[10px] leading-[15px] text-muted">
        결제일 전 똑똑한 알림과 지출 분석으로 도와드릴게요.
      </Text>
    </View>
  );
}
