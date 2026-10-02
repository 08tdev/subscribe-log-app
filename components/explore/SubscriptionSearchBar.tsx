import { Ionicons } from "@expo/vector-icons";
import { Pressable, TextInput, View } from "react-native";
import { useThemeColors } from "@/constants/theme";

type SubscriptionSearchBarProps = {
  onChangeText?: (query: string) => void;
  onSubmit?: (query: string) => void;
  onVoiceSearch?: () => void;
};

export default function SubscriptionSearchBar({
  onChangeText,
  onSubmit,
  onVoiceSearch,
}: SubscriptionSearchBarProps) {
  const themeColors = useThemeColors();

  return (
    <View className="h-11 w-[94%] max-w-[480px] self-center flex-row items-center rounded-full border border-border bg-surface px-3">
      <Ionicons name="search" size={17} color={themeColors.muted} />
      <TextInput
        accessibilityLabel="구독 서비스 검색"
        placeholder="찾으시는 구독 서비스나 혜택을 검색해보세요"
        placeholderTextColor={themeColors.subtle}
        returnKeyType="search"
        onChangeText={onChangeText}
        onSubmitEditing={({ nativeEvent }) => onSubmit?.(nativeEvent.text)}
        className="ml-2 min-w-0 flex-1 py-0 text-[11px] text-foreground"
      />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="음성 검색"
        onPress={onVoiceSearch}
        hitSlop={8}
        className="h-8 w-7 items-center justify-center"
      >
        <Ionicons name="mic-outline" size={17} color={themeColors.primary} />
      </Pressable>
    </View>
  );
}