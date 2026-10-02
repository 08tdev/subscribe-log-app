import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { useThemeColors } from "@/constants/theme";

const GRID_LEVELS = [
  { label: "80,000", top: 18 },
  { label: "40,000", top: 84 },
  { label: "0", top: 150 },
];

const MONTHS = ["11월", "12월", "1월", "2월", "3월", "4월\n(쥐)"];

function ChartLegend() {
  const themeColors = useThemeColors();

  return (
    <View className="flex-row items-center gap-2.5">
      <View className="flex-row items-center gap-1">
        <View className="h-2 w-2 rounded-full bg-primary" />
        <Text className="text-[9px] text-muted">현재</Text>
      </View>
      <View className="flex-row items-center gap-1">
        <View className="h-2 w-2 rounded-full bg-primary-soft" />
        <Text className="text-[9px] text-muted">이전</Text>
      </View>
    </View>
  );
}

function ChartHeader() {
  return (
    <View className="flex-row items-center justify-between gap-2">
      <View>
        <Text className="text-[13px] font-bold text-foreground">월별 지출 추이</Text>
        <Text className="mt-0.5 text-[9px] text-muted">최근 6개월간 구독료 변화</Text>
      </View>
      <ChartLegend />
    </View>
  );
}

function ChartPlaceholder() {
  const themeColors = useThemeColors();

  return (
    <View className="relative mt-2 h-[184px] w-full">
      {GRID_LEVELS.map(level => (
        <View
          key={level.label}
          className="absolute left-0 right-0 flex-row items-center"
          style={{ top: level.top }}
        >
          <View
            className="flex-1"
            style={{ borderBottomWidth: 1, borderStyle: "dotted", borderColor: themeColors.border }}
          />
          <Text className="ml-2 w-[34px] text-right text-[9px] text-subtle">
            {level.label}
          </Text>
        </View>
      ))}
      <View className="absolute right-[15%] top-[91px] rounded-full bg-primary px-2 py-0.5">
        <Text className="text-[9px] font-semibold text-white">₩60,900</Text>
      </View>
      <View className="absolute bottom-0 left-0 right-[42px] flex-row justify-between">
        {MONTHS.map((month, index) => (
          <Text
            key={month}
            className={`text-center text-[9px] font-semibold ${index === MONTHS.length - 1 ? "text-primary" : "text-foreground"}`}
          >
            {month}
          </Text>
        ))}
      </View>
    </View>
  );
}

function LowestSpendingInsight() {
  const themeColors = useThemeColors();

  return (
    <View className="mt-2 min-h-[44px] flex-row items-center gap-2 rounded-[12px] bg-primary-soft px-2.5 py-2">
      <Ionicons name="checkmark-circle-outline" size={15} color={themeColors.success} />
      <Text className="min-w-0 flex-1 text-[10px] font-medium leading-[14px] text-foreground">
        최근 6개월 중 가장 적게 지출한 달이에요!
      </Text>
      <View className="shrink-0 items-end">
        <Text className="text-[9px] font-semibold text-success">최저치 갱신</Text>
        <Text className="text-[10px]">🎉</Text>
      </View>
    </View>
  );
}

export default function MonthlySpendingChart() {
  return (
    <View className="w-[90%] max-w-[480px] self-center rounded-[16px] border border-border bg-surface p-3">
      <ChartHeader />
      <ChartPlaceholder />
      <LowestSpendingInsight />
    </View>
  );
}