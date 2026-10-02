import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useThemeColors } from "@/constants/theme";

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
  const themeColors = useThemeColors();

  return (
    <View className="flex-row items-center gap-2.5">
      <View className="h-8 w-8 shrink-0 items-center justify-center rounded-full bg-danger-soft">
        <Ionicons name="sad-outline" size={17} color={themeColors.danger} />
      </View>
      <View className="min-w-0 flex-1">
        <Text className="text-[12px] font-bold text-danger">잠자는 구독 발견!</Text>
        <Text
          className="text-[11px] leading-[15px] text-danger"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {subscriptionName} (최근 {unusedDays}일 미이용)
        </Text>
      </View>
      <View className="max-w-[48px] shrink-0 rounded-md bg-white/80 px-1.5 py-1">
        <Text className="text-center text-[9px] font-semibold leading-[11px] text-danger">
          지출 추정
        </Text>
      </View>
    </View>
  );
}

function MonthlySavings({ amount }: { amount: string }) {
  return (
    <View className="flex-row items-center justify-between rounded-[12px] bg-surface px-3 py-2.5">
      <Text className="text-[11px] font-medium text-muted">지금 해지 시 다음 달 절약</Text>
      <Text className="shrink-0 text-[14px] font-bold text-danger">+{amount}/월</Text>
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
        className="h-[34px] flex-1 items-center justify-center rounded-full bg-surface active:opacity-70"
      >
        <Text className="text-[11px] font-semibold text-muted">다음에 보기</Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        onPress={onOpenCancellationGuide}
        className="h-[34px] flex-1 items-center justify-center rounded-full bg-danger active:opacity-80"
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
    <View className="w-[90%] self-center gap-2 rounded-[18px] border border-danger-soft bg-danger-soft p-3">
      <UnusedSubscriptionHeader subscriptionName={subscriptionName} unusedDays={unusedDays} />
      <MonthlySavings amount={monthlySavings} />
      <SuggestionActions
        onRemindLater={onRemindLater}
        onOpenCancellationGuide={onOpenCancellationGuide}
      />
    </View>
  );
}
