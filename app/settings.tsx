import { View, Text, ScrollView } from "react-native";
import Header from "@/components/header/Header";
import { router } from "expo-router";

export default function SettingsScreen() {
  return (
    <View className="flex-1 bg-card">
      <Header
        title=""
        showBack={true}
        showHome={false}
        onBackPress={() => (router.canGoBack() ? router.back() : router.replace("/"))}
        rightIcon="notifications-outline"
        onRightIconPress={() => router.push("/notification")}
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
