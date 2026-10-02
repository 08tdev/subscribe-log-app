import { Ionicons } from "@expo/vector-icons";
import { Pressable, Switch, Text, View } from "react-native";
import { useThemeColors } from "@/constants/theme";

export type BillingCycle = "monthly" | "yearly" | "weekly" | "custom";

const CYCLES: { id: BillingCycle; label: string }[] = [
  { id: "monthly", label: "매월" },
  { id: "yearly", label: "매년" },
  { id: "weekly", label: "매주" },
  { id: "custom", label: "직접 설정" },
];

type SubscriptionBillingScheduleProps = {
  cycle: BillingCycle;
  onCycleChange: (cycle: BillingCycle) => void;
  paymentDate: string;
  daysUntilPayment: number;
  onChoosePaymentDate: () => void;
  trialReminder: boolean;
  onTrialReminderChange: (enabled: boolean) => void;
};

export default function SubscriptionBillingSchedule({
  cycle,
  onCycleChange,
  paymentDate,
  daysUntilPayment,
  onChoosePaymentDate,
  trialReminder,
  onTrialReminderChange,
}: SubscriptionBillingScheduleProps) {
  const colors = useThemeColors();

  return (
    <View className="mt-3 w-full max-w-[520px] self-center rounded-[13px] bg-surface p-3">
      <Text className="mb-2 text-[9px] font-bold text-foreground">결제 주기 및 일정</Text>
      <View className="flex-row flex-wrap gap-1 rounded-[9px] bg-primary-soft p-1">
        {CYCLES.map(option => {
          const selected = cycle === option.id;
          return (
            <Pressable
              key={option.id}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              onPress={() => onCycleChange(option.id)}
              className={`min-h-8 min-w-[62px] flex-1 items-center justify-center rounded-[7px] px-2 py-1 ${selected ? "bg-primary" : "bg-transparent"}`}
            >
              <Text
                className={`text-center text-[7px] font-semibold ${selected ? "text-primary-foreground" : "text-muted"}`}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`다음 결제 예정일 ${paymentDate}, 날짜 변경`}
        onPress={onChoosePaymentDate}
        className="mt-2.5 min-h-12 flex-row items-center gap-2 rounded-[10px] bg-primary-soft px-2.5 py-2 active:opacity-75"
      >
        <View className="h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-surface">
          <Ionicons name="calendar-outline" size={15} color={colors.primary} />
        </View>
        <View className="min-w-0 flex-1">
          <Text className="text-[7px] text-muted">다음 결제 예정일</Text>
          <Text className="mt-0.5 text-[9px] font-semibold text-foreground">{paymentDate}</Text>
        </View>
        <Text className="shrink-0 rounded-full bg-danger-soft px-1.5 py-0.5 text-[7px] font-semibold text-danger">
          D-{daysUntilPayment}
        </Text>
        <Ionicons name="chevron-forward" size={12} color={colors.muted} />
      </Pressable>

      <View className="mt-2 flex-row items-center justify-between gap-2">
        <View className="min-w-0 flex-1 flex-row items-center gap-1.5">
          <Ionicons name="time-outline" size={12} color={colors.muted} />
          <Text className="text-[7px] text-muted">무료 체험 종료일에 따로 알림하기</Text>
        </View>
        <Switch
          accessibilityLabel="무료 체험 종료일 알림"
          value={trialReminder}
          onValueChange={onTrialReminderChange}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor={colors.switchThumb}
          ios_backgroundColor={colors.border}
          style={{ transform: [{ scaleX: 0.82 }, { scaleY: 0.82 }] }}
        />
      </View>
    </View>
  );
}
