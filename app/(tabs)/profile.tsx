import { View, Text, ScrollView } from "react-native";
import Header from "@/components/header/Header";
import { router } from "expo-router";

export default function ProfileScreen() {
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
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        className="flex-1 items-center justify-center gap-y-2"
      >
        <View className="flex-1"></View>
      </ScrollView>
    </View>
  );
}
