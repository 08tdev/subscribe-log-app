import { Ionicons } from "@expo/vector-icons";
import { ReactNode, useEffect, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import SubscriptionBillingSchedule, {
  BillingCycle,
} from "@/components/add/SubscriptionBillingSchedule";
import SubscriptionChargeSettings from "@/components/add/SubscriptionChargeSettings";
import { useThemeColors } from "@/constants/theme";
import { SubscriptionSelection } from "@/components/add/SubscriptionPicker";

export type SubscriptionDraft = {
  monthlyAmount: string;
  paymentDate: string;
  cycle: BillingCycle;
  splitEnabled: boolean;
  memberCount: number;
  trialReminder: boolean;
};

type SubscriptionDetailsFormProps = {
  selection: SubscriptionSelection;
  onSubmit: (draft: SubscriptionDraft) => void;
  children?: ReactNode;
};

function formatPaymentDate(date: Date) {
  const dateLabel = date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const weekday = new Intl.DateTimeFormat("ko-KR", { weekday: "short" }).format(date);
  return `${dateLabel} (${weekday})`;
}

export default function SubscriptionDetailsForm({
  selection,
  onSubmit,
  children,
}: SubscriptionDetailsFormProps) {
  const colors = useThemeColors();
  const [monthlyAmount, setMonthlyAmount] = useState(selection.monthlyAmount);
  const [daysUntilPayment, setDaysUntilPayment] = useState(3);
  const [paymentDate, setPaymentDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return formatPaymentDate(date);
  });
  const [cycle, setCycle] = useState<BillingCycle>("monthly");
  const [splitEnabled, setSplitEnabled] = useState(true);
  const [memberCount, setMemberCount] = useState(4);
  const [trialReminder, setTrialReminder] = useState(false);

  useEffect(() => {
    setMonthlyAmount(selection.monthlyAmount);
  }, [selection.monthlyAmount]);

  const choosePaymentDate = () => {
    const choices = [1, 3, 7, 14].map(days => {
      const date = new Date();
      date.setDate(date.getDate() + days);
      return {
        text: `${formatPaymentDate(date)} (D-${days})`,
        onPress: () => {
          setDaysUntilPayment(days);
          setPaymentDate(formatPaymentDate(date));
        },
      };
    });
    Alert.alert("다음 결제일 선택", undefined, [...choices, { text: "취소", style: "cancel" }]);
  };

  return (
    <View className="w-full">
      <SubscriptionChargeSettings
        amount={monthlyAmount}
        referenceAmount={selection.monthlyAmount}
        onAmountChange={setMonthlyAmount}
        splitEnabled={splitEnabled}
        onSplitEnabledChange={setSplitEnabled}
        memberCount={memberCount}
        onMemberCountChange={setMemberCount}
      />
      <SubscriptionBillingSchedule
        cycle={cycle}
        onCycleChange={setCycle}
        paymentDate={paymentDate}
        daysUntilPayment={daysUntilPayment}
        onChoosePaymentDate={choosePaymentDate}
        trialReminder={trialReminder}
        onTrialReminderChange={setTrialReminder}
      />
      {children}

      <Pressable
        accessibilityRole="button"
        onPress={() => {
          if (!monthlyAmount || Number(monthlyAmount) <= 0) {
            Alert.alert("금액을 확인해 주세요", "월 결제 금액을 입력해 주세요.");
            return;
          }
          onSubmit({
            monthlyAmount,
            paymentDate,
            cycle,
            splitEnabled,
            memberCount,
            trialReminder,
          });
        }}
        className="min-h-11 flex-row items-center justify-center gap-1.5 rounded-[10px] bg-primary px-3 py-2 active:opacity-80"
      >
        <Ionicons name="add-circle-outline" size={15} color={colors.primaryForeground} />
        <Text className="text-center text-[10px] font-bold text-primary-foreground">
          {selection.serviceName} 구독 등록하기
        </Text>
      </Pressable>
    </View>
  );
}
