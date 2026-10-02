import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableHighlight, View } from "react-native";
import { router } from "expo-router";
import { useThemeColors } from "@/constants/theme";

type WeeklyPaymentCardProps = {
  paymentCount?: number;
  paymentDay?: string;
  serviceName?: string;
  paymentAmount?: string;
};

type PaymentNoticeTitleProps = {
  paymentCount: number;
};

function PaymentNoticeIcon() {
  const themeColors = useThemeColors();

  return (
    <View className="h-[50px] w-[50px] shrink-0 items-center justify-center rounded-[14px] bg-primary-soft">
      <Ionicons name="notifications-outline" size={24} color={themeColors.primary} />
    </View>
  );
}

function PaymentNoticeTitle({ paymentCount }: PaymentNoticeTitleProps) {
  return (
    <Text className="text-[13px] font-semibold leading-[18px] text-foreground" numberOfLines={2}>
      이번 주 결제 예정 <Text className="font-bold text-danger">{paymentCount}건</Text>
      <Text className="font-medium text-foreground"> · 점검 알림</Text>
    </Text>
  );
}

type PaymentNoticeDetailsProps = {
  paymentCount: number;
  paymentDay: string;
  serviceName: string;
  paymentAmount: string;
};

function PaymentNoticeDetails({
  paymentCount,
  paymentDay,
  serviceName,
  paymentAmount,
}: PaymentNoticeDetailsProps) {
  return (
    <View className="min-w-0 flex-1 gap-0.5">
      <PaymentNoticeTitle paymentCount={paymentCount} />
      <Text className="text-[11px] leading-[15px] text-muted" numberOfLines={2}>
        {paymentDay} {serviceName} {paymentAmount} 출금 전 잔액을 확인해 주세요
      </Text>
    </View>
  );
}

function PaymentNoticeChevron() {
  const themeColors = useThemeColors();
  return <Ionicons name="chevron-forward" size={20} color={themeColors.foreground} />;
}

export default function WeeklyPaymentCard({
  paymentCount = 2,
  paymentDay = "내일",
  serviceName = "넷플릭스",
  paymentAmount = "₩17,000",
}: WeeklyPaymentCardProps) {
  return (
    <TouchableHighlight
      onPress={() => router.push("/payment")}
      className="w-[90%] max-w-[480px] rounded-[22px] bg-primary-soft px-3 py-3.5 sm:px-4"
    >
      <View className="w-full self-center flex-row items-center gap-2.5 sm:gap-4">
        <PaymentNoticeIcon />
        <PaymentNoticeDetails
          paymentCount={paymentCount}
          paymentDay={paymentDay}
          serviceName={serviceName}
          paymentAmount={paymentAmount}
        />
        <PaymentNoticeChevron />
      </View>
    </TouchableHighlight>
  );
}
