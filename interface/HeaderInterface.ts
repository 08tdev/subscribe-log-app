import { Ionicons } from "@expo/vector-icons";

export interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  showHome?: boolean;
  onHomeIconPress?: () => void;
}
