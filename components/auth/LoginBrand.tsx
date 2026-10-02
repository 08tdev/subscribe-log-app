import { Text, View } from "react-native";
import Logo from "@/components/logo/Logo";

export default function LoginBrand() {
  return (
    <View className="mb-4 items-center">
      <View className="mb-2 h-[58px] w-[58px] items-center justify-center rounded-[14px] bg-surface shadow-sm shadow-slate-900/10">
        <Logo theme="light" />
        <Text className="mt-0.5 text-[7px] font-bold text-primary">구독쥐</Text>
      </View>
      <Text className="text-[19px] font-bold leading-[25px] text-foreground">반가워요!</Text>
      <Text className="mt-1 text-center text-[10px] leading-[15px] text-foreground">
        흩어진 모든 구독 결제,{"\n"}
        <Text className="font-semibold text-primary">쥐도 새도 모르게 아껴드릴게요</Text>
      </Text>
    </View>
  );
}