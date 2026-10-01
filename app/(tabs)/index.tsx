import { Alert, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import Header from "@/components/header/Header";
import BankConnectionBanner from "@/components/banner/BankConnectionBanner";
import OverviewCard from "@/components/card/OverviewCard";
import GreetingBanner from "@/components/banner/GreetingBanner";
import WeeklyPaymentCard from "@/components/card/WeeklyPaymentCard";
import UpcomingPaymentsSection from "@/components/card/UpcomingPaymentsSection";
import UnusedSubscriptionCard from "@/components/card/UnusedSubscriptionCard";

export default function IndexScreen() {
  return (
    <View className="w-full flex-1 bg-card">
      <Header
        title="구독했쥐"
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
          <View className="w-[90%] flex-column items-start">
            <Text className="text-xl sm font-bold text-gray-600 mr-2">
              {"반가워요 0xconsolas님!👋"}
            </Text>
          </View>
          <GreetingBanner />
          <BankConnectionBanner />
          <OverviewCard />
          <WeeklyPaymentCard />
          <UpcomingPaymentsSection onViewAll={() => router.push("/payment")} />
          <UnusedSubscriptionCard />
        </View>
      </ScrollView>
    </View>
  );
}
