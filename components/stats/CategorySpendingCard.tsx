import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { useThemeColors } from "@/constants/theme";

type CategorySpending = {
  title: string;
  count?: string;
  detail: string;
  amount: string;
  share?: string;
  icon: "play-circle-outline" | "bulb-outline" | "bag-handle-outline";
  iconTone: "primary" | "success" | "subtle";
  inactive?: boolean;
  savings?: string;
};

const CATEGORIES: CategorySpending[] = [
  {
    title: "엔터 / OTT",
    count: "2건",
    detail: "넷플릭스 프리미엄, 유튜브 프리미엄",
    amount: "₩31,900",
    share: "52.4%",
    icon: "play-circle-outline",
    iconTone: "primary",
  },
  {
    title: "생산성 / AI 도구",
    count: "1건",
    detail: "ChatGPT Plus (OpenAI)",
    amount: "₩29,000",
    share: "47.6%",
    icon: "bulb-outline",
    iconTone: "success",
  },
  {
    title: "쇼핑 / 멤버십",
    detail: "쿠팡 로켓와우 (3월 해지됨)",
    amount: "₩0",
    icon: "bag-handle-outline",
    iconTone: "subtle",
    inactive: true,
    savings: "₩7,890 절약!",
  },
];

function CategoryHeader() {
  return (
    <View className="flex-row items-center justify-between gap-2">
      <View className="min-w-0">
        <Text className="text-[14px] font-bold text-foreground">카테고리별 지출</Text>
        <Text className="mt-0.5 text-[9px] text-muted">
          가장 많은 지출은 콘텐츠/엔터테인먼트
        </Text>
      </View>
      <Text className="shrink-0 text-[9px] font-semibold text-muted">총 2개 분야</Text>
    </View>
  );
}

function SpendingDistribution() {
  const themeColors = useThemeColors();

  return (
    <View className="mt-2.5">
      <View className="h-2 overflow-hidden rounded-full bg-success-soft">
        <View className="h-full flex-row">
          <View className="h-full bg-primary" style={{ width: "52.4%" }} />
          <View className="h-full flex-1 bg-success" />
        </View>
      </View>
      <View className="mt-1.5 flex-row flex-wrap items-center justify-between gap-x-2 gap-y-1">
        <View className="flex-row items-center gap-1">
          <View className="h-1.5 w-1.5 rounded-full bg-primary" />
          <Text className="text-[9px] text-foreground">엔터/OTT (52.4%)</Text>
        </View>
        <View className="flex-row items-center gap-1">
          <View className="h-1.5 w-1.5 rounded-full bg-success" />
          <Text className="text-[9px] text-foreground">생산성/AI (47.6%)</Text>
        </View>
      </View>
    </View>
  );
}

function CategoryRow({ category }: { category: CategorySpending }) {
  const themeColors = useThemeColors();
  const titleColor = category.inactive ? "text-subtle" : "text-foreground";
  const detailColor = category.inactive ? "text-subtle" : "text-muted";
  const amountColor = category.inactive ? "text-success" : "text-foreground";

  return (
    <View
      className={`min-h-[64px] flex-row items-center gap-2.5 rounded-[12px] px-2.5 py-2 ${category.inactive ? "bg-surface-muted" : "bg-primary-soft"}`}
    >
      <View
        className={`h-8 w-8 shrink-0 items-center justify-center rounded-[10px] ${category.iconTone === "success" ? "bg-success-soft" : category.iconTone === "subtle" ? "bg-surface-muted" : "bg-primary-soft"}`}
      >
        <Ionicons
          name={category.icon}
          size={17}
          color={category.iconTone === "success" ? themeColors.success : category.iconTone === "subtle" ? themeColors.subtle : themeColors.primary}
        />
      </View>
      <View className="min-w-0 flex-1">
        <View className="flex-row flex-wrap items-center gap-1">
          <Text className={`text-[10px] font-semibold ${titleColor}`}>{category.title}</Text>
          {category.count ? (
            <View className="rounded-full bg-primary-soft px-1.5 py-0.5">
              <Text className="text-[8px] font-medium text-primary">{category.count}</Text>
            </View>
          ) : (
            <View className="rounded-full bg-danger-soft px-1.5 py-0.5">
              <Text className="text-[8px] font-medium text-danger">해지 완료</Text>
            </View>
          )}
        </View>
        <Text className={`mt-0.5 text-[9px] leading-[13px] ${detailColor}`} numberOfLines={2}>
          {category.detail}
        </Text>
      </View>
      <View className="w-[58px] shrink-0 items-end">
        <Text className={`text-[13px] font-bold ${amountColor}`}>{category.amount}</Text>
        {category.share ? (
          <Text className="mt-0.5 text-[9px] font-medium text-muted">{category.share}</Text>
        ) : (
          <Text className="mt-0.5 text-right text-[8px] font-semibold leading-[10px] text-success">
            {category.savings}
          </Text>
        )}
      </View>
    </View>
  );
}

export default function CategorySpendingCard() {
  return (
    <View className="w-[90%] max-w-[480px] self-center rounded-[16px] border border-border bg-surface p-3">
      <CategoryHeader />
      <SpendingDistribution />
      <View className="mt-3 gap-2">
        {CATEGORIES.map(category => (
          <CategoryRow key={category.title} category={category} />
        ))}
      </View>
    </View>
  );
}