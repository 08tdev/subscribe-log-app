import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useThemeColors } from "@/constants/theme";

type ServiceIcon =
  "netflix" | "youtube" | "coupang" | "spotify" | "chatgpt" | "disney" | "tving" | "naver";

type Plan = {
  id: string;
  name: string;
  detail: string;
  monthlyAmount: string;
};

type Service = {
  id: string;
  name: string;
  category: string;
  icon: ServiceIcon;
  plans: Plan[];
};

export type SubscriptionSelection = {
  serviceId: string;
  serviceName: string;
  category: string;
  planId: string;
  planName: string;
  planDetail: string;
  monthlyAmount: string;
};

const SERVICES: Service[] = [
  {
    id: "netflix",
    name: "넷플릭스",
    category: "영상 / OTT",
    icon: "netflix",
    plans: [
      { id: "premium", name: "프리미엄", detail: "4K+HDR, 동시 4명", monthlyAmount: "17000" },
      { id: "standard", name: "스탠다드", detail: "Full HD, 동시 2명", monthlyAmount: "13500" },
      {
        id: "ad-standard",
        name: "광고형 스탠다드",
        detail: "Full HD, 광고 포함",
        monthlyAmount: "5500",
      },
    ],
  },
  {
    id: "youtube-premium",
    name: "유튜브 프리미엄",
    category: "음악 / 영상",
    icon: "youtube",
    plans: [
      {
        id: "individual",
        name: "개인 멤버십",
        detail: "광고 없이 영상 감상",
        monthlyAmount: "14900",
      },
    ],
  },
  {
    id: "coupang-wow",
    name: "쿠팡 와우",
    category: "쇼핑 / 멤버십",
    icon: "coupang",
    plans: [
      { id: "wow", name: "와우 멤버십", detail: "무료 배송 및 쿠팡플레이", monthlyAmount: "7890" },
    ],
  },
  {
    id: "spotify",
    name: "스포티파이",
    category: "음악 / 오디오",
    icon: "spotify",
    plans: [
      {
        id: "premium-individual",
        name: "프리미엄 개인",
        detail: "광고 없는 음악 감상",
        monthlyAmount: "10900",
      },
    ],
  },
  {
    id: "chatgpt-plus",
    name: "ChatGPT Plus",
    category: "AI / 생산성",
    icon: "chatgpt",
    plans: [{ id: "plus", name: "Plus", detail: "고급 모델 및 도구 이용", monthlyAmount: "29000" }],
  },
  {
    id: "disney-plus",
    name: "디즈니+",
    category: "영상 / OTT",
    icon: "disney",
    plans: [
      { id: "standard", name: "스탠다드", detail: "Full HD, 동시 2명", monthlyAmount: "9900" },
    ],
  },
  {
    id: "tving",
    name: "티빙",
    category: "영상 / OTT",
    icon: "tving",
    plans: [
      { id: "standard", name: "스탠다드", detail: "Full HD, 동시 2명", monthlyAmount: "10900" },
    ],
  },
  {
    id: "naver-plus",
    name: "네이버플러스",
    category: "쇼핑 / 멤버십",
    icon: "naver",
    plans: [
      {
        id: "membership",
        name: "멤버십",
        detail: "쇼핑 적립 및 디지털 혜택",
        monthlyAmount: "4900",
      },
    ],
  },
];

