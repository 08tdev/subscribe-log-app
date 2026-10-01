import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, View } from "react-native";

type ExploreCategoryChipsProps = {
  onSelectCategory?: (category: string) => void;
};

const CATEGORIES = ["디즈니플러스", "쿠팡와우", "스포티파이", "넷플릭스", "유튜브 프리미엄"];

export default function ExploreCategoryChips({ onSelectCategory }: ExploreCategoryChipsProps) {
  return (
    <View className="w-full max-w-[512px] self-center flex-row items-center">
      <View className="ml-3 mr-2 shrink-0 flex-row items-center gap-1">
        <Ionicons name="trending-up" size={13} color="#6553E8" />
        <Text className="text-[10px] font-semibold text-[#454A61]">인기</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: "center", gap: 6, paddingRight: 12 }}
        className="min-w-0 flex-1"
      >
        {CATEGORIES.map(category => (
          <Pressable
            key={category}
            accessibilityRole="button"
            accessibilityLabel={`${category} 카테고리`}
            onPress={() => onSelectCategory?.(category)}
            className="shrink-0 rounded-full border border-[#E9EAF2] bg-[#F5F6FA] px-2.5 py-1"
          >
            <Text className="text-[10px] font-medium text-[#30364B]">#{category}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}