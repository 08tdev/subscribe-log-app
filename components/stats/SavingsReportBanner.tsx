import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { useThemeColors } from "@/constants/theme";

function ReportIcon() {
  const themeColors = useThemeColors();

  return (
    <View className="relative h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-surface">
      <Ionicons name="stats-chart" size={20} color={themeColors.primary} />
      <View className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border border-border bg-danger" />
    </View>
  );
}

function ReportHeading() {
  return (
    <View className="flex-row flex-wrap items-center gap-x-1.5 gap-y-1">
      <Text className="text-[10px] font-semibold text-primary">구독했쥐 리포트</Text>
      <View className="rounded-full bg-success-soft px-1.5 py-0.5">
        <Text className="text-[9px] font-semibold text-success">절약 성공!</Text>
      </View>
    </View>
  );
}

function SavingsMessage() {
  return (
    <Text className="mt-0.5 text-[12px] font-semibold leading-[17px] text-foreground">
      이번 달은 지난달보다 <Text className="text-primary">12,000원</Text> 덜 썼쥐! 🏠
    </Text>
  );
}

export default function SavingsReportBanner() {
  return (
    <View className="w-[90%] max-w-[480px] self-center flex-row items-center gap-2.5 rounded-[16px] bg-primary-soft p-2.5">
      <ReportIcon />
      <View className="min-w-0 flex-1">
        <ReportHeading />
        <SavingsMessage />
      </View>
    </View>
  );
}
