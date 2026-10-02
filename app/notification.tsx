import Header from "@/components/header/Header";
import NotificationHistory from "@/components/notification/NotificationHistory";
import ResponsiveContent from "@/components/layout/ResponsiveContent";
import { useRouter } from "expo-router";
import { ScrollView, View } from "react-native";

export default function NotificationScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      <Header
        title="알림"
        showBack={true}
        showHome={false}
        onBackPress={() => (router.canGoBack() ? router.back() : router.replace("/"))}
        showSetting={true}
        onSettingIconPress={() => router.push("/settings")}
      />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        className="flex-1 bg-background"
      >
        <ResponsiveContent maxWidth={600}>
          <NotificationHistory />
        </ResponsiveContent>
      </ScrollView>
    </View>
  );
}
