import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { useColorScheme } from "nativewind";
import { useAuth } from "@/context/AuthContext";
import { useThemeColors } from "@/constants/theme";

type SettingsContentProps = {
  searchOpen?: boolean;
  searchValue?: string;
  onSearchValueChange?: (value: string) => void;
};

type SettingRowData = {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description?: string;
  value: string;
  iconColor: string;
  iconBackground: string;
  onPress: () => void;
};

function SettingRow({ row }: { row: SettingRowData }) {
  const themeColors = useThemeColors();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${row.title}, ${row.value}`}
      onPress={row.onPress}
      className="min-h-[64px] flex-row items-center gap-2.5 border-b border-border px-3 py-2 active:opacity-70"
    >
      <View
        className="h-8 w-8 shrink-0 items-center justify-center rounded-[9px]"
        style={{ backgroundColor: row.iconBackground }}
      >
        <Ionicons name={row.icon} size={16} color={row.iconColor} />
      </View>
      <View className="min-w-0 flex-1">
        <Text className="text-[11px] font-semibold text-foreground" numberOfLines={1}>
          {row.title}
        </Text>
        {row.description && (
          <Text className="mt-0.5 text-[9px] leading-[13px] text-muted" numberOfLines={2}>
            {row.description}
          </Text>
        )}
      </View>
      <View className="shrink-0 flex-row items-center gap-1">
        <Text className="max-w-[82px] text-right text-[10px] font-medium text-muted" numberOfLines={1}>
          {row.value}
        </Text>
        <Ionicons name="chevron-forward" size={14} color={themeColors.subtle} />
      </View>
    </Pressable>
  );
}

function showValuePicker(
  title: string,
  options: string[],
  onSelect: (value: string) => void,
) {
  Alert.alert(
    title,
    undefined,
    [
      ...options.map(value => ({ text: value, onPress: () => onSelect(value) })),
      { text: "취소", style: "cancel" as const },
    ],
  );
}

export default function SettingsContent({
  searchOpen = false,
  searchValue = "",
  onSearchValueChange,
}: SettingsContentProps) {
  const { user } = useAuth();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const themeColors = useThemeColors();
  const [currency, setCurrency] = useState("KRW (₩)");
  const [startScreen, setStartScreen] = useState("대시보드");
  const [language, setLanguage] = useState("한국어");

  const rows: SettingRowData[] = [
    {
      id: "currency",
      icon: "cash-outline",
      title: "기준 통화 설정",
      description: "다중 통화(USD, JPY) 실시간 자동 환산",
      value: currency,
      iconColor: themeColors.primary,
      iconBackground: themeColors.primarySoft,
      onPress: () =>
        showValuePicker("기준 통화 설정", ["KRW (₩)", "USD ($)", "JPY (¥)"], setCurrency),
    },
    {
      id: "theme",
      icon: "contrast-outline",
      title: "테마 모드",
      description: "디스플레이 테마 스타일 지정",
      value: colorScheme === "dark" ? "다크 모드" : "라이트 모드",
      iconColor: themeColors.success,
      iconBackground: themeColors.successSoft,
      onPress: toggleColorScheme,
    },
    {
      id: "start-screen",
      icon: "home-outline",
      title: "시작 화면",
      description: "앱 실행 시 처음 진입할 탭",
      value: startScreen,
      iconColor: themeColors.primary,
      iconBackground: themeColors.primarySoft,
      onPress: () =>
        showValuePicker("시작 화면", ["대시보드", "발견", "통계", "마이"], setStartScreen),
    },
    {
      id: "language",
      icon: "globe-outline",
      title: "언어 (Language)",
      value: language,
      iconColor: themeColors.primary,
      iconBackground: themeColors.primarySoft,
      onPress: () => showValuePicker("언어 설정", ["한국어", "English"], setLanguage),
    },
  ];
  const filteredRows = searchValue.trim()
    ? rows.filter(row =>
        `${row.title} ${row.description ?? ""} ${row.value}`
          .toLocaleLowerCase()
          .includes(searchValue.trim().toLocaleLowerCase()),
      )
    : rows;

  return (
    <View className="w-full max-w-[480px] self-center px-3 pb-5 pt-5">
      <View className="mb-6 min-h-[62px] flex-row items-center gap-2.5 rounded-[14px] border border-border bg-surface px-3 py-2">
        <View className="relative h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft">
          <Ionicons name="person" size={21} color={themeColors.primary} />
          <View className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-surface bg-success" />
        </View>
        <View className="min-w-0 flex-1">
          <View className="flex-row items-center gap-1.5">
            <Text className="min-w-0 flex-1 text-[11px] font-semibold text-foreground" numberOfLines={1}>
              {user?.email ?? "sub_lover@mouse.app"}
            </Text>
            <View className="rounded-full bg-primary-soft px-1.5 py-0.5">
              <Text className="text-[8px] font-semibold text-primary">Google</Text>
            </View>
          </View>
          <Text className="mt-0.5 text-[9px] text-muted" numberOfLines={1}>
            모든 구독 데이터 안전하게 동기화 중
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => Alert.alert("계정 관리", "연결된 계정 정보를 관리합니다.")}
          className="shrink-0 flex-row items-center gap-0.5 rounded-full bg-primary-soft px-2 py-1"
        >
          <Text className="text-[9px] font-semibold text-primary">관리</Text>
        </Pressable>
      </View>

      {searchOpen && (
        <View className="mb-3 h-10 flex-row items-center gap-2 rounded-[10px] border border-border bg-surface px-3">
          <Ionicons name="search-outline" size={15} color={themeColors.muted} />
          <TextInput
            autoFocus
            accessibilityLabel="설정 검색"
            placeholder="설정 검색"
            placeholderTextColor={themeColors.subtle}
            value={searchValue}
            onChangeText={onSearchValueChange}
            className="min-w-0 flex-1 py-0 text-[11px] text-foreground"
          />
        </View>
      )}

      <View className="mb-4 flex-row items-center justify-between px-1">
        <Text className="text-[11px] font-bold text-foreground">앱 환경 및 표시 설정</Text>
        <Text className="text-[9px] font-medium text-muted">화폐 &amp; 언어</Text>
      </View>
      <View className="overflow-hidden rounded-[14px] border border-border bg-surface px-1">
        {filteredRows.length > 0 ? (
          filteredRows.map(row => <SettingRow key={row.id} row={row} />)
        ) : (
          <Text className="px-3 py-6 text-center text-[11px] text-muted">
            검색 결과가 없습니다.
          </Text>
        )}
      </View>
    </View>
  );
}
