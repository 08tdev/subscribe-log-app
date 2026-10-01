import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

function MonthArrowButton({ direction }: { direction: "previous" | "next" }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={direction === "previous" ? "이전 달" : "다음 달"}
      className="h-8 w-8 items-center justify-center rounded-full bg-[#EAF0FF]"
    >
      <Ionicons
        name={direction === "previous" ? "chevron-back" : "chevron-forward"}
        size={17}
        color="#344A78"
      />
    </Pressable>
  );
}

function MonthPicker() {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="2025년 4월 선택"
      className="h-8 flex-row items-center gap-1 rounded-full bg-white px-3"
    >
      <Text className="text-[14px] font-bold text-[#20243A]">2025년 4월</Text>
      <Ionicons name="chevron-down" size={14} color="#344A78" />
    </Pressable>
  );
}

function MonthlyCalculationButton() {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="월간 결산"
      className="h-7 flex-row items-center gap-1 rounded-full bg-[#EDE8FF] px-2.5"
    >
      <Ionicons name="calendar-outline" size={13} color="#6046DD" />
      <Text className="text-[11px] font-semibold text-[#6046DD]">월간 결산</Text>
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
