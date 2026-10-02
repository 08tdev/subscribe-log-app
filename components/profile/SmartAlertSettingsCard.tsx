import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Switch, Text, View } from "react-native";
import { useThemeColors } from "@/constants/theme";

const ALERT_OPTIONS = [
  {
    id: "paymentDue",
    title: "결제 D-1 알림",
    description: "내일 결제될 구독료를 전날 미리 알려드려요",
  },
  {
    id: "unusedSubscription",
    title: "잠자는 구독 감지 알림",
    description: "30일 이상 미사용 구독 발견 시 해지 추천",
  },
  {
    id: "monthlyReport",
    title: "월간 결산 리포트 발행",
    description: "매월 1일 지난달 아낀 금액 및 총 소비 리포트 도착",
  },
  {
    id: "marketingOffers",
    title: "마케팅 제휴 할인 및 이벤트",
    description: "파트너십 프로모션 및 반값 쿠폰 혜택 알림",
  },
] as const;

type AlertOptionId = (typeof ALERT_OPTIONS)[number]["id"];
type AlertPreferences = Record<AlertOptionId, boolean>;

const INITIAL_PREFERENCES: AlertPreferences = {
  paymentDue: true,
  unusedSubscription: true,
  monthlyReport: true,
  marketingOffers: false,
};

export default function SmartAlertSettingsCard() {
  const [preferences, setPreferences] = useState(INITIAL_PREFERENCES);
  const themeColors = useThemeColors();

  return (
    <View className="w-[94%] max-w-[480px] self-center rounded-[16px] border border-border bg-surface p-3.5">
      <View className="flex-row items-center gap-1.5">
        <Ionicons name="notifications-outline" size={17} color={themeColors.primary} />
        <Text className="text-[15px] font-bold text-foreground">스마트 알림 설정</Text>
      </View>
      <Text className="mt-1 text-[10px] leading-[15px] text-muted">
        구독 갱신 전 똑똑하게 알려드릴게요.
      </Text>
      <View className="mt-1">
        {ALERT_OPTIONS.map(option => (
          <View key={option.id} className="min-h-[48px] flex-row items-center gap-3 py-1.5">
            <View className="min-w-0 flex-1">
              <Text className="text-[11px] font-semibold leading-[15px] text-foreground">
                {option.title}
              </Text>
              <Text className="mt-0.5 text-[9px] leading-[13px] text-muted">
                {option.description}
              </Text>
            </View>
            <Switch
              accessibilityLabel={option.title}
              value={preferences[option.id]}
              onValueChange={value =>
                setPreferences(current => ({ ...current, [option.id]: value }))
              }
              trackColor={{ false: themeColors.border, true: themeColors.primary }}
              thumbColor={themeColors.switchThumb}
              ios_backgroundColor={themeColors.border}
              style={{ transform: [{ scaleX: 0.86 }, { scaleY: 0.86 }], }}
            />
          </View>
        ))}
      </View>
    </View>
  );
}