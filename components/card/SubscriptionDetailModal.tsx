import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { Alert, Modal, Pressable, ScrollView, Text, View } from "react-native";
import { useThemeColors } from "@/constants/theme";
import { UpcomingPayment } from "@/components/card/UpcomingPaymentsSection";

type SubscriptionDetailModalProps = {
  payment: UpcomingPayment | null;
  visible: boolean;
  onClose: () => void;
};

function SubscriptionIcon({ payment }: { payment: UpcomingPayment }) {
  if (payment.icon === "netflix") {
    return (
      <View className="h-9 w-9 items-center justify-center rounded-[10px] bg-[#171B2A]">
        <Text className="text-[19px] font-extrabold text-[#E50914]">N</Text>
      </View>
    );
  }

  if (payment.icon === "youtube") {
    return (
      <View className="h-9 w-9 items-center justify-center rounded-[10px] bg-danger-soft">
        <Ionicons name="logo-youtube" size={21} color="#FF0000" />
      </View>
    );
  }

  return (
    <View className="h-9 w-9 items-center justify-center rounded-[10px] bg-success-soft">
      <Ionicons name="sparkles" size={19} color="#10A985" />
    </View>
  );
}

function ManagementAction({
  icon,
  label,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}) {
  const colors = useThemeColors();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className="h-[54px] flex-1 items-center justify-center gap-1 rounded-[9px] bg-surface active:opacity-70"
    >
      <Ionicons name={icon} size={15} color={colors.primary} />
      <Text className="text-center text-[7px] font-medium text-foreground">{label}</Text>
    </Pressable>
  );
}

