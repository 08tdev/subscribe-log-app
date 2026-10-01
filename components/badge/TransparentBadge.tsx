import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type TransparentBadgeProps = {
  text: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  variant?: "soft" | "saving";
};

export default function TransparentBadge({
  text,
  iconName,
  variant = "soft",
}: TransparentBadgeProps) {
  const isSaving = variant === "saving";

  return (
    <View
      className={`flex-row items-center gap-1.5 rounded-lg px-3 py-1 ${
        isSaving ? "bg-[#197F88]" : "bg-white/20"
      }`}
    >
      {iconName && <Ionicons name={iconName} size={16} color={isSaving ? "#B6FFF0" : "#62F3D1"} />}
      <Text className="text-sm font-semibold text-white" numberOfLines={1}>
        {text}
      </Text>
    </View>
  );
}
