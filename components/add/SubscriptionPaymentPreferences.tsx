import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, Pressable, Switch, Text, View } from "react-native";
import { useThemeColors } from "@/constants/theme";

function PaymentAccountCard() {
  const colors = useThemeColors();
  const [account, setAccount] = useState("토스뱅크 통장");

  const chooseAccount = () => {
    Alert.alert("결제 수단 선택", undefined, [
      { text: "토스뱅크 통장 · 체크카드 8291", onPress: () => setAccount("토스뱅크 통장") },
      { text: "현대카드 4482", onPress: () => setAccount("현대카드") },
      {
        text: "계좌 또는 카드 추가",
        onPress: () => Alert.alert("결제 수단 추가", "결제 수단 연동 기능은 준비 중입니다."),
      },
      { text: "취소", style: "cancel" },
    ]);
  };

  return (
    <View className="rounded-[12px] bg-surface p-2.5">
      <View className="mb-2 flex-row items-center justify-between gap-2">
        <Text className="text-[9px] font-bold text-foreground">결제 수단 연동</Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => Alert.alert("결제 수단 추가", "결제 수단 연동 기능은 준비 중입니다.")}
          className="min-h-9 flex-row items-center gap-1 px-1"
        >
          <Ionicons name="add" size={12} color={colors.primary} />
          <Text className="text-[7px] font-semibold text-primary">다른 카드/계좌</Text>
        </Pressable>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${account}, 주 결제 수단, 변경`}
        onPress={chooseAccount}
        className="min-h-12 flex-row items-center gap-2 rounded-[10px] bg-primary-soft px-2.5 py-2 active:opacity-75"
      >
        <View className="h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-surface">
          <Ionicons name="card-outline" size={15} color={colors.primary} />
        </View>
        <View className="min-w-0 flex-1">
          <View className="flex-row flex-wrap items-center gap-1">
            <Text className="text-[8px] font-semibold text-foreground">{account}</Text>
            <Text className="rounded-full bg-primary px-1.5 py-0.5 text-[6px] font-semibold text-primary-foreground">
              주 결제
            </Text>
          </View>
          <Text className="mt-0.5 text-[7px] text-muted">체크카드 (끝자리 •••• 8291)</Text>
        </View>
        <Ionicons name="swap-horizontal" size={14} color={colors.muted} />
      </Pressable>
    </View>
  );
}

function SmartNotificationCard() {
  const colors = useThemeColors();
  const [paymentReminder, setPaymentReminder] = useState(true);
  const [unusedReminder, setUnusedReminder] = useState(true);

  return (
    <View className="mt-3 rounded-[12px] bg-surface p-2.5">
      <View className="mb-1.5 flex-row items-center gap-1.5">
        <Ionicons name="notifications-outline" size={13} color={colors.primary} />
        <Text className="text-[9px] font-bold text-foreground">구독회원 스마트 알림</Text>
      </View>

      <View className="min-h-12 flex-row items-center gap-2 rounded-[9px] bg-primary-soft px-2 py-1.5">
        <View className="h-7 w-7 shrink-0 items-center justify-center rounded-[7px] bg-surface">
          <Ionicons name="alarm-outline" size={13} color={colors.primary} />
        </View>
        <View className="min-w-0 flex-1">
          <Text className="text-[8px] font-semibold text-foreground">
            결제 D-1 오전 9시 똑똑한 알림
          </Text>
          <Text className="text-[7px] leading-[10px] text-muted">
            잔여 부족 및 예상 결제 금액 사전 확인
          </Text>
        </View>
        <Switch
          accessibilityLabel="결제 하루 전 스마트 알림"
          value={paymentReminder}
          onValueChange={setPaymentReminder}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor={colors.switchThumb}
          ios_backgroundColor={colors.border}
          style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
        />
      </View>

      <View className="mt-1.5 min-h-12 flex-row items-center gap-2 rounded-[9px] bg-primary-soft px-2 py-1.5">
        <View className="h-7 w-7 shrink-0 items-center justify-center rounded-[7px] bg-warning-soft">
          <Ionicons name="moon-outline" size={13} color={colors.warning} />
        </View>
        <View className="min-w-0 flex-1">
          <Text className="text-[8px] font-semibold text-foreground">
            30일 이상 미이용 시 잠자는 구독 감지
          </Text>
          <Text className="text-[7px] leading-[10px] text-muted">
            필요하지 않은 구독을 알려드려요.
          </Text>
        </View>
        <Switch
          accessibilityLabel="미사용 구독 감지 알림"
          value={unusedReminder}
          onValueChange={setUnusedReminder}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor={colors.switchThumb}
          ios_backgroundColor={colors.border}
          style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
        />
      </View>
    </View>
  );
}

function SavingsTipBanner() {
  const colors = useThemeColors();

  return (
    <View className="mt-3 flex-row items-start gap-2 rounded-[13px] bg-success-soft p-3">
      <View className="h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-surface">
        <Ionicons name="sparkles" size={15} color={colors.success} />
      </View>
      <View className="min-w-0 flex-1">
        <View className="mb-1 flex-row flex-wrap items-center gap-1">
          <Text className="text-[8px] font-bold text-foreground">쥐돌이의 스마트 절약 팁</Text>
          <Text className="rounded-full bg-surface px-1.5 py-0.5 text-[6px] font-semibold text-success">
            절약 혜택
          </Text>
        </View>
        <Text className="text-[7px] leading-[11px] text-foreground">
          넷플릭스를 4명이서 함께 결제하면 매달 ₩12,750을 절약할 수 있어요! 연간 무려
          <Text className="font-bold text-success"> ₩153,000</Text> 치즈를 모을 수 있어요.
        </Text>
      </View>
    </View>
  );
}

export default function SubscriptionPaymentPreferences() {
  return (
    <View className="mt-3 w-full max-w-[520px] self-center">
      <PaymentAccountCard />
      <SmartNotificationCard />
      <SavingsTipBanner />
    </View>
  );
}