export default function SubscriptionDetailModal({
  payment,
  visible,
  onClose,
}: SubscriptionDetailModalProps) {
  const colors = useThemeColors();
  const nextPaymentDate = useMemo(() => {
    if (!payment) return "";
    const date = new Date();
    date.setDate(date.getDate() + payment.daysUntilPayment);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "short",
    });
  }, [payment]);

  if (!payment) return null;

  const category =
    payment.icon === "netflix"
      ? "영상 · OTT"
      : payment.icon === "youtube"
        ? "음악 · 오디오"
        : "AI · 생산성";
  const plan =
    payment.icon === "netflix"
      ? "Netflix Korea · 4K HDR 프리미엄"
      : payment.icon === "youtube"
        ? "YouTube Premium · 개인 멤버십"
        : "OpenAI · Plus 플랜";
  const showComingSoon = (action: string) =>
    Alert.alert(action, "구독 관리 기능을 준비하고 있어요.");

  return (
    <Modal
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
      transparent
      visible={visible}
    >
      <View className="flex-1 justify-end bg-black/40">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="상세 모달 닫기"
          onPress={onClose}
          className="absolute inset-0"
        />
        <View className="h-[92%] w-full max-w-[520px] self-center overflow-hidden rounded-t-[18px] bg-background px-3 pt-2">
          <View className="mb-1 h-1 w-10 self-center rounded-full bg-border" />
          <View className="mb-2 flex-row items-center justify-end">
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="닫기"
              hitSlop={8}
              onPress={onClose}
              className="h-7 w-7 items-center justify-center rounded-full bg-surface"
            >
              <Ionicons name="close" size={17} color={colors.muted} />
            </Pressable>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 12 }}
          >
            <View className="mb-3 flex-row items-center gap-2">
              <SubscriptionIcon payment={payment} />
              <View className="min-w-0 flex-1">
                <View className="mb-0.5 flex-row items-center gap-1">
                  <Text className="rounded-full bg-primary-soft px-1.5 py-0.5 text-[7px] font-semibold text-primary">
                    {category}
                  </Text>
                  <Text className="rounded-full bg-success-soft px-1.5 py-0.5 text-[7px] font-semibold text-success">
                    +342일 꾸준 구독 중
                  </Text>
                </View>
                <Text className="text-[12px] font-bold text-foreground" numberOfLines={1}>
                  {payment.name} {payment.badge === "프리미엄" ? "프리미엄" : ""}
                </Text>
                <Text className="text-[8px] text-muted" numberOfLines={1}>
                  {plan}
                </Text>
              </View>
            </View>

            <View className="mb-2 rounded-[12px] bg-primary-soft p-2.5">
              <View className="mb-1 flex-row items-center justify-between">
                <Text className="text-[8px] font-medium text-muted">내 실부담 금액</Text>
                <Text className="rounded-full bg-danger-soft px-1.5 py-0.5 text-[7px] font-semibold text-danger">
                  D-{payment.daysUntilPayment}일 결제 예정
                </Text>
              </View>
              <View className="flex-row items-baseline">
                <Text className="text-[19px] font-bold text-primary">{payment.amount}</Text>
                <Text className="ml-1 text-[8px] text-muted">/월</Text>
              </View>
              <View className="mt-1.5 flex-row items-center justify-between rounded-[8px] bg-surface px-2 py-1.5">
                <Text className="text-[7px] text-muted">월 정가 {payment.amount}</Text>
                <View className="flex-row items-center gap-1">
                  <Text className="text-[7px] text-muted">절약 혜택</Text>
                  <Text className="text-[7px] font-semibold text-success">혜택 적용 중</Text>
                  <Ionicons name="chevron-forward" size={10} color={colors.success} />
                </View>
              </View>
              <View className="mt-1.5 flex-row gap-1.5">
                <View className="min-w-0 flex-1 rounded-[8px] bg-surface px-2 py-1.5">
                  <Text className="text-[7px] text-muted">다음 결제 예정</Text>
                  <Text className="mt-0.5 text-[8px] font-semibold text-foreground">
                    {nextPaymentDate}
                  </Text>
                </View>
                <View className="min-w-0 flex-1 rounded-[8px] bg-surface px-2 py-1.5">
                  <Text className="text-[7px] text-muted">연결된 결제 수단</Text>
                  <View className="mt-0.5 flex-row items-center gap-1">
                    <Ionicons name="card-outline" size={10} color={colors.primary} />
                    <Text className="text-[8px] font-semibold text-foreground">
                      토스체크 (8291)
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <Text className="mb-1.5 text-[8px] font-bold text-foreground">간편 관리</Text>
            <View className="mb-3 flex-row gap-1.5">
              <ManagementAction
                icon="pricetag-outline"
                label="요금제 변경"
                onPress={() => showComingSoon("요금제 변경")}
              />
              <ManagementAction
                icon="people-outline"
                label="관리 멤버"
                onPress={() => showComingSoon("관리 멤버")}
              />
              <ManagementAction
                icon="card-outline"
                label="결제 수단"
                onPress={() => showComingSoon("결제 수단")}
              />
              <ManagementAction
                icon="notifications-outline"
                label="결제 알림"
                onPress={() => showComingSoon("결제 알림")}
              />
            </View>

            <View className="rounded-[12px] bg-primary-soft p-2.5">
              <View className="flex-row items-center gap-1.5">
                <Ionicons name="pause-circle-outline" size={15} color={colors.primary} />
                <Text className="text-[9px] font-bold text-foreground">
                  잠시 쉬어가고 싶으신가요?
                </Text>
              </View>
              <Text className="mt-1 text-[7px] leading-[11px] text-muted">
                지금 해지하면 놓칠 수 있는 혜택이 있어요. 한 달 일시정지를 선택하시면 치즈 스탬프
                150개를 드려요.
              </Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => showComingSoon("일시 정지 혜택")}
                className="mt-1.5 self-start flex-row items-center gap-1 rounded-full bg-surface px-2 py-1 active:opacity-70"
              >
                <Ionicons name="gift-outline" size={10} color={colors.primary} />
                <Text className="text-[7px] font-semibold text-primary">
                  한 달 일시정지하고 혜택 받기
                </Text>
              </Pressable>
            </View>
          </ScrollView>

          <Pressable
            accessibilityRole="button"
            onPress={() => showComingSoon("구독 정보 수정")}
            className="mb-2 h-9 flex-row items-center justify-center gap-1.5 rounded-[8px] bg-primary active:opacity-80"
          >
            <Ionicons name="create-outline" size={13} color={colors.primaryForeground} />
            <Text className="text-[9px] font-bold text-primary-foreground">구독 정보 수정하기</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
