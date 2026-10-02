import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, TouchableHighlight, View } from "react-native";
import { router } from "expo-router";
import { useThemeColors } from "@/constants/theme";

export type UpcomingPayment = {
  id: string;
  name: string;
  badge?: string;
  detail: string;
  amount: string;
  daysUntilPayment: number;
  icon: "netflix" | "youtube" | "chatgpt";
};

type UpcomingPaymentsSectionProps = {
  payments?: UpcomingPayment[];
  onViewAll?: () => void;
};

const DEFAULT_PAYMENTS: UpcomingPayment[] = [
  {
    id: "netflix",
    name: "넷플릭스",
    badge: "프리미엄",
    detail: "OTT 스트리밍 · 매월 15일 결제",
    amount: "₩17,000",
    daysUntilPayment: 1,
    icon: "netflix",
  },
  {
    id: "youtube-premium",
    name: "유튜브 프리미엄",
    detail: "음악/영상 · 매월 17일 결제",
    amount: "₩14,900",
    daysUntilPayment: 3,
    icon: "youtube",
  },
  {
    id: "chatgpt-plus",
    name: "ChatGPT Plus",
    badge: "AI",
    detail: "생산성 도구 · 매월 26일 결제",
    amount: "₩29,000",
    daysUntilPayment: 12,
    icon: "chatgpt",
  },
];

function UpcomingPaymentsHeader({
  paymentCount,
  onViewAll,
}: {
  paymentCount: number;
  onViewAll?: () => void;
}) {
  const themeColors = useThemeColors();

  return (
    <View className="mb-1 flex-row items-center justify-between">
      <View className="flex-row items-center gap-1.5">
        <Text className="text-[15px] font-bold text-foreground">다가오는 결제</Text>
        <View className="rounded-full bg-primary-soft px-1.5 py-0.5">
          <Text className="text-[9px] font-semibold text-primary">{paymentCount}건</Text>
        </View>
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="다가오는 결제 전체 보기"
        disabled={!onViewAll}
        onPress={onViewAll}
        className="flex-row items-center gap-0.5"
      >
        <Text className="text-[10px] font-medium text-muted">전체 보기</Text>
        <Ionicons name="chevron-forward" size={12} color={themeColors.muted} />
      </Pressable>
    </View>
  );
}

function PaymentServiceIcon({ icon }: { icon: UpcomingPayment["icon"] }) {
  if (icon === "netflix") {
    return (
      <View className="h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-[#E50914]">
        <Text className="text-[16px] font-extrabold text-white">N</Text>
      </View>
    );
  }

  if (icon === "youtube") {
    return (
      <View className="h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-[#FF0000]">
        <Ionicons name="logo-youtube" size={18} color="#FFFFFF" />
      </View>
    );
  }

  return (
    <View className="h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-[#10A985]">
      <Ionicons name="sparkles" size={16} color="#FFFFFF" />
    </View>
  );
}

function ServiceBadge({ label }: { label: string }) {
  const isAi = label === "AI";

  return (
    <View className={`rounded px-1 py-0.5 ${isAi ? "bg-success-soft" : "bg-primary-soft"}`}>
      <Text className={`text-[8px] font-medium ${isAi ? "text-success" : "text-primary"}`}>
        {label}
      </Text>
    </View>
  );
}

function PaymentDueBadge({ daysUntilPayment }: { daysUntilPayment: number }) {
  const badgeStyle =
    daysUntilPayment <= 1
      ? { background: "bg-danger-soft", text: "text-danger" }
      : daysUntilPayment <= 3
        ? { background: "bg-warning-soft", text: "text-warning" }
        : { background: "bg-primary-soft", text: "text-primary" };

  return (
    <View className={`rounded-full px-1.5 py-0.5 ${badgeStyle.background}`}>
      <Text className={`text-[8px] font-semibold ${badgeStyle.text}`}>D-{daysUntilPayment}</Text>
    </View>
  );
}

function UpcomingPaymentRow({ payment }: { payment: UpcomingPayment }) {
  return (
    <View className="flex-row items-center gap-2.5 rounded-[14px] bg-surface px-2.5 py-2 shadow-sm shadow-slate-200">
      <PaymentServiceIcon icon={payment.icon} />
      <View className="min-w-0 flex-1">
        <View className="flex-row items-center gap-1">
          <Text className="shrink text-[10px] font-bold text-foreground" numberOfLines={1}>
            {payment.name}
          </Text>
          {payment.badge && <ServiceBadge label={payment.badge} />}
        </View>
        <Text
          className="text-[8px] leading-3 text-muted"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {payment.detail}
        </Text>
      </View>
      <View className="shrink-0 items-end gap-1">
        <Text className="text-[11px] font-bold text-foreground">{payment.amount}</Text>
        <PaymentDueBadge daysUntilPayment={payment.daysUntilPayment} />
      </View>
    </View>
  );
}

export default function UpcomingPaymentsSection({
  payments = DEFAULT_PAYMENTS,
  onViewAll,
}: UpcomingPaymentsSectionProps) {
  return (
    <View className="w-[90%] self-center">
      <UpcomingPaymentsHeader paymentCount={payments.length} onViewAll={onViewAll} />
      <View className="gap-2">
        {payments.map(payment => (
          <TouchableHighlight
            onPress={() => router.push(`/payment/${payment.id}`)}
            key={payment.id}
          >
            <UpcomingPaymentRow key={payment.id} payment={payment} />
          </TouchableHighlight>
        ))}
      </View>
    </View>
  );
}
