import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useThemeColors } from "@/constants/theme";

type MonthlyBudgetLimitCardProps = {
  spentAmount?: number;
  budgetAmount?: number;
  onChangeBudget?: () => void;
};

const formatWon = (amount: number) => `₩${amount.toLocaleString("ko-KR")}`;

export default function MonthlyBudgetLimitCard({
  spentAmount = 60900,
  budgetAmount = 70000,
  onChangeBudget,
}: MonthlyBudgetLimitCardProps) {
  const themeColors = useThemeColors();
  const usagePercent = budgetAmount > 0 ? Math.min(Math.round((spentAmount / budgetAmount) * 100), 100) : 0;
  const remainingAmount = Math.max(budgetAmount - spentAmount, 0);
  const overBudget = spentAmount > budgetAmount;

  return (
    <View className="w-[94%] max-w-[480px] self-center rounded-[16px] border border-border bg-surface p-3.5">
      <View className="flex-row items-center justify-between gap-2">
        <View className="min-w-0 flex-row items-center gap-1.5">
          <Ionicons name="wallet-outline" size={17} color={themeColors.primary} />
          <Text className="text-[16px] font-bold text-foreground">월 구독 예산 한도</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={onChangeBudget}
          className="shrink-0 flex-row items-center gap-1 rounded-full bg-primary-soft px-2.5 py-1.5 active:opacity-80"
        >
          <Ionicons name="pencil" size={11} color={themeColors.primary} />
          <Text className="text-[9px] font-semibold text-primary">예산 변경</Text>
        </Pressable>
      </View>

      <View className="mt-2 flex-row items-end justify-between gap-3">
        <View>
          <Text className="text-[10px] text-muted">현재 소비 누적</Text>
          <Text className="mt-0.5 text-[22px] font-bold leading-7 text-foreground">
            {formatWon(spentAmount)}
          </Text>
        </View>
        <View className="items-end">
          <Text className="text-[10px] text-muted">설정 한도</Text>
          <Text className="mt-0.5 text-[15px] font-medium text-subtle">
            {formatWon(budgetAmount)} / 월
          </Text>
        </View>
      </View>

      <View
        className="mt-2.5 h-2.5 overflow-hidden rounded-full bg-primary-soft"
        accessibilityRole="progressbar"
        accessibilityLabel="월 예산 사용률"
        accessibilityValue={{ min: 0, max: 100, now: usagePercent }}
      >
        <View
          className={`h-full rounded-full ${overBudget ? "bg-danger" : "bg-primary"}`}
          style={{ width: `${usagePercent}%` }}
        />
      </View>

      <View className="mt-2 flex-row items-center justify-between gap-2">
        <View
          className={`min-w-0 flex-1 flex-row items-center gap-1 rounded-full px-2 py-1 ${overBudget ? "bg-danger-soft" : "bg-warning-soft"}`}
        >
          <Ionicons name="warning-outline" size={12} color={overBudget ? themeColors.danger : themeColors.warning} />
          <Text className={`shrink text-[9px] font-semibold ${overBudget ? "text-danger" : "text-warning"}`} numberOfLines={1}>
            {overBudget
              ? `예산을 ${formatWon(spentAmount - budgetAmount)} 초과했쥐!`
              : `예산 한도까지 ${formatWon(remainingAmount)} 남았쥐! (${usagePercent}% 소진)`}
          </Text>
        </View>
        <Text className={`shrink-0 text-[10px] font-semibold ${overBudget ? "text-danger" : "text-warning"}`}>
          {overBudget ? "초과" : "주의"}
        </Text>
      </View>
    </View>
  );
}