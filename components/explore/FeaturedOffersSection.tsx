import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";

type FeaturedOffersSectionProps = {
  onSelectCategory?: (category: string) => void;
  onViewBenefits?: () => void;
};

const CATEGORIES = [
  { label: "실시간 인기", icon: "flame" as const },
  { label: "전체" },
  { label: "OTT/영상", icon: "film" as const },
  { label: "음악/오디오", icon: "musical-notes" as const },
  { label: "생활/멤버십", icon: "gift-outline" as const },
];

function DealCategoryFilters({ onSelectCategory }: FeaturedOffersSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("실시간 인기");

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ alignItems: "center", gap: 6, paddingHorizontal: 12 }}
      className="w-full"
    >
      {CATEGORIES.map(category => {
        const selected = selectedCategory === category.label;

        return (
          <Pressable
            key={category.label}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={() => {
              setSelectedCategory(category.label);
              onSelectCategory?.(category.label);
            }}
            className={`h-7 shrink-0 flex-row items-center gap-1 rounded-full px-3 ${selected ? "bg-[#684CE1]" : "border border-[#E9EAF2] bg-white"}`}
          >
            {category.icon && (
              <Ionicons
                name={category.icon}
                size={12}
                color={selected ? "#FFFFFF" : "#555D73"}
              />
            )}
            <Text
              className={`text-[10px] font-medium ${selected ? "text-white" : "text-[#30364B]"}`}
            >
              {category.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

function PromotionBackdrop() {
  return (
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 400 210"
      preserveAspectRatio="none"
      style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0, zIndex: 0 }}
      pointerEvents="none"
    >
      <Defs>
        <LinearGradient id="featuredOfferGradient" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#6547C2" />
          <Stop offset="1" stopColor="#5147D4" />
        </LinearGradient>
      </Defs>
      <Rect width="400" height="210" rx="20" fill="url(#featuredOfferGradient)" />
    </Svg>
  );
}

function FeaturedPromotionCard({ onViewBenefits }: Pick<FeaturedOffersSectionProps, "onViewBenefits">) {
  return (
    <View className="relative min-h-[132px] w-[94%] max-w-[480px] self-center overflow-hidden rounded-[16px] p-3.5">
      <PromotionBackdrop />
      <View className="relative z-10 w-[84%]" style={{ zIndex: 1 }}>
        <View className="self-start rounded-full bg-[#FFFFFF]/20 px-2 py-1">
          <Text className="text-[9px] font-semibold text-[#BFEDE4]">기간 한정 특가</Text>
        </View>
        <Text className="mt-2 text-[14px] font-bold leading-[19px] text-white">
          쥐도 새도 모르게 챙기는 제휴 할인 혜택 🏠
        </Text>
        <Text className="mt-1 text-[10px] leading-[14px] text-white/80">
          통신사·카드사 제휴로 최대 50% 반값 구독 모아보기
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={onViewBenefits}
          className="mt-2.5 self-start flex-row items-center gap-1 rounded-full bg-white/20 px-2.5 py-1.5 active:opacity-80"
        >
          <Text className="text-[10px] font-semibold text-white">혜택 확인하고 반값 받기</Text>
          <Ionicons name="arrow-forward" size={12} color="#FFFFFF" />
        </Pressable>
      </View>
      <Ionicons
        name="gift-outline"
        size={52}
        color="#FFFFFF"
        style={{ position: "absolute", top: 14, right: 14, opacity: 0.2 }}
      />
    </View>
  );
}

export default function FeaturedOffersSection({
  onSelectCategory,
  onViewBenefits,
}: FeaturedOffersSectionProps) {
  return (
    <View className="w-full gap-3">
      <DealCategoryFilters onSelectCategory={onSelectCategory} />
      <FeaturedPromotionCard onViewBenefits={onViewBenefits} />
    </View>
  );
}