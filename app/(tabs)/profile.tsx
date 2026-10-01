import { View, ScrollView } from "react-native";
import Header from "@/components/header/Header";
import ProfileRewardsCard from "@/components/profile/ProfileRewardsCard";
import MonthlyBudgetLimitCard from "@/components/profile/MonthlyBudgetLimitCard";
import PaymentConnectionsCard from "@/components/profile/PaymentConnectionsCard";
import SmartAlertSettingsCard from "@/components/profile/SmartAlertSettingsCard";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";

export default function ProfileScreen() {
  const { user } = useAuth();

  return (
    <View className="flex-1 bg-card">
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
        contentContainerStyle={{ flexGrow: 1, paddingTop: 16, paddingBottom: 20 }}
        keyboardShouldPersistTaps="handled"
        className="flex-1"
      >
        <View className="w-full items-center gap-3">
          <ProfileRewardsCard name={user?.name} email={user?.email} avatar={user?.avatar} />
          <MonthlyBudgetLimitCard />
          <PaymentConnectionsCard />
          <SmartAlertSettingsCard />
        </View>
      </ScrollView>
    </View>
  );
}
