import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, Pressable, Switch, Text, View } from "react-native";
import { useThemeColors } from "@/constants/theme";

type AlertSettingRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  iconColor: string;
  iconBackground: string;
  trailing: React.ReactNode;
  last?: boolean;
};

function AlertSettingRow({
  icon,
  title,
  description,
  iconColor,
  iconBackground,
  trailing,
  last = false,
}: AlertSettingRowProps) {
  return (
    <View
      className={`min-h-[58px] flex-row items-center gap-2.5 px-2.5 py-2 ${last ? "" : "border-b border-border"}`}
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

function AlertSwitch({
  label,
  value,
  onValueChange,
}: {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}) {
  const themeColors = useThemeColors();

  return (
    <Switch
      accessibilityLabel={label}
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: themeColors.border, true: themeColors.primary }}
      thumbColor={themeColors.switchThumb}
      ios_backgroundColor={themeColors.border}
      style={{ transform: [{ scaleX: 0.82 }, { scaleY: 0.82 }] }}
    />
  );
}

function ValueSetting({
  label,
  value,
  onPress,
  highlight,
}: {
  label: string;
  value: string;
  onPress: () => void;
  highlight?: boolean;
}) {
  const themeColors = useThemeColors();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${label}, ${value}`}
      onPress={onPress}
      className="shrink-0 flex-row items-center gap-1 active:opacity-70"
    >
      {highlight ? (
        <Text className="rounded-full bg-danger-soft px-1.5 py-0.5 text-[8px] font-semibold text-danger">
          {value}
        </Text>
      ) : (
        <Text className="text-[9px] font-medium text-muted">{value}</Text>
      )}
      <Ionicons name="chevron-forward" size={13} color={themeColors.subtle} />
    </Pressable>
  );
}

export default function SmartAlertSettings() {
  const themeColors = useThemeColors();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [paymentDetectionEnabled, setPaymentDetectionEnabled] = useState(true);
  const [alertTime, setAlertTime] = useState("D-1 오전 9시");
  const [quietHours, setQuietHours] = useState("22:00 ~ 08:00");

  const selectOption = (title: string, options: string[], onSelect: (value: string) => void) => {
    Alert.alert(title, undefined, [
      ...options.map(value => ({ text: value, onPress: () => onSelect(value) })),
      { text: "취소", style: "cancel" },
    ]);
  };

  return (
    <View className="w-full max-w-[480px] self-center px-3 pb-5">
      <View className="mt-6 mb-4 flex-row items-center justify-between px-1">
        <Text className="text-[11px] font-bold text-foreground">알림 및 스마트 감지</Text>
        <Text className="text-[9px] font-semibold text-primary">스마트 버전 ON</Text>
      </View>
      <View className="overflow-hidden rounded-[14px] border border-border bg-surface px-1">
        <AlertSettingRow
          icon="notifications"
          title="푸시 알림 전체 허용"
          description="결제 예정일 및 혜택 변동 소식"
          iconColor={themeColors.primary}
          iconBackground={themeColors.primarySoft}
          trailing={
            <AlertSwitch label="푸시 알림 전체 허용" value={pushEnabled} onValueChange={setPushEnabled} />
          }
        />
        <AlertSettingRow
          icon="calendar"
          title="결제 예정일 알림 시점"
          description="원치 않는 자동 갱신을 미리 방지"
          iconColor={themeColors.danger}
          iconBackground={themeColors.dangerSoft}
          trailing={
            <ValueSetting
              label="결제 예정일 알림 시점"
              value={alertTime}
              highlight
              onPress={() =>
                selectOption(
                  "결제 예정일 알림 시점",
                  ["D-1 오전 9시", "D-1 오후 6시", "당일 오전 9시"],
                  setAlertTime,
                )
              }
            />
          }
        />
        <AlertSettingRow
          icon="moon"
          title="방해 금지 시간대"
          description="야간 알림 일시 차단"
          iconColor={themeColors.primary}
          iconBackground={themeColors.primarySoft}
          trailing={
            <ValueSetting
              label="방해 금지 시간대"
              value={quietHours}
              onPress={() =>
                selectOption(
                  "방해 금지 시간대",
                  ["22:00 ~ 08:00", "23:00 ~ 07:00", "사용 안 함"],
                  setQuietHours,
                )
              }
            />
          }
        />
        <AlertSettingRow
          icon="sync"
          title="금융 결제 자동 감지"
          description="카드 승인 문자 및 마이데이터 연동"
          iconColor={themeColors.success}
          iconBackground={themeColors.successSoft}
          last
          trailing={
            <View className="flex-row items-center gap-1">
              <Text className="rounded-full bg-success-soft px-1.5 py-0.5 text-[8px] font-semibold text-success">
                실시간
              </Text>
              <AlertSwitch
                label="금융 결제 자동 감지"
                value={paymentDetectionEnabled}
                onValueChange={setPaymentDetectionEnabled}
              />
            </View>
          }
        />
      </View>
    </View>
  );
}
