import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useThemeColors } from "@/constants/theme";

function MonthArrowButton({ direction }: { direction: "previous" | "next" }) {
  const themeColors = useThemeColors();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={direction === "previous" ? "이전 달" : "다음 달"}
      className="h-8 w-8 items-center justify-center rounded-full bg-primary-soft"
    >
      <Ionicons
        name={direction === "previous" ? "chevron-back" : "chevron-forward"}
        size={17}
        color={themeColors.foreground}
      />
    </Pressable>
  );
}

function MonthPicker() {
  const themeColors = useThemeColors();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="2025년 4월 선택"
      className="h-8 flex-row items-center gap-1 rounded-full bg-surface px-3"
    >
      <Text className="text-[14px] font-bold text-foreground">2025년 4월</Text>
      <Ionicons name="chevron-down" size={14} color={themeColors.foreground} />
    </Pressable>
  );
}

function MonthlyCalculationButton() {
  const themeColors = useThemeColors();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="월간 결산"
      className="h-7 flex-row items-center gap-1 rounded-full bg-primary-soft px-2.5"
    >
      <Ionicons name="calendar-outline" size={13} color={themeColors.primary} />
      <Text className="text-[11px] font-semibold text-primary">월간 결산</Text>
    </Pressable>
  );
}

export default function StatsMonthSelector() {
  return (
    <View className="w-[90%] max-w-[480px] self-center flex-row items-center justify-between gap-2 py-1">
      <View className="flex-row items-center gap-1">
        <MonthArrowButton direction="previous" />
        <MonthPicker />
        <MonthArrowButton direction="next" />
      </View>
      <MonthlyCalculationButton />
    </View>
  );
}
