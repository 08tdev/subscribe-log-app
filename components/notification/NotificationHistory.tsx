import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useThemeColors } from "@/constants/theme";

type FeedCategory = "payment" | "savings" | "security";
type FeedFilter = "all" | FeedCategory;

type FeedNotification = {
  id: string;
  category: FeedCategory;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  body: string;
  time: string;
  badge?: string;
  action?: string;
  secondaryAction?: string;
  destination?: "/payment" | "/(tabs)/explore";
};

const FEED_NOTIFICATIONS: FeedNotification[] = [
  {
    id: "payment-due",
    category: "payment",
    icon: "calendar-outline",
    title: "넷플릭스 프리미엄 결제 예정",
    body: "내일(4월 25일) ₩17,000원이 토스뱅크 통장에서 자동 출금될 예정이에요. 계속 이용하시겠죠?",
    time: "오전 09:00",
    badge: "D-1 결제 예정",
    action: "지출 관리",
    secondaryAction: "해지 방법 보기",
    destination: "/payment",
  },
  {
    id: "unused-subscription",
    category: "savings",
    icon: "gift-outline",
    title: "잠자는 구독 감지! 이번 달 ₩10,900 아낄 수 있어요",
    body: "스포티파이를 35일 동안 실행하지 않으셨어요. 지금 구독을 일시 정지하고 치즈 스탬프 혜택을 챙겨보세요.",
    time: "방금 전",
    action: "지금 일시정지",
    secondaryAction: "치즈 스탬프 +50 지급",
    destination: "/(tabs)/explore",
  },
  {
    id: "bundle-offer",
    category: "savings",
    icon: "gift-outline",
    title: "디즈니+ 무빙 2 공개 기념! 반값 제휴 쿠폰 도착",
    body: "회원님을 위한 통신사 50% 반값 할인 링크가 도착했습니다. 놓치지 말고 등록해보세요!",
    time: "어제 오후 03:20",
    badge: "단독 특가",
    action: "쿠폰 등록하러 가기",
    destination: "/(tabs)/explore",
  },
  {
    id: "account-security",
    category: "security",
    icon: "shield-checkmark-outline",
    title: "계정 보안 상태가 안전해요",
    body: "최근 로그인 기록을 확인했어요. 새로운 기기에서의 접속은 없습니다.",
    time: "4월 22일",
  },
];

const FEED_FILTERS: { id: FeedFilter; label: string; count?: number }[] = [
  { id: "all", label: "전체", count: FEED_NOTIFICATIONS.length },
  { id: "payment", label: "결제 알림" },
  { id: "savings", label: "절약 & 혜택" },
  { id: "security", label: "보안/계정" },
];

function CompletedPaymentCard() {
  const colors = useThemeColors();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="ChatGPT Plus 결제 승인 완료, 결제 내역 보기"
      onPress={() => router.push("/payment")}
      className="mx-3 mt-2 flex-row gap-2.5 rounded-[14px] bg-surface p-3 active:opacity-80"
    >
      <View className="h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-primary-soft">
        <Ionicons name="checkmark-circle-outline" size={18} color={colors.success} />
      </View>
      <View className="min-w-0 flex-1">
        <View className="flex-row items-center justify-between gap-2">
          <Text className="text-[9px] font-medium text-muted">결제 완료</Text>
          <Text className="text-[8px] text-muted">어제 오전 11:15</Text>
        </View>
        <Text className="mt-0.5 text-[11px] font-semibold leading-[15px] text-foreground">
          ChatGPT Plus 결제 승인 완료
        </Text>
        <Text className="mt-0.5 text-[9px] leading-[13px] text-muted">
          현대카드 결제 ₩20,000 (₩27,850 환산) 정상 처리되었습니다.
        </Text>
      </View>
    </Pressable>
  );
}

function BudgetAlertCard() {
  const colors = useThemeColors();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="4월 예산 한도 85퍼센트 도달, 통계 보기"
      onPress={() => router.push("/(tabs)/stats")}
      className="mb-2 flex-row gap-2.5 rounded-[14px] bg-surface p-3 active:opacity-80"
    >
      <View className="h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-danger-soft">
        <Ionicons name="warning-outline" size={18} color={colors.danger} />
      </View>
      <View className="min-w-0 flex-1">
        <View className="flex-row items-center justify-between gap-2">
          <Text className="text-[9px] font-semibold text-danger">예산 한도 주의</Text>
          <Text className="text-[8px] text-muted">4월 20일</Text>
        </View>
        <Text className="mt-0.5 text-[11px] font-bold leading-[15px] text-foreground">
          4월 예산 한도 85% 도달 주의
        </Text>
        <Text className="mt-0.5 text-[9px] leading-[13px] text-muted">
          설정하신 ₩70,000 중 ₩60,900을 소비했어요. 남은 잔여 예산은 ₩9,100입니다.
        </Text>
        <View
          className="mt-2 h-[5px] overflow-hidden rounded-full bg-danger-soft"
          accessibilityRole="progressbar"
          accessibilityLabel="4월 예산 사용률 85퍼센트"
          accessibilityValue={{ min: 0, max: 100, now: 85 }}
        >
          <View className="h-full w-[85%] rounded-full" style={{ backgroundColor: colors.danger }} />
        </View>
      </View>
    </Pressable>
  );
}

