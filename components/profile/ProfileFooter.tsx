import { Pressable, Text, View } from "react-native";

type ProfileFooterProps = {
  onLogout: () => void;
};

export default function ProfileFooter({ onLogout }: ProfileFooterProps) {
  return (
    <View className="w-full items-center gap-2 py-5">
      <View className="flex-row items-center gap-3">
        <Pressable accessibilityRole="button" onPress={onLogout} hitSlop={8}>
          <Text className="text-[10px] text-foreground">로그아웃</Text>
        </Pressable>
        <View className="h-3 w-px bg-border" />
        <Text className="text-[10px] text-foreground">회원 탈퇴</Text>
      </View>
      <Text className="text-center text-[9px] text-muted">
        구독했쥐 서비스 이용약관 · 개인정보 처리방침
      </Text>
    </View>
  );
}
