import React from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColors } from "@/constants/theme";

const TAB_ICONS: Record<
  string,
  {
    active: keyof typeof Ionicons.glyphMap;
    inactive: keyof typeof Ionicons.glyphMap;
    label: string;
  }
> = {
  index: { active: "grid", inactive: "grid-outline", label: "대시보드" },
  explore: { active: "compass", inactive: "compass-outline", label: "발견" },
  add: { active: "add", inactive: "add", label: "등록" },
  stats: { active: "stats-chart", inactive: "stats-chart-outline", label: "통계" },
  profile: { active: "person", inactive: "person-outline", label: "마이" },
};

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const themeColors = useThemeColors();

  return (
    <View
      className={`flex-row bg-surface border-t border-slate-100 px-1 justify-around items-center ${
        Platform.OS === "ios" ? "pb-7 h-20" : "pb-2 h-16"
      }`}
    >
      {state.routes.map((route, index) => {
        if (route.name === "payment/[id]" || route.name === "settings") {
          return null;
        }

        const isFocused = state.index === index;
        const iconConfig = TAB_ICONS[route.name] || {
          active: "square",
          inactive: "square-outline",
          label: route.name,
        };

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        if (route.name === "add") {
          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              activeOpacity={0.8}
              className="-mt-5 items-center justify-center flex-1"
            >
              <View className="w-10 h-10 rounded-xl bg-primary items-center justify-center shadow-md shadow-indigo-100">
                <Ionicons name="add" size={28} color={themeColors.primaryForeground} />
              </View>
              <Text className="text-[10px] font-semibold text-slate-500 mt-1">
                {iconConfig.label}
              </Text>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            activeOpacity={0.7}
            className="flex-1 items-center justify-center py-1"
          >
            <Ionicons
              name={isFocused ? iconConfig.active : iconConfig.inactive}
              size={22}
              color={isFocused ? themeColors.primary : themeColors.subtle}
            />
            <Text
              className={`text-[10px] mt-1 ${
                isFocused ? "font-bold text-indigo-600" : "font-medium text-slate-400"
              }`}
            >
              {iconConfig.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
