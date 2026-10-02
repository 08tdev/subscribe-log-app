import { useState } from "react";
import { ScrollView, View } from "react-native";
import Header from "@/components/header/Header";
import SettingsContent from "@/components/settings/SettingsContent";
import { router } from "expo-router";
import ResponsiveContent from "@/components/layout/ResponsiveContent";

export default function SettingsScreen() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <View className="flex-1 bg-card">
      <Header
        title="설정"
        showBack={true}
        showHome={false}
        onBackPress={() => (router.canGoBack() ? router.back() : router.replace("/"))}
        rightIcon={searchOpen ? "close-outline" : "search-outline"}
        onRightIconPress={() => {
          setSearchOpen(current => !current);
          setSearchValue("");
        }}
      />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        className="flex-1 bg-background"
      >
        <ResponsiveContent maxWidth={900} className="items-center">
          <SettingsContent
            searchOpen={searchOpen}
            searchValue={searchValue}
            onSearchValueChange={setSearchValue}
          />
        </ResponsiveContent>
      </ScrollView>
    </View>
  );
}
