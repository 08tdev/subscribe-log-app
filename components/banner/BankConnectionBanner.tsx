import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

type BankConnectionBannerProps = {
  onConnectBank?: () => void;
};

export default function BankConnectionBanner({ onConnectBank }: BankConnectionBannerProps) {
  return (
    <View className="w-full bg-white px-4 py-2">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="계좌 연동하기"
        onPress={onConnectBank}
        className="min-h-[36px] w-full flex-row items-center rounded-[18px] bg-[#F0F2FF] px-4 py-2 active:opacity-80"
      >
        <Ionicons name="add-circle-outline" size={32} color="#6046DD" />
        <Text className="ml-3 min-w-0 flex-1 text-[16px] font-medium text-[#111827]">
          놓친 구독이 있나요?
        </Text>
        <View className="ml-2 shrink-0 flex-row items-center gap-1">
          <Text className="text-[15px] font-semibold text-[#6046DD]">계좌 연동하기</Text>
          <Ionicons name="arrow-forward" size={18} color="#6046DD" />
        </View>
      </Pressable>
    </View>
  );
}
