import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, View } from "react-native";
import Header from "@/components/header/Header";
import SettingsContent from "@/components/settings/SettingsContent";
import SmartAlertSettings from "@/components/settings/SmartAlertSettings";
import DataBackupSettings from "@/components/settings/DataBackupSettings";
import { useThemeColors } from "@/constants/theme";
import { router } from "expo-router";

export default function SettingsScreen() {
  const themeColors = useThemeColors();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

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
      <View className="h-11 flex-row items-center justify-between border-b border-border bg-card px-3">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="뒤로가기"
          onPress={() => (router.canGoBack() ? router.back() : router.replace("/"))}
          hitSlop={8}
          className="flex-row items-center gap-1.5"
        >
          <Ionicons name="chevron-back" size={21} color={themeColors.foreground} />
          <Text className="text-[14px] font-bold text-foreground">설정</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={searchOpen ? "검색 닫기" : "설정 검색"}
          onPress={() => {
            setSearchOpen(current => !current);
            setSearchValue("");
          }}
          hitSlop={8}
          className="ml-auto p-1"
        >
          <Ionicons
            name={searchOpen ? "close-outline" : "search-outline"}
            size={20}
            color={themeColors.foreground}
          />
        </Pressable>
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        className="flex-1 bg-background"
      >
        <SettingsContent
          searchOpen={searchOpen}
          searchValue={searchValue}
          onSearchValueChange={setSearchValue}
        />
        <SmartAlertSettings />
        <DataBackupSettings />
      </ScrollView>
    </View>
  );
}
