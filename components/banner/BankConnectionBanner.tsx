import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useThemeColors } from "@/constants/theme";

type BankConnectionBannerProps = {
  onConnectBank?: () => void;
};

export default function BankConnectionBanner({ onConnectBank }: BankConnectionBannerProps) {
  const themeColors = useThemeColors();

  return (
    <View className="w-full max-w-[480px] self-center px-3 py-2">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="계좌 연동하기"
        onPress={onConnectBank}
        className="min-h-11 w-full flex-row flex-wrap items-center gap-x-2 gap-y-1 rounded-[18px] bg-primary-soft px-3 py-2 active:opacity-80"
      >
        <Ionicons name="add-circle-outline" size={28} color={themeColors.primary} />
        <Text className="min-w-[120px] flex-1 text-[14px] font-medium text-foreground">
          놓친 구독이 있나요?
        </Text>
        <View className="shrink-0 flex-row items-center gap-1">
          <Text className="text-[12px] font-semibold text-primary">계좌 연동하기</Text>
          <Ionicons name="arrow-forward" size={16} color={themeColors.primary} />
        </View>
      </Pressable>
    </View>
  );
}
