import { View, Text } from "react-native";

export default function GreetingBanner() {
  return (
    <View className="flex-column items-start bg-primary-soft w-[90%] max-w-[400px] rounded-xl gap-2 px-4 py-3 border border-indigo-50/50">
      <View className="flex-column items-start flex-wrap">
        <Text className="text-sm font-bold text-indigo-600 mr-2">지출 관리 {10}일 차!</Text>
        <Text className="text-sm font-semibold text-slate-700">
          {"지금까지 2,600원을 아꼈어요!"}
        </Text>
      </View>
    </View>
  );
}
