import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useThemeColors } from "@/constants/theme";

export type RegisterFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
};

export type RegisterFieldErrors = Partial<Record<keyof RegisterFormValues, string>>;

type RegisterDetailsFormProps = {
  step: 1 | 2;
  values: RegisterFormValues;
  errors: RegisterFieldErrors;
  onChange: (field: keyof RegisterFormValues, value: string) => void;
  onRequestEmailVerification: () => void;
  onGenerateNickname: () => void;
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <Text className="mt-0.5 text-[8px] leading-3 text-danger">{message}</Text>;
}

export default function RegisterDetailsForm({
  step,
  values,
  errors,
  onChange,
  onRequestEmailVerification,
  onGenerateNickname,
}: RegisterDetailsFormProps) {
  const colors = useThemeColors();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const strength = [
    values.password.length >= 8 && values.password.length <= 20,
    /[A-Za-z]/.test(values.password),
    /\d/.test(values.password),
    /[^A-Za-z\d]/.test(values.password),
  ].filter(Boolean).length;
  const passwordMatches =
    values.confirmPassword.length > 0 && values.password === values.confirmPassword;

  return (
    <View className="gap-2.5">
      {step === 1 && (
        <>
          <View>
            <View className="mb-1 flex-row items-center justify-between">
              <Text className="text-[8px] font-semibold text-foreground">이메일 주소 *</Text>
            </View>
            <View className="flex-row gap-1.5">
              <TextInput
                accessibilityLabel="이메일 주소"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={value => onChange("email", value)}
                placeholder="happy.mouse@cheese.com"
                placeholderTextColor={colors.subtle}
                className={`h-9 min-w-0 flex-1 rounded-[8px] border bg-surface px-2.5 text-[9px] text-foreground ${errors.email ? "border-danger" : "border-border"}`}
                value={values.email}
              />
              <Pressable
                accessibilityRole="button"
                onPress={onRequestEmailVerification}
                className="h-9 flex-row items-center justify-center gap-1 rounded-[8px] bg-primary-soft px-2.5 active:opacity-70"
              >
                <Ionicons name="checkmark-circle-outline" size={12} color={colors.primary} />
                <Text className="text-[8px] font-semibold text-primary">인증하기</Text>
              </Pressable>
            </View>
            <FieldError message={errors.email} />
          </View>

          <View>
            <View className="mb-1 flex-row items-center justify-between gap-2">
              <Text className="text-[8px] font-semibold text-foreground">비밀번호 *</Text>
              <Text className="text-[7px] text-muted">영문, 숫자, 특수문자 조합 8~20자</Text>
            </View>
            <View
              className={`h-9 flex-row items-center rounded-[8px] border bg-surface px-2.5 ${errors.password ? "border-danger" : "border-border"}`}
            >
              <TextInput
                accessibilityLabel="비밀번호"
                autoCapitalize="none"
                autoComplete="new-password"
                onChangeText={value => onChange("password", value)}
                placeholder="비밀번호를 입력해 주세요"
                placeholderTextColor={colors.subtle}
                secureTextEntry={!passwordVisible}
                className="min-w-0 flex-1 py-0 text-[9px] text-foreground"
                value={values.password}
              />
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={passwordVisible ? "비밀번호 숨기기" : "비밀번호 표시"}
                hitSlop={8}
                onPress={() => setPasswordVisible(visible => !visible)}
              >
                <Ionicons
                  name={passwordVisible ? "eye-outline" : "eye-off-outline"}
                  size={13}
                  color={colors.subtle}
                />
              </Pressable>
            </View>
            <View className="mt-1 flex-row items-center gap-1">
              {[0, 1, 2, 3].map(index => (
                <View
                  key={index}
                  className="h-[3px] flex-1 rounded-full"
                  style={{
                    backgroundColor:
                      index < strength
                        ? strength === 4
                          ? colors.success
                          : colors.warning
                        : colors.border,
                  }}
                />
              ))}
              {values.password.length > 0 && (
                <Text
                  className={`ml-1 text-[7px] font-medium ${strength === 4 ? "text-success" : "text-warning"}`}
                >
                  {strength === 4 ? "매우 안전" : strength >= 2 ? "보통" : "약함"}
                </Text>
              )}
            </View>
            <FieldError message={errors.password} />
          </View>
        </>
      )}

      {step === 2 && (
        <>
          <View>
            <View className="mb-1 flex-row items-center justify-between">
              <Text className="text-[8px] font-semibold text-foreground">비밀번호 확인 *</Text>
            </View>
            <View
              className={`h-9 flex-row items-center rounded-[8px] border bg-surface px-2.5 ${errors.confirmPassword ? "border-danger" : "border-border"}`}
            >
              <TextInput
                accessibilityLabel="비밀번호 확인"
                autoCapitalize="none"
                autoComplete="new-password"
                onChangeText={value => onChange("confirmPassword", value)}
                placeholder="비밀번호를 다시 입력해 주세요"
                placeholderTextColor={colors.subtle}
                secureTextEntry={!confirmationVisible}
                className="min-w-0 flex-1 py-0 text-[9px] text-foreground"
                value={values.confirmPassword}
              />
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={confirmationVisible ? "비밀번호 숨기기" : "비밀번호 표시"}
                hitSlop={8}
                onPress={() => setConfirmationVisible(visible => !visible)}
              >
                <Ionicons
                  name={confirmationVisible ? "eye-outline" : "eye-off-outline"}
                  size={13}
                  color={colors.subtle}
                />
              </Pressable>
            </View>
            {passwordMatches && !errors.confirmPassword ? (
              <View className="mt-1 flex-row items-center gap-1">
                <Ionicons name="checkmark-circle" size={10} color={colors.success} />
                <Text className="text-[7px] text-success">비밀번호가 일치합니다</Text>
              </View>
            ) : (
              <FieldError message={errors.confirmPassword} />
            )}
          </View>

          <View>
            <View className="mb-1 flex-row items-center justify-between">
              <Text className="text-[8px] font-semibold text-foreground">닉네임 *</Text>
              <Pressable
                accessibilityRole="button"
                onPress={onGenerateNickname}
                className="flex-row items-center gap-1 rounded-full bg-primary-soft px-2 py-1 active:opacity-70"
              >
                <Ionicons name="sparkles-outline" size={10} color={colors.primary} />
                <Text className="text-[7px] font-semibold text-primary">랜덤 생성</Text>
              </Pressable>
            </View>
            <TextInput
              accessibilityLabel="닉네임"
              autoCapitalize="none"
              maxLength={12}
              onChangeText={value => onChange("name", value)}
              placeholder="원하시는 구독쥐 이름을 입력해 주세요"
              placeholderTextColor={colors.subtle}
              className={`h-9 rounded-[8px] border bg-surface px-2.5 text-[9px] text-foreground ${errors.name ? "border-danger" : "border-border"}`}
              value={values.name}
            />
            <Text className="mt-1 text-[7px] leading-[10px] text-muted">
              앱 내에서 사용할 친근한 닉네임을 정해주세요.
            </Text>
            <FieldError message={errors.name} />
          </View>
        </>
      )}
    </View>
  );
}
