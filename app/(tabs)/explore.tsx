import { View, ScrollView } from "react-native";
import Header from "@/components/header/Header";
import SubscriptionSearchBar from "@/components/explore/SubscriptionSearchBar";
import ExploreCategoryChips from "@/components/explore/ExploreCategoryChips";
import FeaturedOffersSection from "@/components/explore/FeaturedOffersSection";
import TrendingSubscriptions from "@/components/explore/TrendingSubscriptions";
import SubscriptionBundleRecommendations from "@/components/explore/SubscriptionBundleRecommendations";
import { router } from "expo-router";
import ResponsiveContent from "@/components/layout/ResponsiveContent";

export default function ExploreScreen() {
  return (
    <View className="flex-1 bg-card">
      <Header
        title="발견"
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
        <ResponsiveContent maxWidth={1040} className="items-start gap-y-3">
          <SubscriptionSearchBar />
          <ExploreCategoryChips />
          <FeaturedOffersSection />
          <TrendingSubscriptions />
          <SubscriptionBundleRecommendations />
        </ResponsiveContent>
      </ScrollView>
    </View>
  );
}
