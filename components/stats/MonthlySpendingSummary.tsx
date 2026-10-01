import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

function SpendingHeader() {
  return (
    <View className="flex-row items-center justify-between gap-2">
      <View className="min-w-0 flex-row items-center gap-1">
        <Text className="text-[10px] font-medium text-[#454A61]">4월 총 구독 지출</Text>
        <Ionicons name="help-circle-outline" size={12} color="#76809C" />
      </View>
      <View className="shrink-0 flex-row items-center gap-1 rounded-full bg-[#DDF9F1] px-2 py-1">
        <Ionicons name="trending-down" size={11} color="#0B8C70" />
        <Text className="text-[9px] font-semibold text-[#0B8C70]">16.4% 절약</Text>
      </View>
    </View>
  );
}

function SpendingAmount() {
  return (
    <View className="mt-1.5 flex-row items-center justify-between gap-2">
      <View className="flex-row items-baseline">
        <Text className="mr-0.5 text-[14px] font-bold text-[#5546D8]">₩</Text>
        <Text className="text-[26px] font-bold leading-8 text-[#20243A]">60,900</Text>
      </View>
      <View className="shrink-0 items-end">
        <Text className="text-[9px] text-[#65718B]">전월 대비</Text>
        <View className="flex-row items-center gap-0.5">
          <Ionicons name="caret-down" size={9} color="#0B8C70" />
          <Text className="text-[10px] font-semibold text-[#0B8C70]">12,000원</Text>
        </View>
      </View>
    </View>
  );
}

function ActiveSubscriptionsTile() {
  return (
    <View className="min-w-0 flex-1 rounded-[12px] bg-[#F0F2FF] p-2.5">
      <Text className="text-[9px] font-medium text-[#59627B]">활성 구독 항목</Text>
      <View className="mt-1 flex-row flex-wrap items-center gap-1">
        <Text className="text-[16px] font-bold text-[#20243A]">3건</Text>
        <View className="rounded-full bg-[#FFE5E7] px-1.5 py-0.5">
          <Text className="text-[8px] font-semibold text-[#D84D59]">-1건 해지</Text>
        </View>
      </View>
    </View>
  );
}

function AnnualEstimateTile() {
  return (
    <View className="min-w-0 flex-1 rounded-[12px] bg-[#F0F2FF] p-2.5">
      <Text className="text-[9px] font-medium text-[#59627B]">연간 환산 예상액</Text>
      <View className="mt-1 flex-row items-center justify-between gap-1">
        <Text className="shrink text-[15px] font-bold text-[#20243A]" numberOfLines={1}>
          ₩730,800
        </Text>
        <Ionicons name="sync-outline" size={14} color="#6553E8" />
      </View>
    </View>
  );
}

export default function MonthlySpendingSummary() {
  return (
    <View className="w-[90%] max-w-[480px] self-center rounded-[16px] border border-[#EEF0F8] bg-white p-3">
      <SpendingHeader />
      <SpendingAmount />
      <View className="my-2.5 h-px bg-[#ECEFF7]" />
      <View className="flex-row gap-2">
        <ActiveSubscriptionsTile />
        <AnnualEstimateTile />
      </View>
    </View>
  );
}