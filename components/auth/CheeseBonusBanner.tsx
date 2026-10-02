import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { useThemeColors } from "@/constants/theme";

export default function CheeseBonusBanner() {
  const colors = useThemeColors();

  return (
    <View className="mb-3 flex-row items-center gap-2 rounded-[11px] bg-warning-soft px-2.5 py-2">
      <View className="h-7 w-7 items-center justify-center rounded-[8px] bg-surface">
        <Ionicons name="gift-outline" size={15} color={colors.warning} />
      </View>
      <View className="min-w-0 flex-1">
        <Text className="text-[8px] font-semibold leading-[12px] text-foreground" numberOfLines={1}>
          웰컴 치즈 스탬프 100개 지급
        </Text>
        <Text className="text-[7px] leading-[11px] text-muted" numberOfLines={1}>
          가입 즉시 구독 절약 분석 혜택을 받아보세요.
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={12} color={colors.warning} />
    </View>
  );
}
