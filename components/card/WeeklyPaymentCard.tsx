import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableHighlight, View } from "react-native";
import { router } from "expo-router";

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
  return (
    <View className="h-[50px] w-[50px] shrink-0 items-center justify-center rounded-[14px] bg-[#DDE5FF]">
      <Ionicons name="notifications-outline" size={24} color="#5546D8" />
    </View>
  );
}

function PaymentNoticeTitle({ paymentCount }: PaymentNoticeTitleProps) {
  return (
    <Text className="text-[15px] font-semibold text-[#20243A]" numberOfLines={1}>
      이번 주 결제 예정 <Text className="font-bold text-[#E94D3D]">{paymentCount}건</Text>
      <Text className="font-medium text-[#20243A]"> · 점검 알림</Text>
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
      <Text className="text-[15px] leading-5 text-[#59627A]" numberOfLines={1} ellipsizeMode="tail">
        {paymentDay} {serviceName} {paymentAmount} 출금 전 잔액을 확인해 주세요
      </Text>
    </View>
  );
}

function PaymentNoticeChevron() {
  return <Ionicons name="chevron-forward" size={20} color="#34415D" />;
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
      className="w-[90%] rounded-[22px] bg-[#EEF2FF] px-4 py-3.5"
    >
      <View className="w-full self-center flex-row items-center gap-4">
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
