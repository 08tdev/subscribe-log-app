import { HeaderProps } from "@/interface/HeaderInterface";
import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView, Platform, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Logo from "../logo/Logo";
import { useColorScheme } from "nativewind";
import { color } from "@/constants/color";

export default function Header({
  title,
  showBack = false,
  onBackPress,
  rightIcon,
  onRightIconPress,
  showHome = true,
  onHomeIconPress,
  showSetting,
  onSettingIconPress,
}: HeaderProps) {
  const statusBarHeight = Platform.OS === "android" ? StatusBar.currentHeight : 0;
  const { colorScheme } = useColorScheme();

  const iconColor = colorScheme === "dark" ? color.light : color.dark;

  return (
    <SafeAreaView className="bg-card" style={{ paddingTop: statusBarHeight }}>
      <View
        className="h-14 flex-row items-center justify-between px-4 border-b border-solid border-slate-200 dark:border-slate-800"
        style={{ borderBottomWidth: 1 }}
      >
        <View className="flex-1 flex-row items-center justify-start">
          {showBack ? (
            <TouchableOpacity onPress={onBackPress} hitSlop={10} className="p-1">
              <Ionicons name="chevron-back" size={24} color={iconColor} />
            </TouchableOpacity>
          ) : (
            showHome && (
              <TouchableOpacity
                onPress={onHomeIconPress}
                hitSlop={10}
                activeOpacity={0.7}
                className="flex-row items-center gap-2"
              >
                <Logo theme={colorScheme} />
                {!!title && (
                  <Text className="text-base font-bold text-foreground" numberOfLines={1}>
                    {title}
                  </Text>
                )}
              </TouchableOpacity>
            )
          )}
        </View>

        {/* [오른쪽 영역] */}
        <View className="flex-row items-center gap-2 justify-end">
          {rightIcon && (
            <TouchableOpacity onPress={onRightIconPress} className="p-1">
              <Ionicons name={rightIcon} size={22} color={iconColor} />
            </TouchableOpacity>
          )}
          {showSetting && (
            <TouchableOpacity onPress={onSettingIconPress} className="p-1">
              <Ionicons name="settings-outline" size={22} color={iconColor} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
