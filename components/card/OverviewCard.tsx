import { Text, View } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import TransparentBadge from "@/components/badge/TransparentBadge";
import { useThemeColors } from "@/constants/theme";

function ReportBadges() {
  return (
    <View className="w-full flex-row items-center justify-between gap-2">
      <TransparentBadge iconName="calendar-outline" text="4월 구독 결제 리포트" />
      <TransparentBadge text="총 4개 이용 중" />
    </View>
  );
}

function SpendingSummary() {
  return (
    <View className="mt-3">
      <Text className="text-base text-white/80">이번 달 총 구독 지출</Text>
      <View className="mt-1 flex-row items-baseline">
        <Text className="text-[28px] font-bold leading-9 text-white">₩ 60,900</Text>
        <Text className="ml-1 text-sm font-medium text-white/90">원</Text>
      </View>
    </View>
  );
}

function SavingsSummary() {
  return (
    <View className="mt-1 w-full flex-row flex-wrap items-center gap-x-2 gap-y-2">
      <TransparentBadge iconName="trending-down" text="지난 달보다 ₩3,500 절약" variant="saving" />
      <Text className="text-xs font-medium text-white/65">예산 70,000원 기준</Text>
    </View>
  );
}

function BudgetProgress() {
  const themeColors = useThemeColors();

  return (
    <View className="mt-6 w-full">
      <View className="mb-2 flex-row items-end justify-between">
        <Text className="text-sm font-semibold text-white/90">구독 예산 사용률</Text>
        <Text className="text-base font-bold text-success">87%</Text>
      </View>
      <View
        className="h-3 w-full overflow-hidden rounded-full bg-[#392A9A]/80"
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: 100, now: 87 }}
        accessibilityLabel="구독 예산 사용률"
      >
        <View className="h-full w-[87%] flex-row overflow-hidden rounded-full">
          <View className="h-full w-[92%] bg-success" />
          <View className="h-full flex-1" style={{ backgroundColor: themeColors.danger }} />
        </View>
      </View>
    </View>
  );
}

function CardBackdrop() {
  return (
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 400 270"
      preserveAspectRatio="none"
      className="absolute inset-0"
      style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0, zIndex: 0 }}
      pointerEvents="none"
    >
      <Defs>
        <LinearGradient id="overviewCardGradient" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#5745D8" />
          <Stop offset="0.55" stopColor="#6858E8" />
          <Stop offset="1" stopColor="#4937BC" />
        </LinearGradient>
      </Defs>
      <Rect width="400" height="270" rx="30" fill="url(#overviewCardGradient)" />
      <Circle cx="300" cy="199" r="27" fill="none" stroke="#BDB2FF" strokeWidth="9" opacity="0.3" />
      <Circle cx="351" cy="199" r="25" fill="none" stroke="#BDB2FF" strokeWidth="9" opacity="0.3" />
      <Circle
        cx="330"
        cy="241"
        r="16"
        fill="none"
        stroke="#BDB2FF"
        strokeWidth="8"
        opacity="0.24"
      />
    </Svg>
  );
}

export default function OverviewCard() {
  return (
    <View className="relative min-h-[240px] w-[90%] max-w-[480px] self-center overflow-hidden rounded-[30px] px-6 py-5 shadow-xl shadow-indigo-950/20">
      <CardBackdrop />
      <View className="flex-1 justify-between" style={{ position: "relative", zIndex: 1 }}>
        <View>
          <ReportBadges />
          <SpendingSummary />
          <SavingsSummary />
        </View>
        <BudgetProgress />
      </View>
    </View>
  );
}
