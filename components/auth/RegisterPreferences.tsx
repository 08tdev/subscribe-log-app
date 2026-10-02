import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useThemeColors } from "@/constants/theme";
import { RegistrationPreferences } from "@/types/user";

type RegisterPreferencesProps = {
  value: RegistrationPreferences;
  error?: string;
  onChange: (preferences: RegistrationPreferences) => void;
};

const CATEGORIES = [
  { id: "ott", title: "영상 · OTT", icon: "film-outline", examples: "넷플릭스, 티빙, 디즈니+" },
  {
    id: "music",
    title: "음악 · 오디오",
    icon: "musical-notes-outline",
    examples: "Spotify, 멜론, 오디오북",
  },
  {
    id: "shopping",
    title: "쇼핑 · 멤버십",
    icon: "cart-outline",
    examples: "쿠팡 와우, 네이버플러스",
  },
  { id: "ai", title: "AI · 생산성", icon: "sparkles-outline", examples: "ChatGPT, Notion, Claude" },
  {
    id: "gaming",
    title: "게임 · 콘솔",
    icon: "game-controller-outline",
    examples: "PlayStation, Steam, Xbox",
  },
  { id: "food", title: "푸드 · 배달", icon: "fast-food-outline", examples: "배달의민족, 요기요" },
  {
    id: "travel",
    title: "여행 · 항공",
    icon: "airplane-outline",
    examples: "항공 멤버십, 여행 패스",
  },
  {
    id: "fitness",
    title: "피트니스 · 헬스",
    icon: "barbell-outline",
    examples: "운동 앱, 건강 구독",
  },
] as const;

const SUBSCRIPTIONS = [
  "넷플릭스",
  "유튜브 프리미엄",
  "스포티파이",
  "쿠팡 와우 멤버십",
  "ChatGPT Plus",
  "티빙",
  "디즈니+",
  "네이버플러스",
];

const SPENDING_RANGES = [
  "1만원 미만",
  "1~3만원",
  "3~5만원",
  "5~10만원",
  "10만원 이상",
  "잘 모르겠어요",
];

const CATEGORY_ICONS = [
  "#E85767",
  "#5546D8",
  "#078E7A",
  "#B77819",
  "#5546D8",
  "#D84D59",
  "#078E7A",
  "#B77819",
];

function SectionHeading({ title, trailing }: { title: string; trailing?: string }) {
  return (
    <View className="mb-1.5 flex-row items-center justify-between">
      <Text className="text-[9px] font-bold text-foreground">{title}</Text>
      {!!trailing && <Text className="text-[7px] font-medium text-primary">{trailing}</Text>}
    </View>
  );
}

export default function RegisterPreferences({ value, error, onChange }: RegisterPreferencesProps) {
  const colors = useThemeColors();

  const toggleValue = (key: "categoryIds" | "subscriptionNames", item: string) => {
    const current = value[key];
    onChange({
      ...value,
      [key]: current.includes(item) ? current.filter(entry => entry !== item) : [...current, item],
    });
  };

  return (
    <View>
      <View className="mb-3 flex-row items-start gap-2 rounded-[10px] bg-primary-soft px-2.5 py-2">
        <View className="h-7 w-7 items-center justify-center rounded-[8px] bg-surface">
          <Ionicons name="sparkles" size={14} color={colors.primary} />
        </View>
        <Text className="min-w-0 flex-1 text-[8px] leading-[12px] text-foreground">
          선택한 구독 분야에 맞춰 혜택과 절약 정보를 알려드릴게요. 관심 있는 항목을 골라주세요.
        </Text>
      </View>

      <SectionHeading title="구독 카테고리 선택" trailing={`${value.categoryIds.length}개 선택`} />
      <View className="mb-3 flex-row flex-wrap justify-between gap-y-1.5">
        {CATEGORIES.map((category, index) => {
          const selected = value.categoryIds.includes(category.id);
          return (
            <Pressable
              key={category.id}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: selected }}
              onPress={() => toggleValue("categoryIds", category.id)}
              className="min-h-[54px] w-[49%] flex-row items-start gap-1.5 rounded-[9px] border px-2 py-1.5 active:opacity-75"
              style={{
                backgroundColor: selected ? colors.primarySoft : colors.surface,
                borderColor: selected ? colors.primary : colors.border,
              }}
            >
              <Ionicons
                name={category.icon}
                size={14}
                color={CATEGORY_ICONS[index]}
                style={{ marginTop: 1 }}
              />
              <View className="min-w-0 flex-1">
                <Text className="text-[8px] font-semibold leading-[11px] text-foreground">
                  {category.title}
                </Text>
                <Text className="mt-0.5 text-[6px] leading-[9px] text-muted" numberOfLines={1}>
                  {category.examples}
                </Text>
              </View>
              <Ionicons
                name={selected ? "checkmark-circle" : "add-circle-outline"}
                size={12}
                color={selected ? colors.primary : colors.subtle}
              />
            </Pressable>
          );
        })}
      </View>

      <View className="mb-3">
        <SectionHeading title="현재 이용 중인 구독" trailing="선택 사항" />
        <View className="flex-row flex-wrap gap-1.5">
          {SUBSCRIPTIONS.map(subscription => {
            const selected = value.subscriptionNames.includes(subscription);
            return (
              <Pressable
                key={subscription}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: selected }}
                onPress={() => toggleValue("subscriptionNames", subscription)}
                className={`min-h-6 flex-row items-center gap-1 rounded-full border px-2 ${selected ? "border-primary bg-primary" : "border-border bg-surface"}`}
              >
                <Ionicons
                  name={selected ? "checkmark" : "add"}
                  size={9}
                  color={selected ? colors.primaryForeground : colors.muted}
                />
                <Text
                  className={`text-[7px] font-medium ${selected ? "text-primary-foreground" : "text-foreground"}`}
                >
                  {subscription}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View>
        <SectionHeading title="월간 총 구독 지출 규모" trailing="대략적으로 선택해 주세요" />
        <View className="flex-row flex-wrap justify-between gap-y-1.5">
          {SPENDING_RANGES.map(range => {
            const selected = value.monthlySpendRange === range;
            return (
              <Pressable
                key={range}
                accessibilityRole="radio"
                accessibilityState={{ selected }}
                onPress={() => onChange({ ...value, monthlySpendRange: range })}
                className={`h-7 w-[32%] items-center justify-center rounded-[7px] border ${selected ? "border-primary bg-primary" : "border-border bg-surface"}`}
              >
                <Text
                  className={`text-[7px] font-semibold ${selected ? "text-primary-foreground" : "text-foreground"}`}
                >
                  {range}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View className="mt-3 flex-row items-start gap-1.5 rounded-[9px] bg-primary-soft px-2.5 py-2">
        <Ionicons name="shield-checkmark-outline" size={11} color={colors.primary} />
        <Text className="min-w-0 flex-1 text-[7px] leading-[10px] text-muted">
          관심 정보는 맞춤 혜택 추천에만 사용하며, 언제든 설정에서 변경할 수 있어요.
        </Text>
      </View>
      {!!error && <Text className="mt-1.5 text-[8px] text-danger">{error}</Text>}
    </View>
  );
}
