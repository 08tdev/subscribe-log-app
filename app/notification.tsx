import Header from "@/components/header/Header";
import { useRouter } from "expo-router";
import { ScrollView, View } from "react-native";

export default function NotificationScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-slate-50">
      <Header
        title="구독했쥐"
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