function ServiceMark({ icon, compact = false }: { icon: ServiceIcon; compact?: boolean }) {
  const colors = useThemeColors();
  const size = compact ? "h-7 w-7 rounded-[8px]" : "h-10 w-10 rounded-[11px]";
  const iconSize = compact ? 15 : 19;

  if (icon === "netflix") {
    return (
      <View className={`${size} shrink-0 items-center justify-center bg-[#171B2A]`}>
        <Text
          className={
            compact
              ? "text-[14px] font-extrabold text-[#E50914]"
              : "text-[19px] font-extrabold text-[#E50914]"
          }
        >
          N
        </Text>
      </View>
    );
  }

  if (icon === "disney") {
    return (
      <View className={`${size} shrink-0 items-center justify-center bg-[#101329]`}>
        <Text
          className={
            compact ? "text-[9px] font-bold text-[#83A7FF]" : "text-[12px] font-bold text-[#83A7FF]"
          }
        >
          D+
        </Text>
      </View>
    );
  }

  const marks: Record<
    Exclude<ServiceIcon, "netflix" | "disney">,
    { icon: keyof typeof Ionicons.glyphMap; color: string; background: string }
  > = {
    youtube: { icon: "logo-youtube", color: "#FF0000", background: "#FFE5E6" },
    coupang: { icon: "bag-handle-outline", color: colors.primary, background: colors.primarySoft },
    spotify: { icon: "musical-notes", color: "#18A75B", background: "#DFF7E8" },
    chatgpt: { icon: "sparkles", color: colors.success, background: colors.successSoft },
    tving: { icon: "play", color: "#FF3158", background: "#FFE7EC" },
    naver: { icon: "bag-outline", color: "#03C75A", background: "#E2F8EC" },
  };
  const mark = marks[icon];

  return (
    <View
      className={`${size} shrink-0 items-center justify-center`}
      style={{ backgroundColor: mark.background }}
    >
      <Ionicons name={mark.icon} size={iconSize} color={mark.color} />
    </View>
  );
}

function createSelection(service: Service, plan: Plan): SubscriptionSelection {
  return {
    serviceId: service.id,
    serviceName: service.name,
    category: service.category,
    planId: plan.id,
    planName: plan.name,
    planDetail: plan.detail,
    monthlyAmount: plan.monthlyAmount,
  };
}

export const INITIAL_SUBSCRIPTION_SELECTION = createSelection(SERVICES[0], SERVICES[0].plans[0]);

type SubscriptionPickerProps = {
  value: SubscriptionSelection;
  onChange: (selection: SubscriptionSelection) => void;
};

