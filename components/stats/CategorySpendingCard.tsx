import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

type CategorySpending = {
  title: string;
  count?: string;
  detail: string;
  amount: string;
  share?: string;
  icon: "play-circle-outline" | "bulb-outline" | "bag-handle-outline";
  iconColor: string;
  iconBackground: string;
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
    iconColor: "#6553E8",
    iconBackground: "#E5E2FF",
  },
  {
    title: "생산성 / AI 도구",
    count: "1건",
    detail: "ChatGPT Plus (OpenAI)",
    amount: "₩29,000",
    share: "47.6%",
    icon: "bulb-outline",
    iconColor: "#078E7A",
    iconBackground: "#BDF7E9",
  },
  {
    title: "쇼핑 / 멤버십",
    detail: "쿠팡 로켓와우 (3월 해지됨)",
    amount: "₩0",
    icon: "bag-handle-outline",
    iconColor: "#9BA2B3",
    iconBackground: "#F0F2F8",
    inactive: true,
    savings: "₩7,890 절약!",
  },
];

function CategoryHeader() {
  return (
    <View className="flex-row items-center justify-between gap-2">
      <View className="min-w-0">
        <Text className="text-[14px] font-bold text-[#20243A]">카테고리별 지출</Text>
        <Text className="mt-0.5 text-[9px] text-[#65708A]">
          가장 많은 지출은 콘텐츠/엔터테인먼트
        </Text>
      </View>
      <Text className="shrink-0 text-[9px] font-semibold text-[#59627B]">총 2개 분야</Text>
    </View>
  );
}

function SpendingDistribution() {
  return (
    <View className="mt-2.5">
      <View className="h-2 overflow-hidden rounded-full bg-[#E3F7F0]">
        <View className="h-full flex-row">
          <View className="h-full bg-[#5546D8]" style={{ width: "52.4%" }} />
          <View className="h-full flex-1 bg-[#078E7A]" />
        </View>
      </View>
      <View className="mt-1.5 flex-row flex-wrap items-center justify-between gap-x-2 gap-y-1">
        <View className="flex-row items-center gap-1">
          <View className="h-1.5 w-1.5 rounded-full bg-[#5546D8]" />
          <Text className="text-[9px] text-[#30364B]">엔터/OTT (52.4%)</Text>
        </View>
        <View className="flex-row items-center gap-1">
          <View className="h-1.5 w-1.5 rounded-full bg-[#078E7A]" />
          <Text className="text-[9px] text-[#30364B]">생산성/AI (47.6%)</Text>
        </View>
      </View>
    </View>
  );
}

function CategoryRow({ category }: { category: CategorySpending }) {
  const titleColor = category.inactive ? "text-[#777E90]" : "text-[#252B40]";
  const detailColor = category.inactive ? "text-[#9BA1B0]" : "text-[#59627B]";
  const amountColor = category.inactive ? "text-[#168C78]" : "text-[#20243A]";

  return (
    <View
      className={`min-h-[64px] flex-row items-center gap-2.5 rounded-[12px] px-2.5 py-2 ${category.inactive ? "bg-[#F7F8FC]" : "bg-[#F0F2FF]"}`}
    >
      <View
        className="h-8 w-8 shrink-0 items-center justify-center rounded-[10px]"
        style={{ backgroundColor: category.iconBackground }}
      >
        <Ionicons name={category.icon} size={17} color={category.iconColor} />
      </View>
      <View className="min-w-0 flex-1">
        <View className="flex-row flex-wrap items-center gap-1">
          <Text className={`text-[10px] font-semibold ${titleColor}`}>{category.title}</Text>
          {category.count ? (
            <View className="rounded-full bg-[#E5E2FF] px-1.5 py-0.5">
              <Text className="text-[8px] font-medium text-[#5546D8]">{category.count}</Text>
            </View>
          ) : (
            <View className="rounded-full bg-[#FFE5E7] px-1.5 py-0.5">
              <Text className="text-[8px] font-medium text-[#D84D59]">해지 완료</Text>
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
          <Text className="mt-0.5 text-[9px] font-medium text-[#65708A]">{category.share}</Text>
        ) : (
          <Text className="mt-0.5 text-right text-[8px] font-semibold leading-[10px] text-[#168C78]">
            {category.savings}
          </Text>
        )}
      </View>
    </View>
  );
}

export default function CategorySpendingCard() {
  return (
    <View className="w-[90%] max-w-[480px] self-center rounded-[16px] border border-[#EEF0F8] bg-white p-3">
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