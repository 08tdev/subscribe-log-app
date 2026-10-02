import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useThemeColors } from "@/constants/theme";

type TrendingSubscription = {
  id: string;
  name: string;
  badge?: string;
  description: string;
  price: string;
  icon: "disney" | "youtube" | "ai" | "music" | "delivery";
  trend: "up" | "same" | "new" | "down";
  trendValue?: string;
};

type TrendingSubscriptionsProps = {
  onAddSubscription?: (subscriptionId: string) => void;
  onViewAll?: () => void;
};

const TRENDING_SUBSCRIPTIONS: TrendingSubscription[] = [
  {
    id: "disney-plus",
    name: "디즈니+",
    badge: "스탠다드",
    description: "무빙 2 공개 임박! 신작 추천",
    price: "월 9,900원부터",
    icon: "disney",
    trend: "up",
    trendValue: "2",
  },
  {
    id: "youtube-premium",
    name: "유튜브 프리미엄",
    badge: "뮤직",
    description: "광고 없는 영상 & 백그라운드 재생",
    price: "월 14,900원",
    icon: "youtube",
    trend: "same",
  },
  {
    id: "chatgpt-plus",
    name: "ChatGPT Plus",
    badge: "AI 필수",
    description: "GPT-4o 및 고급 분석 무제한",
    price: "월 $20 (~29,000원)",
    icon: "ai",
    trend: "up",
    trendValue: "1",
  },
  {
    id: "spotify",
    name: "스포티파이",
    badge: "3개월 무료",
    description: "첫 3개월 0원 체험 프로모션",
    price: "월 10,900원",
    icon: "music",
    trend: "new",
  },
  {
    id: "coupang-wow",
    name: "쿠팡 와우 멤버십",
    description: "쿠팡플레이 무료 & 무료배송",
    price: "월 7,890원",
    icon: "delivery",
    trend: "down",
    trendValue: "1",
  },
];

function RankingHeader({ onViewAll }: Pick<TrendingSubscriptionsProps, "onViewAll">) {
  const themeColors = useThemeColors();

  return (
    <View className="w-[94%] max-w-[480px] self-center">
      <View className="mb-1 flex-row items-center gap-2">
        <View className="flex-row items-center gap-1 rounded-full bg-primary-soft px-2 py-1">
          <Ionicons name="flame" size={11} color={themeColors.primary} />
          <Text className="text-[9px] font-semibold text-primary">실시간 랭킹</Text>
        </View>
        <Text className="text-[9px] text-muted">오늘 15:00 기준</Text>
      </View>
      <View className="flex-row items-center justify-between gap-2">
        <Text className="min-w-0 flex-1 text-[16px] font-bold leading-[21px] text-foreground">
          이번 주 가장 많이 찾는 TOP 5 구독
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={onViewAll}
          className="shrink-0 flex-row items-center gap-0.5 py-1"
        >
          <Text className="text-[10px] font-medium text-muted">전체 순위</Text>
          <Ionicons name="chevron-forward" size={12} color={themeColors.muted} />
        </Pressable>
      </View>
    </View>
  );
}

function RankingChange({ trend, trendValue }: Pick<TrendingSubscription, "trend" | "trendValue">) {
  const themeColors = useThemeColors();

  if (trend === "new") {
    return (
      <View className="mt-1 rounded-[4px] bg-danger-soft px-1 py-0.5">
        <Text className="text-[7px] font-bold text-danger">NEW</Text>
      </View>
    );
  }

  const isUp = trend === "up";
  const color = isUp ? themeColors.danger : trend === "down" ? themeColors.subtle : themeColors.muted;

  return (
    <View className="mt-1 flex-row items-center justify-center gap-0.5">
      {trend !== "same" && (
        <Ionicons name={isUp ? "caret-up" : "caret-down"} size={7} color={color} />
      )}
      <Text className="text-[8px] font-semibold" style={{ color }}>
        {trend === "same" ? "-" : trendValue}
      </Text>
    </View>
  );
}

function ServiceIcon({ icon }: { icon: TrendingSubscription["icon"] }) {
  if (icon === "disney") {
    return (
      <View className="h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-[#101329]">
        <Text className="text-[15px] font-bold text-[#83A7FF]">D+</Text>
      </View>
    );
  }

  const iconStyles = {
    youtube: { name: "logo-youtube" as const, color: "#FF0000", background: "#FFE5E6" },
    ai: { name: "sparkles" as const, color: "#078E7A", background: "#DDF6F0" },
    music: { name: "headset" as const, color: "#18A75B", background: "#DFF7E8" },
    delivery: { name: "car" as const, color: "#EF5961", background: "#FFE9E9" },
  }[icon];

  return (
    <View
      className="h-10 w-10 shrink-0 items-center justify-center rounded-[13px]"
      style={{ backgroundColor: iconStyles.background }}
    >
      <Ionicons name={iconStyles.name} size={19} color={iconStyles.color} />
    </View>
  );
}

function SubscriptionRow({
  subscription,
  rank,
  onAdd,
}: {
  subscription: TrendingSubscription;
  rank: number;
  onAdd?: (subscriptionId: string) => void;
}) {
  const themeColors = useThemeColors();

  return (
    <View className="min-h-[76px] w-[94%] max-w-[480px] self-center flex-row items-center gap-2 rounded-[15px] border border-border bg-surface px-2 py-2 shadow-sm shadow-slate-200/60">
      <View className="w-5 shrink-0 items-center">
        <Text className="text-[13px] font-bold text-foreground">{rank}</Text>
        <RankingChange trend={subscription.trend} trendValue={subscription.trendValue} />
      </View>
      <ServiceIcon icon={subscription.icon} />
      <View className="min-w-0 flex-1">
        <View className="flex-row items-center gap-1">
          <Text className="shrink text-[11px] font-bold text-foreground" numberOfLines={1}>
            {subscription.name}
          </Text>
          {subscription.badge && (
            <View className="shrink-0 rounded-[5px] bg-primary-soft px-1.5 py-0.5">
              <Text className="text-[8px] font-medium text-primary">{subscription.badge}</Text>
            </View>
          )}
        </View>
        <Text className="mt-0.5 text-[9px] leading-[12px] text-muted" numberOfLines={1}>
          {subscription.description}
        </Text>
        <Text className="mt-0.5 text-[10px] font-semibold text-foreground" numberOfLines={1}>
          {subscription.price}
        </Text>
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${subscription.name} 구독 추가`}
        onPress={() => onAdd?.(subscription.id)}
        className="h-8 shrink-0 flex-row items-center gap-1 rounded-[10px] bg-primary-soft px-2.5 active:opacity-70"
      >
        <Ionicons name="add" size={13} color={themeColors.primary} />
        <Text className="text-[9px] font-semibold text-primary">추가</Text>
      </Pressable>
    </View>
  );
}

export default function TrendingSubscriptions({
  onAddSubscription,
  onViewAll,
}: TrendingSubscriptionsProps) {
  return (
    <View className="w-full gap-2">
      <RankingHeader onViewAll={onViewAll} />
      {TRENDING_SUBSCRIPTIONS.map((subscription, index) => (
        <SubscriptionRow
          key={subscription.id}
          subscription={subscription}
          rank={index + 1}
          onAdd={onAddSubscription}
        />
      ))}
    </View>
  );
}