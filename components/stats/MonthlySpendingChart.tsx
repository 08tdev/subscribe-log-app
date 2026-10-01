import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

const GRID_LEVELS = [
  { label: "80,000", top: 18 },
  { label: "40,000", top: 84 },
  { label: "0", top: 150 },
];

const MONTHS = ["11월", "12월", "1월", "2월", "3월", "4월\n(쥐)"];

function ChartLegend() {
  return (
    <View className="flex-row items-center gap-2.5">
      <View className="flex-row items-center gap-1">
        <View className="h-2 w-2 rounded-full bg-[#6553E8]" />
        <Text className="text-[9px] text-[#4C5269]">현재</Text>
      </View>
      <View className="flex-row items-center gap-1">
        <View className="h-2 w-2 rounded-full bg-[#C8D8FA]" />
        <Text className="text-[9px] text-[#4C5269]">이전</Text>
      </View>
    </View>
  );
}

function ChartHeader() {
  return (
    <View className="flex-row items-center justify-between gap-2">
      <View>
        <Text className="text-[13px] font-bold text-[#20243A]">월별 지출 추이</Text>
        <Text className="mt-0.5 text-[9px] text-[#67718A]">최근 6개월간 구독료 변화</Text>
      </View>
      <ChartLegend />
    </View>
  );
}

function ChartPlaceholder() {
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
            style={{ borderBottomWidth: 1, borderStyle: "dotted", borderColor: "#E5E8F2" }}
          />
          <Text className="ml-2 w-[34px] text-right text-[9px] text-[#C1B8D9]">
            {level.label}
          </Text>
        </View>
      ))}
      <View className="absolute right-[15%] top-[91px] rounded-full bg-[#5546D8] px-2 py-0.5">
        <Text className="text-[9px] font-semibold text-white">₩60,900</Text>
      </View>
      <View className="absolute bottom-0 left-0 right-[42px] flex-row justify-between">
        {MONTHS.map((month, index) => (
          <Text
            key={month}
            className={`text-center text-[9px] font-semibold ${index === MONTHS.length - 1 ? "text-[#5546D8]" : "text-[#30364B]"}`}
          >
            {month}
          </Text>
        ))}
      </View>
    </View>
  );
}

function LowestSpendingInsight() {
  return (
    <View className="mt-2 min-h-[44px] flex-row items-center gap-2 rounded-[12px] bg-[#F0F2FF] px-2.5 py-2">
      <Ionicons name="checkmark-circle-outline" size={15} color="#168C78" />
      <Text className="min-w-0 flex-1 text-[10px] font-medium leading-[14px] text-[#30364B]">
        최근 6개월 중 가장 적게 지출한 달이에요!
      </Text>
      <View className="shrink-0 items-end">
        <Text className="text-[9px] font-semibold text-[#168C78]">최저치 갱신</Text>
        <Text className="text-[10px]">🎉</Text>
      </View>
    </View>
  );
}

export default function MonthlySpendingChart() {
  return (
    <View className="w-[90%] max-w-[480px] self-center rounded-[16px] border border-[#EEF0F8] bg-white p-3">
      <ChartHeader />
      <ChartPlaceholder />
      <LowestSpendingInsight />
    </View>
  );
}