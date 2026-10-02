import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useThemeColors } from "@/constants/theme";

type BankConnectionBannerProps = {
  onConnectBank?: () => void;
};

export default function BankConnectionBanner({ onConnectBank }: BankConnectionBannerProps) {
  const themeColors = useThemeColors();

  return (
    <View className="w-full bg-surface px-4 py-2">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="계좌 연동하기"
        onPress={onConnectBank}
        className="min-h-[36px] w-full flex-row items-center rounded-[18px] bg-primary-soft px-4 py-2 active:opacity-80"
      >
        <Ionicons name="add-circle-outline" size={32} color={themeColors.primary} />
        <Text className="ml-3 min-w-0 flex-1 text-[16px] font-medium text-foreground">
          놓친 구독이 있나요?
        </Text>
        <View className="ml-2 shrink-0 flex-row items-center gap-1">
          <Text className="text-[15px] font-semibold text-primary">계좌 연동하기</Text>
          <Ionicons name="arrow-forward" size={18} color={themeColors.primary} />
        </View>
      </Pressable>
    </View>
  );
}
