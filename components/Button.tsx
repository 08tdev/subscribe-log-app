import { Pressable, Text } from "react-native";
import { useThemeColors } from "@/constants/theme";

type Props = {
  label: string;
  onPress?: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  fullWidth?: boolean;
};

export default function Button({
  label,
  onPress,
  variant = "primary",
  disabled = false,
  fullWidth = true,
}: Props) {
  const themeColors = useThemeColors();
  const getBackgroundColor = () => {
    if (disabled) return "bg-surface-muted";

    switch (variant) {
      case "primary":
        return "bg-primary";
      case "secondary":
        return "bg-surface-muted";
      case "danger":
        return "bg-danger";
      default:
        return "bg-primary";
    }
  };

  return (
    <Pressable
      className={`
        rounded-lg items-center justify-center p-4 
        ${getBackgroundColor()}
        ${fullWidth ? "w-full" : "px-6"}
        ${disabled ? "opacity-70" : ""}
      `}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      style={({ pressed }) => ({
        opacity: pressed ? 0.8 : 1,
      })}
    >
      <Text
        className={`font-bold text-center text-base ${variant === "danger" ? "text-danger-foreground" : variant === "secondary" || disabled ? "text-foreground" : "text-primary-foreground"}`}
        style={disabled ? { color: themeColors.subtle } : undefined}
      >
        {label}
      </Text>
    </Pressable>
  );
}