function MonthlyReportCard() {
  const colors = useThemeColors();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="3월 구독 결산 리포트 보기"
      onPress={() => router.push("/(tabs)/stats")}
      className="flex-row gap-2.5 rounded-[14px] bg-surface p-3 active:opacity-80"
    >
      <View className="h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-primary-soft">
        <Ionicons name="stats-chart" size={16} color={colors.primary} />
      </View>
      <View className="min-w-0 flex-1">
        <View className="flex-row items-center justify-between gap-2">
          <Text className="text-[9px] font-medium text-muted">월간 결산</Text>
          <Text className="text-[8px] text-muted">4월 1일</Text>
        </View>
        <Text className="mt-0.5 text-[11px] font-semibold leading-[15px] text-foreground">
          3월 구독 결산 리포트가 발행되었어요!
        </Text>
        <Text className="mt-1 text-[9px] leading-[13px] text-muted">
          지난달 총 ₩72,900을 지출하셨어요. 구독 중인 절약 팁을 확인해보세요.
        </Text>
      </View>
    </Pressable>
  );
}

function QuietHoursSettings() {
  const colors = useThemeColors();

  return (
    <View className="mt-3 flex-row items-center gap-2.5 rounded-[14px] bg-primary-soft px-3 py-3">
      <View className="h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/60">
        <Ionicons name="notifications-off-outline" size={16} color={colors.primary} />
      </View>
      <Text className="min-w-0 flex-1 text-[9px] font-medium leading-[14px] text-foreground">
        알림 방해 금지 설정 원하는 시간대에 결제 알림을 받아보세요.
      </Text>
      <Pressable
        accessibilityRole="button"
        onPress={() => router.push("/settings")}
        className="shrink-0 rounded-full bg-surface px-2.5 py-1.5 active:opacity-70"
      >
        <Text className="text-[8px] font-semibold text-primary">설정하기</Text>
      </Pressable>
    </View>
  );
}

function FeedFilterBar({
  selected,
  onSelect,
}: {
  selected: FeedFilter;
  onSelect: (filter: FeedFilter) => void;
}) {
  const colors = useThemeColors();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 12, gap: 6 }}
      className="mt-2 max-h-9"
    >
      {FEED_FILTERS.map(filter => {
        const active = selected === filter.id;
        return (
          <Pressable
            key={filter.id}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            onPress={() => onSelect(filter.id)}
            className={`h-8 flex-row items-center gap-1 rounded-full px-3 ${active ? "bg-primary" : "bg-surface"}`}
          >
            <Text className={`text-[10px] font-semibold ${active ? "text-white" : "text-foreground"}`}>
              {filter.label}
            </Text>
            {filter.count !== undefined && (
              <Text className={`text-[9px] font-bold ${active ? "text-white" : "text-muted"}`}>
                {filter.count}
              </Text>
            )}
            {filter.id !== "all" && !active && (
              <View
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  backgroundColor: filter.id === "payment" ? colors.danger : colors.success,
                }}
              />
            )}
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

function WeeklyPaymentNotice() {
  const colors = useThemeColors();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => router.push("/payment")}
      className="mx-3 mt-3 min-h-[62px] flex-row items-center gap-2.5 rounded-[14px] bg-primary-soft px-3 py-2.5 active:opacity-80"
    >
      <View className="h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface">
        <Ionicons name="notifications-outline" size={16} color={colors.primary} />
      </View>
      <View className="min-w-0 flex-1">
        <Text className="text-[10px] font-bold text-foreground" numberOfLines={1}>
          이번 주 예정 지출: ₩34,900
        </Text>
        <Text className="text-[9px] leading-[13px] text-muted" numberOfLines={1}>
          똑똑한 지출이가 알려드리는 구독료 감사...
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={15} color={colors.primary} />
    </Pressable>
  );
}

