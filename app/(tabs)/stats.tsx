import { View, Text, ScrollView } from "react-native";
import Header from "@/components/header/Header";
import StatsMonthSelector from "@/components/stats/StatsMonthSelector";
import SavingsReportBanner from "@/components/stats/SavingsReportBanner";
import MonthlySpendingSummary from "@/components/stats/MonthlySpendingSummary";
import MonthlySpendingChart from "@/components/stats/MonthlySpendingChart";
import CategorySpendingCard from "@/components/stats/CategorySpendingCard";
import SmartReportSection from "@/components/stats/SmartReportSection";
import { router } from "expo-router";

export default function StatsScreen() {
  return (
    <View className="w-full flex-1 bg-card">
      <Header
        title="통계"
        showHome={true}
        onHomeIconPress={() => router.push("/")}
        rightIcon="notifications-outline"
        onRightIconPress={() => router.push("/notification")}
        showSetting={true}
        onSettingIconPress={() => router.push("/settings")}
      />
      <ScrollView
        contentContainerStyle={{ width: "100%", flexGrow: 1, paddingTop: 20, paddingBottom: 20 }}
        keyboardShouldPersistTaps="handled"
        className="w-full flex-1 items-center gap-y-2"
      >
        <View className="w-full flex-column items-center gap-2">
          <StatsMonthSelector />
          <SavingsReportBanner />
          <MonthlySpendingSummary />
          <MonthlySpendingChart />
          <CategorySpendingCard />
          <SmartReportSection />
        </View>
        <View className="flex-1" />
      </ScrollView>
    </View>
  );
}
