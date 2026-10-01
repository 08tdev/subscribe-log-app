import { Ionicons } from "@expo/vector-icons";
import { Pressable, TextInput, View } from "react-native";

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
  return (
    <View className="h-11 w-[94%] max-w-[480px] self-center flex-row items-center rounded-full border border-[#ECECF4] bg-white px-3">
      <Ionicons name="search" size={17} color="#65708A" />
      <TextInput
        accessibilityLabel="구독 서비스 검색"
        placeholder="찾으시는 구독 서비스나 혜택을 검색해보세요"
        placeholderTextColor="#858BA0"
        returnKeyType="search"
        onChangeText={onChangeText}
        onSubmitEditing={({ nativeEvent }) => onSubmit?.(nativeEvent.text)}
        className="ml-2 min-w-0 flex-1 py-0 text-[11px] text-[#20243A]"
      />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="음성 검색"
        onPress={onVoiceSearch}
        hitSlop={8}
        className="h-8 w-7 items-center justify-center"
      >
        <Ionicons name="mic-outline" size={17} color="#A6A0D8" />
      </Pressable>
    </View>
  );
}