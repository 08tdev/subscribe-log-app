import { Ionicons } from "@expo/vector-icons";
import { Alert, Pressable, Switch, Text, TextInput, View } from "react-native";
import { useThemeColors } from "@/constants/theme";

type SubscriptionChargeSettingsProps = {
  amount: string;
  referenceAmount: string;
  onAmountChange: (amount: string) => void;
  splitEnabled: boolean;
  onSplitEnabledChange: (enabled: boolean) => void;
  memberCount: number;
  onMemberCountChange: (count: number) => void;
};

function formatAmount(amount: string) {
  return amount ? Number(amount).toLocaleString() : "";
}

export default function SubscriptionChargeSettings({
  amount,
  referenceAmount,
  onAmountChange,
  splitEnabled,
  onSplitEnabledChange,
  memberCount,
  onMemberCountChange,
}: SubscriptionChargeSettingsProps) {
  const colors = useThemeColors();
  const total = Number(amount) || 0;
  const perPerson = splitEnabled ? Math.ceil(total / memberCount) : total;

  const adjustAmount = (increment: number) => {
    onAmountChange(String(Math.max(0, total + increment)));
  };

  return (
    <View className="mt-3 w-full max-w-[520px] self-center rounded-[13px] bg-surface p-3">
      <View className="mb-1.5 flex-row items-center justify-between gap-2">
        <View className="flex-row items-center gap-1">
          <Text className="text-[9px] font-bold text-foreground">구독 결제 금액</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="월 결제 금액 안내"
            hitSlop={6}
            onPress={() => Alert.alert("월 결제 금액", "실제 청구되는 월 구독료를 입력해 주세요.")}
          >
            <Ionicons name="help-circle-outline" size={11} color={colors.muted} />
          </Pressable>
        </View>
        <Text className="text-[7px] font-medium text-primary">월 기준</Text>
      </View>

      <View className="min-h-11 flex-row items-center rounded-[10px] bg-primary-soft px-2.5">
        <Text className="mr-1.5 text-[10px] font-semibold text-primary">₩</Text>
        <TextInput
          accessibilityLabel="구독 월 결제 금액"
          keyboardType="number-pad"
          maxLength={9}
          onChangeText={value => onAmountChange(value.replace(/\D/g, ""))}
          placeholder="월 결제 금액"
          placeholderTextColor={colors.subtle}
          className="min-w-0 flex-1 py-2 text-right text-[14px] font-bold text-foreground"
          value={formatAmount(amount)}
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="금액 지우기"
          hitSlop={7}
          onPress={() => onAmountChange("")}
          className="ml-1 h-8 w-7 items-center justify-center"
        >
          <Ionicons name="close-circle" size={14} color={colors.subtle} />
        </Pressable>
      </View>

      <View className="mt-1.5 flex-row flex-wrap gap-1.5">
        <Pressable
          accessibilityRole="button"
          onPress={() => adjustAmount(1000)}
          className="min-h-7 items-center justify-center rounded-full bg-surface-muted px-2"
        >
          <Text className="text-[7px] font-medium text-foreground">+1,000원</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={() => adjustAmount(5000)}
          className="min-h-7 items-center justify-center rounded-full bg-surface-muted px-2"
        >
          <Text className="text-[7px] font-medium text-foreground">+5,000원</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={() => onAmountChange(referenceAmount)}
          className="min-h-7 flex-row items-center gap-1 rounded-full bg-primary-soft px-2"
        >
          <Text className="text-[7px] font-semibold text-primary">정가 불러오기</Text>
          <Ionicons name="refresh-outline" size={9} color={colors.primary} />
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={() => Alert.alert("달러 금액 환산", "외화 결제 자동 환산 기능은 준비 중입니다.")}
          className="min-h-7 items-center justify-center rounded-full bg-surface-muted px-2"
        >
          <Text className="text-[7px] font-medium text-muted">달러($) 환산</Text>
        </Pressable>
      </View>

      <View className="mt-3 rounded-[11px] bg-primary-soft p-2.5">
        <View className="flex-row items-center gap-2">
          <View className="h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-surface">
            <Ionicons name="people-outline" size={14} color={colors.primary} />
          </View>
          <View className="min-w-0 flex-1">
            <Text className="text-[8px] font-semibold text-foreground">
              파티원과 분할 결제 (N분의 1)
            </Text>
            <Text className="text-[7px] leading-[10px] text-muted">
              친구 또는 가족과 함께 나누어 내고 있나요?
            </Text>
          </View>
          <Switch
            accessibilityLabel="파티원과 분할 결제"
            value={splitEnabled}
            onValueChange={onSplitEnabledChange}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.switchThumb}
            ios_backgroundColor={colors.border}
            style={{ transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }] }}
          />
        </View>

        {splitEnabled && (
          <View className="mt-2 flex-row flex-wrap items-center justify-between gap-2 rounded-[9px] bg-surface px-2 py-1.5">
            <Text className="text-[7px] font-medium text-muted">파티원 인원 수</Text>
            <View className="flex-row items-center gap-2">
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="파티원 한 명 줄이기"
                disabled={memberCount <= 1}
                onPress={() => onMemberCountChange(Math.max(1, memberCount - 1))}
                className="h-7 w-7 items-center justify-center rounded-full bg-surface-muted"
              >
                <Ionicons name="remove" size={12} color={colors.foreground} />
              </Pressable>
              <Text className="min-w-4 text-center text-[10px] font-bold text-primary">
                {memberCount}
              </Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="파티원 한 명 늘리기"
                disabled={memberCount >= 10}
                onPress={() => onMemberCountChange(Math.min(10, memberCount + 1))}
                className="h-7 w-7 items-center justify-center rounded-full bg-surface-muted"
              >
                <Ionicons name="add" size={12} color={colors.foreground} />
              </Pressable>
            </View>
          </View>
        )}

        <View className="mt-1.5 flex-row flex-wrap items-center justify-between gap-1 rounded-[8px] bg-success-soft px-2 py-1.5">
          <View className="flex-row items-center gap-1">
            <Ionicons name="wallet-outline" size={11} color={colors.success} />
            <Text className="text-[7px] font-medium text-success">
              내 실부담금 ({splitEnabled ? "1인당" : "전체"})
            </Text>
          </View>
          <Text className="text-[10px] font-bold text-success">
            매월 ₩{perPerson.toLocaleString()}
          </Text>
        </View>
      </View>
    </View>
  );
}
