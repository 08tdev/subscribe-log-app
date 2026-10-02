import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useThemeColors } from "@/constants/theme";

type PaymentConnection = {
  id: string;
  name: string;
  badge?: string;
  detail: string;
  status: string;
  icon: "business-outline" | "card-outline";
  iconColor?: string;
  iconBackground?: string;
  statusColor?: string;
  statusBackground?: string;
};

type PaymentConnectionsCardProps = {
  connections?: PaymentConnection[];
  onAddConnection?: () => void;
  onConnectionPress?: (connectionId: string) => void;
};

const DEFAULT_CONNECTIONS: PaymentConnection[] = [
  {
    id: "toss-bank",
    name: "토스뱅크 통장",
    badge: "주 결제",
    detail: "넷플릭스, 유튜브 프리미엄 ...",
    status: "자동감지 ON",
    icon: "business-outline",
  },
  {
    id: "hyundai-card",
    name: "현대카드 ZERO Edition2",
    detail: "ChatGPT Plus 결제 승인 연동",
    status: "정상 연동",
    icon: "card-outline",
  },
];

function ConnectionRow({
  connection,
  onPress,
}: {
  connection: PaymentConnection;
  onPress?: (connectionId: string) => void;
}) {
  const themeColors = useThemeColors();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${connection.name}, ${connection.status}`}
      onPress={() => onPress?.(connection.id)}
      className="min-h-[62px] flex-row items-center gap-2.5 rounded-[14px] bg-primary-soft px-2.5 py-2 active:opacity-80"
    >
      <View
        className="h-10 w-10 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: connection.iconBackground ?? themeColors.primarySoft }}
      >
        <Ionicons name={connection.icon} size={21} color={connection.iconColor ?? themeColors.primary} />
      </View>
      <View className="min-w-0 flex-1">
        <View className="flex-row flex-wrap items-center gap-1">
          <Text className="shrink text-[11px] font-bold text-foreground" numberOfLines={1}>
            {connection.name}
          </Text>
          {connection.badge && (
            <View className="rounded-full bg-primary px-1.5 py-0.5">
              <Text className="text-[8px] font-semibold text-white">{connection.badge}</Text>
            </View>
          )}
        </View>
        <Text className="mt-0.5 text-[10px] text-muted" numberOfLines={1}>
          {connection.detail}
        </Text>
      </View>
      <View
        className="shrink-0 rounded-full px-2 py-1"
        style={{ backgroundColor: connection.statusBackground ?? themeColors.successSoft }}
      >
        <Text className="text-[9px] font-semibold" style={{ color: connection.statusColor ?? themeColors.success }}>
          {connection.status}
        </Text>
      </View>
    </Pressable>
  );
}

export default function PaymentConnectionsCard({
  connections = DEFAULT_CONNECTIONS,
  onAddConnection,
  onConnectionPress,
}: PaymentConnectionsCardProps) {
  const themeColors = useThemeColors();
  const accountCount = connections.filter(connection => connection.icon === "business-outline").length;
  const cardCount = connections.filter(connection => connection.icon === "card-outline").length;

  return (
    <View className="w-[94%] max-w-[480px] self-center rounded-[16px] border border-border bg-surface p-3.5">
      <View className="flex-row items-center gap-2">
        <Ionicons name="card-outline" size={18} color={themeColors.primary} />
        <Text className="min-w-0 flex-1 text-[15px] font-bold text-foreground">
          결제 수단 및 금융 연동
        </Text>
        <Text className="max-w-[100px] shrink-0 text-right text-[9px] font-medium leading-[13px] text-muted">
          총 {accountCount}개 계좌 · {cardCount}개 카드
        </Text>
      </View>
      <Text className="mt-1 text-[10px] leading-[15px] text-muted">
        정기 출금 및 카드 승인을 실시간으로 감지하고 있어요.
      </Text>
      <View className="mt-2.5 gap-2">
        {connections.map(connection => (
          <ConnectionRow
            key={connection.id}
            connection={connection}
            onPress={onConnectionPress}
          />
        ))}
      </View>
      <Pressable
        accessibilityRole="button"
        onPress={onAddConnection}
        className="mt-2.5 h-[38px] flex-row items-center justify-center gap-1.5 rounded-[12px] bg-primary-soft active:opacity-80"
      >
        <Ionicons name="add-circle-outline" size={16} color={themeColors.primary} />
        <Text className="text-[11px] font-semibold text-primary">새 계좌 / 카드 연동하기</Text>
      </Pressable>
    </View>
  );
}