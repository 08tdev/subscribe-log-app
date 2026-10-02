import { Alert, ScrollView, View } from "react-native";
import Header from "@/components/header/Header";
import ProfileRewardsCard from "@/components/profile/ProfileRewardsCard";
import MonthlyBudgetLimitCard from "@/components/profile/MonthlyBudgetLimitCard";
import PaymentConnectionsCard from "@/components/profile/PaymentConnectionsCard";
import SmartAlertSettingsCard from "@/components/profile/SmartAlertSettingsCard";
import ProfileFooter from "@/components/profile/ProfileFooter";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import ResponsiveContent from "@/components/layout/ResponsiveContent";

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert("로그아웃", "로그아웃 하시겠어요?", [
      { text: "취소", style: "cancel" },
      { text: "로그아웃", onPress: logout, style: "destructive" },
    ]);
  };

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
        <ResponsiveContent
          maxWidth={920}
          className="flex-row flex-wrap items-center justify-between gap-y-3"
        >
          <View className="w-full md:w-[49%]">
            <ProfileRewardsCard name={user?.name} email={user?.email} avatar={user?.avatar} />
          </View>
          <View className="w-full md:w-[49%]">
            <MonthlyBudgetLimitCard />
          </View>
          <View className="w-full md:w-[49%]">
            <PaymentConnectionsCard />
          </View>
          <View className="w-full md:w-[49%]">
            <SmartAlertSettingsCard />
          </View>
        </ResponsiveContent>
        <ResponsiveContent maxWidth={920}>
          <ProfileFooter onLogout={handleLogout} />
        </ResponsiveContent>
      </ScrollView>
    </View>
  );
}
