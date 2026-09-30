import { Alert, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import Header from "@/components/header/Header";

export default function IndexScreen() {
  return (
    <View className="flex-1 bg-slate-50">
      <Header
        title="구독했쥐"
        showHome={true}
        onHomeIconPress={() => router.push("/")}
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
