import { HeaderProps } from "@/interface/HeaderInterface";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableNativeFeedback,
  TouchableHighlight,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Logo from "../logo/Logo";
import { ThemeToggle } from "../toggle/ThemeToggle";

export default function Header({
  title,
  showBack,
  onBackPress,
  rightIcon,
  onRightIconPress,
  showHome,
  onHomeIconPress,
}: HeaderProps) {
  const statusBarHeight = Platform.OS === "android" ? StatusBar.currentHeight : 0;
  return (
    <SafeAreaView className="bg-slate-50" style={{ paddingTop: statusBarHeight }}>
      <View className="h-14 flex-row items-center justify-between px-4 bg-slate-50 border-b border-slate-100">
        <View className="flex-1 items-start">
          {showHome && (
            <TouchableHighlight onPress={onHomeIconPress} hitSlop={10}>
              <View className="flex-1 flex-row items-center gap-2">
                <Logo />
                <Text className="text-sm font-bold text-slate-800" numberOfLines={1}>
                  {title}
                </Text>
              </View>
            </TouchableHighlight>
          )}
        </View>
        <View className="w-10 justify-center items-start">
          {showBack && (
            <TouchableOpacity onPress={onBackPress} hitSlop={10}>
              <Ionicons name="chevron-back" size={24} color="#1E293B" />
            </TouchableOpacity>
          )}
        </View>
        <ThemeToggle />
        <View className="w-10 justify-center items-end">
          {rightIcon && (
            <TouchableOpacity onPress={onRightIconPress} className="p-1">
              <Ionicons name={rightIcon} size={22} color="#1E293B" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
