import { HeaderProps } from "@/interface/HeaderInterface";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Logo from "../logo/Logo";
import { useColorScheme } from "nativewind";
import { useThemeColors } from "@/constants/theme";

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
  const { colorScheme } = useColorScheme();
  const themeColors = useThemeColors();
  const rightActionLabel =
    rightIcon === "search-outline"
      ? "설정 검색"
      : rightIcon === "notifications-outline"
        ? "알림"
        : "닫기";

  return (
    <SafeAreaView edges={["top"]} className="bg-card">
      <View
        className="min-h-14 flex-row items-center justify-between border-b border-solid border-border px-2 py-1 sm:px-4"
        style={{ borderBottomWidth: 1 }}
      >
        <View className="min-w-0 flex-1 flex-row items-center justify-start">
          {showBack ? (
            <View className="min-w-0 flex-row items-center gap-1">
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel="뒤로가기"
                onPress={onBackPress}
                hitSlop={10}
                className="min-h-11 min-w-11 items-center justify-center"
              >
                <Ionicons name="chevron-back" size={24} color={themeColors.foreground} />
              </TouchableOpacity>
              {!!title && (
                <Text
                  className="min-w-0 shrink text-base font-bold text-foreground"
                  numberOfLines={1}
                >
                  {title}
                </Text>
              )}
            </View>
          ) : (
            showHome && (
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel={title ? `${title} 홈` : "홈"}
                onPress={onHomeIconPress}
                hitSlop={10}
                activeOpacity={0.7}
                className="min-h-11 min-w-0 flex-row items-center gap-2"
              >
                <Logo theme={colorScheme} />
                {!!title && (
                  <Text
                    className="min-w-0 shrink text-base font-bold text-foreground"
                    numberOfLines={1}
                  >
                    {title}
                  </Text>
                )}
              </TouchableOpacity>
            )
          )}
        </View>

        {/* [오른쪽 영역] */}
        <View className="shrink-0 flex-row items-center justify-end gap-1">
          {rightIcon && (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel={rightActionLabel}
              onPress={onRightIconPress}
              className="min-h-11 min-w-11 items-center justify-center"
            >
              <Ionicons name={rightIcon} size={22} color={themeColors.foreground} />
            </TouchableOpacity>
          )}
          {showSetting && (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="설정"
              onPress={onSettingIconPress}
              className="min-h-11 min-w-11 items-center justify-center"
            >
              <Ionicons name="settings-outline" size={22} color={themeColors.foreground} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
