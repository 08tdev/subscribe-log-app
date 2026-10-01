import { Ionicons } from "@expo/vector-icons";
import type { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

type SmartReportSectionProps = {
  onTrySubscriptionRotation?: () => void;
  onShareReport?: () => void;
  onDownloadCsv?: () => void;
  onViewInvoices?: () => void;
};

type InsightCardProps = {
  number: string;
  variant: "purple" | "green";
  title: string;
  children: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
};

function ReportHeading() {
  return (
    <View className="mb-2.5 flex-row items-center justify-between gap-2">
      <View className="min-w-0 flex-row items-center gap-1.5">
        <Ionicons name="bulb-outline" size={16} color="#5745D8" />
        <Text className="text-[13px] font-bold text-[#20243A]">구독했쥐의 똑똑 리포트</Text>
      </View>
      <Text className="shrink-0 text-[9px] font-semibold text-[#6553E8]">AI 진단 완료</Text>
    </View>
  );
}

function InsightCard({
  number,
  variant,
  title,
  children,
  actionLabel,
  onAction,
}: InsightCardProps) {
  const badgeStyle =
    variant === "purple"
      ? { badge: "bg-[#E7E2FF]", badgeText: "text-[#5546D8]" }
      : { badge: "bg-[#CFF8ED]", badgeText: "text-[#078E7A]" };

  return (
    <View className="flex-row items-start gap-2.5 rounded-[14px] border border-[#EEF0F8] bg-white p-3">
      <View
        className={`h-5 w-5 shrink-0 items-center justify-center rounded-full ${badgeStyle.badge}`}
      >
        <Text className={`text-[10px] font-bold ${badgeStyle.badgeText}`}>{number}</Text>
      </View>
      <View className="min-w-0 flex-1">
        <Text className="text-[11px] font-bold leading-[16px] text-[#20243A]">{title}</Text>
        <Text className="mt-1 text-[10px] leading-[16px] text-[#505970]">{children}</Text>
        {actionLabel && (
          <Pressable
            accessibilityRole="button"
            onPress={onAction}
            className="mt-2 flex-row items-center self-start gap-1 py-0.5"
          >
            <Text className="text-[10px] font-semibold text-[#5546D8]">{actionLabel}</Text>
            <Ionicons name="arrow-forward" size={12} color="#5546D8" />
          </Pressable>
        )}
      </View>
    </View>
  );
}

function ReportActions({
  onShareReport,
  onDownloadCsv,
  onViewInvoices,
}: Pick<SmartReportSectionProps, "onShareReport" | "onDownloadCsv" | "onViewInvoices">) {
  return (
    <View className="mt-3">
      <Pressable
        accessibilityRole="button"
        onPress={onShareReport}
        className="h-[42px] flex-row items-center justify-center gap-2 rounded-[10px] bg-[#5543D3] active:opacity-80"
      >
        <Ionicons name="share-outline" size={15} color="#FFFFFF" />
        <Text className="text-[11px] font-semibold text-white">4월 리포트 이미지 저장 및 공유</Text>
      </Pressable>
      <View className="mt-2 flex-row flex-wrap items-center justify-center gap-x-2 gap-y-1">
        <Pressable
          accessibilityRole="button"
          onPress={onDownloadCsv}
          className="flex-row items-center gap-1 py-1"
        >
          <Ionicons name="download-outline" size={11} color="#59627B" />
          <Text className="text-[9px] text-[#59627B]">지출 내역 CSV 다운로드</Text>
        </Pressable>
        <Text className="text-[9px] text-[#C1C5D1]">·</Text>
        <Pressable
          accessibilityRole="button"
          onPress={onViewInvoices}
          className="flex-row items-center gap-1 py-1"
        >
          <Ionicons name="receipt-outline" size={11} color="#59627B" />
          <Text className="text-[9px] text-[#59627B]">상세 청구서 보기</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function SmartReportSection({
  onTrySubscriptionRotation,
  onShareReport,
  onDownloadCsv,
  onViewInvoices,
}: SmartReportSectionProps) {
  return (
    <View className="w-[90%] max-w-[480px] self-center">
      <ReportHeading />
      <View className="gap-2">
        <InsightCard
          number="1"
          variant="purple"
          title="OTT 지출 비중이 가장 높아요"
          actionLabel="교차 구독 시뮬레이션 해보기"
          onAction={onTrySubscriptionRotation}
        >
          넷플릭스와 유튜브 프리미엄을 동시에 쓰고 계시네요! 시청 시간이 줄어든 달에 하나씩
          격월 교차 구독하면 연간 약 <Text className="font-bold text-[#20243A]">₩178,800원</Text>을
          더 모을 수 있쥐! 🐭
        </InsightCard>
        <InsightCard number="2" variant="green" title="아낀 돈으로 채워둔 지즈 통장">
          지난달 해지한 멤버십 덕분에 이번 달엔 <Text className="font-bold text-[#078E7A]">₩7,890원</Text>을
          온전히 지켜냈어요. 매달 치킨 반 마리 값이 저축되는 셈이에요!
        </InsightCard>
      </View>
      <ReportActions
        onShareReport={onShareReport}
        onDownloadCsv={onDownloadCsv}
        onViewInvoices={onViewInvoices}
      />
    </View>
  );
}