function FeedNotificationCard({
  item,
  unread,
}: {
  item: FeedNotification;
  unread: boolean;
}) {
  const colors = useThemeColors();
  const iconColor = item.category === "payment"
    ? colors.danger
    : item.category === "savings"
      ? colors.success
      : colors.primary;
  const iconBackground = item.category === "payment"
    ? colors.dangerSoft
    : item.category === "savings"
      ? colors.successSoft
      : colors.primarySoft;

  return (
    <View className="mb-2 flex-row gap-2.5 rounded-[12px] bg-surface p-2.5">
      <View
        className="h-8 w-8 shrink-0 items-center justify-center rounded-[9px]"
        style={{ backgroundColor: iconBackground }}
      >
        <Ionicons name={item.icon} size={16} color={iconColor} />
      </View>
      <View className="min-w-0 flex-1">
        <View className="flex-row items-center gap-1">
          {!!item.badge && (
            <Text
              className="shrink-0 rounded-full px-1.5 py-0.5 text-[8px] font-bold"
              style={{ backgroundColor: iconBackground, color: iconColor }}
            >
              {item.badge}
            </Text>
          )}
          <Text
            className="min-w-0 flex-1 text-[10px] font-bold leading-[14px] text-foreground"
            numberOfLines={2}
          >
            {item.title}
          </Text>
          <Text className="shrink-0 text-[8px] text-muted">{item.time}</Text>
        </View>
        <Text className="mt-1 text-[9px] leading-[13px] text-muted" numberOfLines={3}>
          {item.body}
        </Text>
        {item.action && (
          <View className="mt-2 flex-row gap-1.5">
            <Pressable
              accessibilityRole="button"
              onPress={() => item.destination && router.push(item.destination)}
              className="min-h-[28px] flex-1 items-center justify-center rounded-[7px] bg-primary px-2 active:opacity-80"
            >
              <Text className="text-center text-[9px] font-semibold text-white">{item.action}</Text>
            </Pressable>
            {item.secondaryAction && (
              <Pressable
                accessibilityRole="button"
                onPress={() => item.destination && router.push(item.destination)}
                className="min-h-[28px] flex-1 items-center justify-center rounded-[7px] bg-background px-2 active:opacity-70"
              >
                <Text className="text-center text-[9px] font-semibold text-foreground">
                  {item.secondaryAction}
                </Text>
              </Pressable>
            )}
          </View>
        )}
      </View>
      {unread && <View className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />}
    </View>
  );
}

function FeedNotificationSection({
  title,
  date,
  items,
  unreadIds,
}: {
  title: string;
  date?: string;
  items: FeedNotification[];
  unreadIds: Set<string>;
}) {
  if (items.length === 0) return null;

  return (
    <View className="mt-3 px-3">
      <View className="mb-2 flex-row items-center justify-between px-0.5">
        <Text className="text-[13px] font-bold text-foreground">{title}</Text>
        <Text className="text-[8px] font-medium text-muted">
          {date ?? `${items.filter(item => unreadIds.has(item.id)).length}개의 새 알림`}
        </Text>
      </View>
      {items.map(item => (
        <FeedNotificationCard key={item.id} item={item} unread={unreadIds.has(item.id)} />
      ))}
    </View>
  );
}

function ExistingNotificationFeed() {
  const [selectedFilter, setSelectedFilter] = useState<FeedFilter>("all");
  const [unreadIds, setUnreadIds] = useState(
    () => new Set(["payment-due", "unused-subscription", "bundle-offer"]),
  );
  const visibleItems = FEED_NOTIFICATIONS.filter(
    item => selectedFilter === "all" || item.category === selectedFilter,
  );
  const todayItems = visibleItems.filter(
    item => item.id === "payment-due" || item.id === "unused-subscription",
  );
  const olderItems = visibleItems.filter(
    item => item.id !== "payment-due" && item.id !== "unused-subscription",
  );

  return (
    <View className="mt-5 border-t border-border pb-5 pt-3">
      <View className="flex-row items-center justify-between px-4">
        <View className="flex-row items-center gap-1.5">
          <View className="h-1.5 w-1.5 rounded-full bg-primary" />
          <Text className="text-[9px] font-medium text-foreground">
            읽지 않은 알림 {unreadIds.size}건
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => setUnreadIds(new Set())}
          className="flex-row items-center gap-1 active:opacity-70"
        >
          <Ionicons name="checkmark-done-outline" size={12} color="#5D6174" />
          <Text className="text-[9px] font-medium text-muted">모두 읽음</Text>
        </Pressable>
      </View>
      <FeedFilterBar selected={selectedFilter} onSelect={setSelectedFilter} />
      <WeeklyPaymentNotice />
      <FeedNotificationSection title="오늘" items={todayItems} unreadIds={unreadIds} />
      <FeedNotificationSection
        title="어제"
        date="4월 23일"
        items={olderItems}
        unreadIds={unreadIds}
      />
    </View>
  );
}

export default function NotificationHistory() {
  return (
    <View className="w-full flex-1 bg-background pb-5">
      <CompletedPaymentCard />
      <View className="mt-4 px-3">
        <View className="mb-2 flex-row items-center justify-between px-0.5">
          <Text className="text-[13px] font-bold text-foreground">지난 알림</Text>
          <Text className="text-[8px] font-medium text-muted">최근 30일</Text>
        </View>
        <BudgetAlertCard />
        <MonthlyReportCard />
        <QuietHoursSettings />
      </View>
      <ExistingNotificationFeed />
    </View>
  );
}