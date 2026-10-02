import { Ionicons } from "@expo/vector-icons";
import { Alert, Pressable, Text, View } from "react-native";
import { useThemeColors } from "@/constants/theme";

type DataBackupSettingsProps = {
  onSync?: () => void;
  onExportCsv?: () => void;
  onClearCache?: () => void;
};

function BackupRow({
  icon,
  title,
  description,
  iconColor,
  iconBackground,
  trailing,
  last = false,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  iconColor: string;
  iconBackground: string;
  trailing: React.ReactNode;
  last?: boolean;
}) {
  return (
    <View
      className={`min-h-[62px] flex-row items-center gap-2.5 px-2.5 py-2 ${last ? "" : "border-b border-border"}`}
    >
      <View
        className="h-8 w-8 shrink-0 items-center justify-center rounded-[8px]"
        style={{ backgroundColor: iconBackground }}
      >
        <Ionicons name={icon} size={16} color={iconColor} />
      </View>
      <View className="min-w-0 flex-1">
        <Text className="text-[11px] font-semibold leading-[15px] text-foreground" numberOfLines={1}>
          {title}
        </Text>
        <Text className="mt-0.5 text-[9px] leading-[13px] text-muted" numberOfLines={2}>
          {description}
        </Text>
      </View>
      {trailing}
    </View>
  );
}

export default function DataBackupSettings({
  onSync,
  onExportCsv,
  onClearCache,
}: DataBackupSettingsProps) {
  const themeColors = useThemeColors();

  const showUnavailable = (feature: string) =>
    Alert.alert(feature, `${feature} 기능은 아직 연결되지 않았습니다.`);

  const confirmCacheClear = () => {
    Alert.alert("캐시 데이터 정리", "임시 저장 데이터를 삭제할까요?", [
      { text: "취소", style: "cancel" },
      {
        text: "삭제",
        style: "destructive",
        onPress: onClearCache ?? (() => showUnavailable("캐시 정리")),
      },
    ]);
  };

  return (
    <View className="w-full max-w-[480px] self-center px-3 pb-5">
      <View className="mb-2 flex-row items-center justify-between px-1">
        <Text className="text-[11px] font-bold text-foreground">데이터 및 백업</Text>
      </View>
      <View className="overflow-hidden rounded-[14px] border border-border bg-surface px-1">
        <BackupRow
          icon="cloud-outline"
          title="구독 데이터 클라우드 동기화"
          description="마지막 동기화: 오늘 14:20"
          iconColor={themeColors.primary}
          iconBackground={themeColors.primarySoft}
          trailing={
            <Pressable
              accessibilityRole="button"
              onPress={onSync ?? (() => showUnavailable("클라우드 동기화"))}
              className="shrink-0 flex-row items-center gap-1 rounded-full bg-primary-soft px-2 py-1.5 active:opacity-70"
            >
              <Ionicons name="sync-outline" size={12} color={themeColors.primary} />
              <Text className="text-[9px] font-semibold text-primary">지금 동기화</Text>
            </Pressable>
          }
        />
        <BackupRow
          icon="document-text-outline"
          title="지출 내역 엑셀(CSV) 일괄 내보내기"
          description="연간 지출 통계 및 정산용 파일 생성"
          iconColor={themeColors.primary}
          iconBackground={themeColors.primarySoft}
          trailing={
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="CSV 다운로드"
              onPress={onExportCsv ?? (() => showUnavailable("CSV 내보내기"))}
              hitSlop={8}
              className="h-9 w-8 shrink-0 items-center justify-center active:opacity-70"
            >
              <Ionicons name="download-outline" size={15} color={themeColors.subtle} />
            </Pressable>
          }
        />
        <BackupRow
          icon="file-tray-full-outline"
          title="캐시 데이터 정리"
          description="임시 저장 파일 42.8 MB"
          iconColor={themeColors.primary}
          iconBackground={themeColors.primarySoft}
          last
          trailing={
            <Pressable
              accessibilityRole="button"
              onPress={confirmCacheClear}
              className="shrink-0 rounded-full bg-primary-soft px-2.5 py-1.5 active:opacity-70"
            >
              <Text className="text-[9px] font-semibold text-primary">삭제</Text>
            </Pressable>
          }
        />
      </View>
    </View>
  );
}
