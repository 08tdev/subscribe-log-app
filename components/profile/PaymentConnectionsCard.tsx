import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

type PaymentConnection = {
  id: string;
  name: string;
  badge?: string;
  detail: string;
  status: string;
  icon: "business-outline" | "card-outline";
  iconColor: string;
  iconBackground: string;
  statusColor: string;
  statusBackground: string;
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
    iconColor: "#6553E8",
    iconBackground: "#E9E4FF",
    statusColor: "#087E6D",
    statusBackground: "#C8F9EC",
  },
  {
    id: "hyundai-card",
    name: "현대카드 ZERO Edition2",
    detail: "ChatGPT Plus 결제 승인 연동",
    status: "정상 연동",
    icon: "card-outline",
    iconColor: "#27496D",
    iconBackground: "#DDEAFF",
    statusColor: "#5267A9",
    statusBackground: "#DCE7FF",
  },
];

function ConnectionRow({
  connection,
  onPress,
}: {
  connection: PaymentConnection;
  onPress?: (connectionId: string) => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${connection.name}, ${connection.status}`}
      onPress={() => onPress?.(connection.id)}
      className="min-h-[62px] flex-row items-center gap-2.5 rounded-[14px] bg-[#F0F2FF] px-2.5 py-2 active:opacity-80"
    >
      <View
        className="h-10 w-10 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: connection.iconBackground }}
      >
        <Ionicons name={connection.icon} size={21} color={connection.iconColor} />
      </View>
      <View className="min-w-0 flex-1">
        <View className="flex-row flex-wrap items-center gap-1">
          <Text className="shrink text-[11px] font-bold text-[#20243A]" numberOfLines={1}>
            {connection.name}
          </Text>
          {connection.badge && (
            <View className="rounded-full bg-[#6654E7] px-1.5 py-0.5">
              <Text className="text-[8px] font-semibold text-white">{connection.badge}</Text>
            </View>
          )}
        </View>
        <Text className="mt-0.5 text-[10px] text-[#65708A]" numberOfLines={1}>
          {connection.detail}
        </Text>
      </View>
      <View
        className="shrink-0 rounded-full px-2 py-1"
        style={{ backgroundColor: connection.statusBackground }}
      >
        <Text className="text-[9px] font-semibold" style={{ color: connection.statusColor }}>
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
  const accountCount = connections.filter(connection => connection.icon === "business-outline").length;
  const cardCount = connections.filter(connection => connection.icon === "card-outline").length;

  return (
    <View className="w-[94%] max-w-[480px] self-center rounded-[16px] border border-[#EEF0F8] bg-white p-3.5">
      <View className="flex-row items-center gap-2">
        <Ionicons name="card-outline" size={18} color="#5546D8" />
        <Text className="min-w-0 flex-1 text-[15px] font-bold text-[#20243A]">
          결제 수단 및 금융 연동
        </Text>
        <Text className="max-w-[100px] shrink-0 text-right text-[9px] font-medium leading-[13px] text-[#59627B]">
          총 {accountCount}개 계좌 · {cardCount}개 카드
        </Text>
      </View>
      <Text className="mt-1 text-[10px] leading-[15px] text-[#65708A]">
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
        className="mt-2.5 h-[38px] flex-row items-center justify-center gap-1.5 rounded-[12px] bg-[#E1E9FF] active:opacity-80"
      >
        <Ionicons name="add-circle-outline" size={16} color="#5546D8" />
        <Text className="text-[11px] font-semibold text-[#5546D8]">새 계좌 / 카드 연동하기</Text>
      </Pressable>
    </View>
  );
}