export default function SubscriptionPicker({ value, onChange }: SubscriptionPickerProps) {
  const colors = useThemeColors();
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [plansOpen, setPlansOpen] = useState(false);
  const selectedService = SERVICES.find(service => service.id === value.serviceId) ?? SERVICES[0];
  const matchingServices = SERVICES.filter(service =>
    service.name.toLowerCase().includes(query.trim().toLowerCase()),
  );
  const visibleServices = showAll || query ? matchingServices : SERVICES.slice(0, 6);
  const selectedPlan =
    selectedService.plans.find(plan => plan.id === value.planId) ?? selectedService.plans[0];

  const selectService = (service: Service) => {
    onChange(createSelection(service, service.plans[0]));
    setPlansOpen(false);
  };

  return (
    <View className="w-full max-w-[520px] self-center">
      <View className="min-h-11 flex-row items-center gap-2 rounded-[12px] border border-border bg-surface px-3">
        <Ionicons name="search" size={16} color={colors.muted} />
        <TextInput
          accessibilityLabel="구독 서비스 검색"
          autoCapitalize="none"
          onChangeText={setQuery}
          placeholder="넷플릭스"
          placeholderTextColor={colors.subtle}
          returnKeyType="search"
          className="min-w-0 flex-1 py-2 text-[11px] text-foreground"
          value={query}
        />
        {!!query && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="검색어 지우기"
            hitSlop={8}
            onPress={() => setQuery("")}
            className="h-8 w-8 items-center justify-center"
          >
            <Ionicons name="close-circle" size={16} color={colors.subtle} />
          </Pressable>
        )}
        <Pressable
          accessibilityRole="button"
          onPress={() => Alert.alert("영수증 등록", "영수증 인식 기능은 준비 중입니다.")}
          className="min-h-9 flex-row items-center gap-1 rounded-[8px] bg-primary-soft px-2"
        >
          <Ionicons name="receipt-outline" size={12} color={colors.primary} />
          <Text className="text-[8px] font-semibold text-primary">영수증</Text>
        </Pressable>
      </View>

      <View className="mb-1.5 mt-4 flex-row items-center justify-between gap-2">
        <Text className="text-[9px] font-bold text-foreground">
          {query ? "검색 결과" : "인기 구독 서비스 TOP 6"}
        </Text>
        {!query && (
          <Pressable
            accessibilityRole="button"
            onPress={() => setShowAll(value => !value)}
            className="min-h-8 flex-row items-center gap-0.5 px-1"
          >
            <Text className="text-[8px] font-medium text-muted">
              {showAll ? "접기" : "서비스 더보기"}
            </Text>
            <Ionicons
              name={showAll ? "chevron-up" : "chevron-forward"}
              size={10}
              color={colors.muted}
            />
          </Pressable>
        )}
      </View>

      {visibleServices.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 7, paddingBottom: 2 }}
        >
          {visibleServices.map(service => {
            const selected = value.serviceId === service.id;
            return (
              <Pressable
                key={service.id}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                onPress={() => selectService(service)}
                className={`min-h-10 flex-row items-center gap-1.5 rounded-[10px] border px-2.5 ${selected ? "border-primary bg-primary" : "border-border bg-surface"}`}
              >
                <ServiceMark icon={service.icon} compact />
                <Text
                  className={`text-[8px] font-semibold ${selected ? "text-primary-foreground" : "text-foreground"}`}
                >
                  {service.name}
                </Text>
                {selected && (
                  <Ionicons name="checkmark-circle" size={11} color={colors.primaryForeground} />
                )}
              </Pressable>
            );
          })}
        </ScrollView>
      ) : (
        <Text className="py-3 text-center text-[9px] text-muted">검색된 서비스가 없습니다.</Text>
      )}

      <View className="mt-3 rounded-[14px] border border-border bg-surface p-2.5">
        <View className="flex-row items-center gap-2">
          <ServiceMark icon={selectedService.icon} />
          <View className="min-w-0 flex-1">
            <View className="flex-row flex-wrap items-center gap-1">
              <Text className="text-[11px] font-bold text-foreground">{selectedService.name}</Text>
              <Text className="rounded-full bg-primary-soft px-1.5 py-0.5 text-[7px] font-semibold text-primary">
                {selectedService.category}
              </Text>
              {selectedService.id === "netflix" && (
                <Text className="rounded-full bg-warning-soft px-1.5 py-0.5 text-[7px] font-semibold text-warning">
                  인기
                </Text>
              )}
            </View>
            <Text className="mt-0.5 text-[8px] text-muted">{selectedService.name} 공식 구독</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={() => {
              setQuery("");
              setShowAll(true);
            }}
            className="min-h-9 flex-row items-center gap-1 rounded-full bg-primary-soft px-2.5"
          >
            <Ionicons name="create-outline" size={11} color={colors.primary} />
            <Text className="text-[8px] font-semibold text-primary">변경</Text>
          </Pressable>
        </View>

        <View className="mt-2 rounded-[10px] bg-primary-soft px-2.5 py-1.5">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`선택된 요금제 ${selectedPlan.name}, 변경`}
            accessibilityState={{ expanded: plansOpen }}
            onPress={() => setPlansOpen(open => !open)}
            className="min-h-9 flex-row items-center gap-2"
          >
            <Ionicons name="layers-outline" size={13} color={colors.primary} />
            <View className="min-w-0 flex-1">
              <Text className="text-[7px] text-muted">선택된 요금제</Text>
              <Text className="text-[9px] font-semibold text-foreground">
                {selectedPlan.name} ({selectedPlan.detail})
              </Text>
            </View>
            <Ionicons
              name={plansOpen ? "chevron-up" : "chevron-down"}
              size={13}
              color={colors.primary}
            />
          </Pressable>
          {plansOpen && selectedService.plans.length > 1 && (
            <View className="mt-1 border-t border-border pt-1">
              {selectedService.plans.map(plan => (
                <Pressable
                  key={plan.id}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: plan.id === selectedPlan.id }}
                  onPress={() => {
                    onChange(createSelection(selectedService, plan));
                    setPlansOpen(false);
                  }}
                  className="min-h-9 flex-row items-center justify-between gap-2 py-1"
                >
                  <View className="min-w-0 flex-1">
                    <Text className="text-[8px] font-semibold text-foreground">{plan.name}</Text>
                    <Text className="text-[7px] text-muted">{plan.detail}</Text>
                  </View>
                  <Text className="shrink-0 text-[8px] font-semibold text-primary">
                    ₩{Number(plan.monthlyAmount).toLocaleString()}/월
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
