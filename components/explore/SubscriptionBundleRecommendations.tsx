import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useThemeColors } from "@/constants/theme";

type SubscriptionBundleRecommendationsProps = {
  onSelectBundle?: (bundle: string) => void;
  onBrowseTrials?: () => void;
  onSearchServices?: () => void;
};

type BundleOffer = {
  id: string;
  tag: string;
  hint: string;
  title: string;
  description: string;
  marks: { label: string; background: string; color: string }[];
  footer: string;
  savings?: string;
  theme: "purple" | "mint";
};

const BUNDLES: BundleOffer[] = [
  {
    id: "ott-savings",
    tag: "OTT 정복자 팩",
    hint: "카드 청구할인 팁",
    title: "넷플릭스 + 유튜브 프리미엄",
    description: "주말 정주행과 일상 영상 시청의 완벽한 밸런스",
    marks: [
      { label: "N", background: "#111111", color: "#FFFFFF" },
      { label: "YT", background: "#FF1717", color: "#FFFFFF" },
    ],
    footer: "삼성 iD 달달한 카드 이용 시",
    savings: "월 2,000원 추가 할인",
    theme: "purple",
  },
  {
    id: "smart-work",
    tag: "스마트 일잘러 팩",
    hint: "생산성 200%",
    title: "ChatGPT Plus + 노션(Notion)",
    description: "기획서부터 지식 데이터베이스 아카이빙까지",
    marks: [
      { label: "AI", background: "#0EAA8C", color: "#FFFFFF" },
      { label: "N", background: "#30363B", color: "#FFFFFF" },
    ],
    footer: "학생/취준생 인증 시 노션 무료",
    savings: "연 12만원 절약",
    theme: "mint",
  },
];

function BundleServiceMarks({ marks }: { marks: BundleOffer["marks"] }) {
  return (
    <View className="w-[48px] shrink-0 flex-row items-center">
      {marks.map((mark, index) => (
        <View
          key={mark.label}
          className={`h-8 w-8 items-center justify-center rounded-[10px] border-2 border-white ${index > 0 ? "-ml-1" : ""}`}
          style={{ backgroundColor: mark.background }}
        >
          <Text className="text-[10px] font-bold" style={{ color: mark.color }}>
            {mark.label}
          </Text>
        </View>
      ))}
    </View>
  );
}

function BundleCard({
  offer,
  onSelect,
}: {
  offer: BundleOffer;
  onSelect?: (bundle: string) => void;
}) {
  const themeColors = useThemeColors();
  const theme =
    offer.theme === "purple"
      ? {
          tag: "bg-primary-soft text-primary",
          hint: "text-danger",
          footer: "bg-primary-soft",
          savings: "text-primary",
        }
      : {
          tag: "bg-success-soft text-success",
          hint: "text-primary",
          footer: "bg-success-soft",
          savings: "text-success",
        };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${offer.title} 추천 번들`}
      onPress={() => onSelect?.(offer.id)}
      className="rounded-[14px] border border-border bg-surface p-3 active:opacity-80"
    >
      <View className="mb-2 flex-row items-center justify-between gap-2">
        <Text className={`rounded-full px-2 py-1 text-[9px] font-semibold ${theme.tag}`}>
          {offer.tag}
        </Text>
        <View className="min-w-0 flex-row items-center gap-1">
          {offer.theme === "purple" ? (
            <Ionicons name="pricetag-outline" size={11} color={themeColors.danger} />
          ) : (
            <Ionicons name="sparkles" size={11} color={themeColors.primary} />
          )}
          <Text className={`text-[9px] font-semibold ${theme.hint}`} numberOfLines={1}>
            {offer.hint}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center gap-2.5">
        <BundleServiceMarks marks={offer.marks} />
        <View className="min-w-0 flex-1">
          <Text className="text-[11px] font-bold text-foreground" numberOfLines={1}>
            {offer.title}
          </Text>
          <Text className="mt-0.5 text-[9px] leading-[13px] text-muted" numberOfLines={2}>
            {offer.description}
          </Text>
        </View>
      </View>
      <View className={`mt-2.5 min-h-[30px] flex-row flex-wrap items-center justify-between gap-x-2 gap-y-1 rounded-[10px] px-2.5 py-1.5 ${theme.footer}`}>
        <Text className="min-w-0 flex-1 text-[9px] text-muted">{offer.footer}</Text>
        {offer.savings && (
          <Text className={`shrink-0 text-[9px] font-bold ${theme.savings}`}>{offer.savings}</Text>
        )}
      </View>
    </Pressable>
  );
}

function TrialServicesCard({ onPress }: { onPress?: () => void }) {
  const themeColors = useThemeColors();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className="min-h-[76px] flex-row items-center gap-2.5 rounded-[14px] bg-primary-soft px-3 py-2.5 active:opacity-80"
    >
      <View className="h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-primary">
        <Ionicons name="gift-outline" size={18} color={themeColors.primaryForeground} />
      </View>
      <View className="min-w-0 flex-1">
        <Text className="text-[9px] font-semibold text-danger">놓치면 아까운 0원 혜택</Text>
        <Text className="mt-0.5 text-[11px] font-bold leading-[15px] text-foreground">
          첫 달 0원 무료 체험 서비스 모음 (6개)
        </Text>
        <Text className="mt-0.5 text-[9px] leading-[13px] text-muted" numberOfLines={2}>
          밀리의 서재, 왓챠, 티빙 외 한정 프로모션 진행 중
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={15} color={themeColors.muted} />
    </Pressable>
  );
}

export default function SubscriptionBundleRecommendations({
  onSelectBundle,
  onBrowseTrials,
  onSearchServices,
}: SubscriptionBundleRecommendationsProps) {
  const themeColors = useThemeColors();

  return (
    <View className="w-[94%] max-w-[480px] self-center gap-2.5">
      <View className="flex-row items-center gap-1.5">
        <Text className="text-[15px] font-bold text-foreground">알뜰하게 묶어쓰는 추천 번들</Text>
        <Ionicons name="bulb" size={15} color={themeColors.warning} />
      </View>
      <View className="gap-2">
        {BUNDLES.map(offer => (
          <BundleCard key={offer.id} offer={offer} onSelect={onSelectBundle} />
        ))}
      </View>
      <TrialServicesCard onPress={onBrowseTrials} />
      <Pressable
        accessibilityRole="button"
        onPress={onSearchServices}
        className="self-center flex-row items-center gap-1 rounded-full bg-primary-soft px-3 py-1.5 active:opacity-70"
      >
        <Ionicons name="search" size={10} color={themeColors.primary} />
        <Text className="text-[9px] text-muted">찾는 구독이 없나요?</Text>
        <Text className="text-[9px] font-medium text-primary">직접 서비스 검색하기</Text>
      </Pressable>
    </View>
  );
}