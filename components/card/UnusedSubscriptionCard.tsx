import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

type UnusedSubscriptionCardProps = {
  subscriptionName?: string;
  unusedDays?: number;
  monthlySavings?: string;
  onRemindLater?: () => void;
  onOpenCancellationGuide?: () => void;
};

type UnusedSubscriptionHeaderProps = {
  subscriptionName: string;
  unusedDays: number;
};

function UnusedSubscriptionHeader({ subscriptionName, unusedDays }: UnusedSubscriptionHeaderProps) {
  return (
    <View className="flex-row items-center gap-2.5">
      <View className="h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFE4E5]">
        <Ionicons name="sad-outline" size={17} color="#E84550" />
      </View>
      <View className="min-w-0 flex-1">
        <Text className="text-[12px] font-bold text-[#A92F3A]">잠자는 구독 발견!</Text>
        <Text
          className="text-[11px] leading-[15px] text-[#C0444C]"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {subscriptionName} (최근 {unusedDays}일 미이용)
        </Text>
      </View>
      <View className="max-w-[48px] shrink-0 rounded-md bg-white/80 px-1.5 py-1">
        <Text className="text-center text-[9px] font-semibold leading-[11px] text-[#D34B52]">
          지출 추정
        </Text>
      </View>
    </View>
  );
}

function MonthlySavings({ amount }: { amount: string }) {
  return (
    <View className="flex-row items-center justify-between rounded-[12px] bg-white px-3 py-2.5">
      <Text className="text-[11px] font-medium text-[#55566A]">지금 해지 시 다음 달 절약</Text>
      <Text className="shrink-0 text-[14px] font-bold text-[#D92F3A]">+{amount}/월</Text>
    </View>
  );
}

type SuggestionActionsProps = {
  onRemindLater?: () => void;
  onOpenCancellationGuide?: () => void;
};

function SuggestionActions({ onRemindLater, onOpenCancellationGuide }: SuggestionActionsProps) {
  return (
    <View className="flex-row gap-2">
      <Pressable
        accessibilityRole="button"
        onPress={onRemindLater}
        className="h-[34px] flex-1 items-center justify-center rounded-full bg-white active:opacity-70"
      >
        <Text className="text-[11px] font-semibold text-[#585B70]">다음에 보기</Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        onPress={onOpenCancellationGuide}
        className="h-[34px] flex-1 items-center justify-center rounded-full bg-[#FF595F] active:opacity-80"
      >
        <Text className="text-[11px] font-semibold text-white">해지 가이드 확인</Text>
      </Pressable>
    </View>
  );
}

export default function UnusedSubscriptionCard({
  subscriptionName = "쿠팡 와우 멤버십",
  unusedDays = 30,
  monthlySavings = "₩7,890",
  onRemindLater,
  onOpenCancellationGuide,
}: UnusedSubscriptionCardProps) {
  return (
    <View className="w-[90%] self-center gap-2 rounded-[18px] border border-[#FFE7E8] bg-[#FFF6F6] p-3">
      <UnusedSubscriptionHeader subscriptionName={subscriptionName} unusedDays={unusedDays} />
      <MonthlySavings amount={monthlySavings} />
      <SuggestionActions
        onRemindLater={onRemindLater}
        onOpenCancellationGuide={onOpenCancellationGuide}
      />
    </View>
  );
}
