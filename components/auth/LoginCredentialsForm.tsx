import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ActivityIndicator, Alert, Pressable, Text, TextInput, View } from "react-native";
import { useThemeColors } from "@/constants/theme";
import { LoginCredentials } from "@/types/user";

type LoginCredentialsFormProps = {
  onSubmit: (credentials: LoginCredentials) => Promise<void>;
  isLoading: boolean;
  error: string | null;
};

export default function LoginCredentialsForm({
  onSubmit,
  isLoading,
  error,
}: LoginCredentialsFormProps) {
  const colors = useThemeColors();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = async () => {
    const nextErrors: { email?: string; password?: string } = {};
    if (!email.trim()) {
      nextErrors.email = "이메일을 입력해 주세요.";
    } else if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      nextErrors.email = "올바른 이메일 주소를 입력해 주세요.";
    }
    if (!password) nextErrors.password = "비밀번호를 입력해 주세요.";
    else if (password.length < 8) nextErrors.password = "비밀번호는 8자 이상 입력해 주세요.";

    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      await onSubmit({ email: email.trim(), password });
    }
  };

  return (
    <View className="w-full rounded-[14px] bg-surface p-3.5">
      <Text className="mb-1 text-[9px] font-medium text-muted">이메일 계정</Text>
      <View
        className={`h-10 flex-row items-center gap-2 rounded-[9px] bg-primary-soft px-2.5 ${fieldErrors.email ? "border border-danger" : ""}`}
      >
        <Ionicons name="mail-outline" size={14} color={colors.muted} />
        <TextInput
          accessibilityLabel="이메일 계정"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          keyboardType="email-address"
          onChangeText={setEmail}
          onFocus={() => setFieldErrors(current => ({ ...current, email: undefined }))}
          placeholder="example@mouse.app"
          placeholderTextColor={colors.subtle}
          returnKeyType="next"
          className="min-w-0 flex-1 py-0 text-[10px] text-foreground"
          value={email}
        />
      </View>
      {!!fieldErrors.email && (
        <Text className="mt-1 text-[9px] text-danger">{fieldErrors.email}</Text>
      )}

      <Text className="mb-1 mt-2.5 text-[9px] font-medium text-muted">비밀번호</Text>
      <View
        className={`h-10 flex-row items-center gap-2 rounded-[9px] bg-primary-soft px-2.5 ${fieldErrors.password ? "border border-danger" : ""}`}
      >
        <Ionicons name="lock-closed-outline" size={14} color={colors.muted} />
        <TextInput
          accessibilityLabel="비밀번호"
          autoCapitalize="none"
          autoComplete="password"
          onChangeText={setPassword}
          onFocus={() => setFieldErrors(current => ({ ...current, password: undefined }))}
          onSubmitEditing={handleSubmit}
          placeholder="비밀번호 (8자리 이상)"
          placeholderTextColor={colors.subtle}
          returnKeyType="go"
          secureTextEntry={!passwordVisible}
          className="min-w-0 flex-1 py-0 text-[10px] text-foreground"
          value={password}
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={passwordVisible ? "비밀번호 숨기기" : "비밀번호 표시"}
          hitSlop={8}
          onPress={() => setPasswordVisible(visible => !visible)}
        >
          <Ionicons
            name={passwordVisible ? "eye-outline" : "eye-off-outline"}
            size={15}
            color={colors.muted}
          />
        </Pressable>
      </View>
      {!!fieldErrors.password && (
        <Text className="mt-1 text-[9px] text-danger">{fieldErrors.password}</Text>
      )}

      <View className="mt-2.5 flex-row items-center justify-between">
        <Pressable
          accessibilityRole="checkbox"
          accessibilityState={{ checked: rememberMe }}
          onPress={() => setRememberMe(value => !value)}
          className="flex-row items-center gap-1.5"
        >
          <View
            className={`h-3 w-3 items-center justify-center rounded-[2px] ${rememberMe ? "bg-primary" : "border border-border bg-surface"}`}
          >
            {rememberMe && <Ionicons name="checkmark" size={10} color="#FFFFFF" />}
          </View>
          <Text className="text-[9px] text-foreground">자동 로그인</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={() =>
            Alert.alert("비밀번호 찾기", "비밀번호 재설정은 고객센터를 통해 도와드릴게요.")
          }
        >
          <Text className="text-[9px] font-medium text-foreground">아이디 / 비밀번호 찾기</Text>
        </Pressable>
      </View>

      {!!error && (
        <Text accessibilityRole="alert" className="mt-2 text-[9px] leading-[13px] text-danger">
          {error}
        </Text>
      )}

      <Pressable
        accessibilityRole="button"
        disabled={isLoading}
        onPress={handleSubmit}
        className="mt-2.5 h-9 flex-row items-center justify-center gap-1.5 rounded-[9px] bg-primary active:opacity-80"
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={colors.primaryForeground} />
        ) : (
          <>
            <Text className="text-[10px] font-bold text-primary-foreground">로그인</Text>
            <Ionicons name="arrow-forward" size={13} color={colors.primaryForeground} />
          </>
        )}
      </Pressable>
    </View>
  );
}