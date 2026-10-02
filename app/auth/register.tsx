import { router } from "expo-router";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import CheeseBonusBanner from "@/components/auth/CheeseBonusBanner";
import RegisterActions from "@/components/auth/RegisterActions";
import RegisterAgreements, { AgreementState } from "@/components/auth/RegisterAgreements";
import RegisterDetailsForm, {
  RegisterFieldErrors,
  RegisterFormValues,
} from "@/components/auth/RegisterDetailsForm";
import RegisterProgressHeader from "@/components/auth/RegisterProgressHeader";
import RegisterPreferences from "@/components/auth/RegisterPreferences";
import RegisterWelcome from "@/components/auth/RegisterWelcome";
import { useAuth } from "@/context/AuthContext";
import { RegisterCredentials, RegistrationPreferences } from "@/types/user";

export default function RegisterScreen() {
  const [stepIndex, setStepIndex] = useState<0 | 1 | 2>(0);
  const currentStep = (stepIndex + 1) as 1 | 2 | 3;
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<RegisterFieldErrors>({});
  const [agreementError, setAgreementError] = useState("");
  const [formValues, setFormValues] = useState<RegisterFormValues>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [agreements, setAgreements] = useState<AgreementState>({
    terms: false,
    privacy: false,
    age: false,
    marketing: false,
  });
  const [preferenceError, setPreferenceError] = useState("");
  const [preferences, setPreferences] = useState<RegistrationPreferences>({
    categoryIds: ["ott", "music", "shopping"],
    subscriptionNames: ["넷플릭스", "유튜브 프리미엄", "스포티파이"],
    monthlySpendRange: "3~5만원",
  });
  const { register, isLoading } = useAuth();

  const handleRegister = async (credentials: RegisterCredentials) => {
    try {
      setError(null);
      await register(credentials);
    } catch (err) {
      const message = err instanceof Error ? err.message : "회원가입 중 문제가 발생했습니다.";
      setError(message);
      Alert.alert("회원가입 실패", message);
    }
  };

  const updateFormValue = (field: keyof RegisterFormValues, value: string) => {
    setFormValues(current => ({ ...current, [field]: value }));
    setFieldErrors(current => ({ ...current, [field]: undefined }));
    setError(null);
  };

  const handleNext = () => {
    const nextErrors: RegisterFieldErrors = {};
    if (stepIndex === 0) {
      const email = formValues.email.trim();
      if (!email) nextErrors.email = "이메일 주소를 입력해 주세요.";
      else if (!/^\S+@\S+\.\S+$/.test(email))
        nextErrors.email = "올바른 이메일 주소를 입력해 주세요.";
      if (!formValues.password) nextErrors.password = "비밀번호를 입력해 주세요.";
      else if (
        formValues.password.length < 8 ||
        formValues.password.length > 20 ||
        !/[A-Za-z]/.test(formValues.password) ||
        !/\d/.test(formValues.password) ||
        !/[^A-Za-z\d]/.test(formValues.password)
      ) {
        nextErrors.password = "영문, 숫자, 특수문자를 포함해 8~20자로 입력해 주세요.";
      }
    } else {
      if (formValues.confirmPassword !== formValues.password) {
        nextErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
      }
      if (!formValues.name.trim()) nextErrors.name = "닉네임을 입력해 주세요.";
    }

    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setError(null);

    if (stepIndex === 0) {
      setStepIndex(1);
      return;
    }

    const requiredAgreementsAccepted = agreements.terms && agreements.privacy && agreements.age;
    setAgreementError(requiredAgreementsAccepted ? "" : "필수 약관에 동의해 주세요.");
    if (!requiredAgreementsAccepted) return;
    setStepIndex(2);
  };

  const handleSubmit = async () => {
    if (preferences.categoryIds.length === 0) {
      setPreferenceError("관심 구독 분야를 하나 이상 선택해 주세요.");
      return;
    }

    const credentials: RegisterCredentials = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password,
      preferences,
    };
    await handleRegister(credentials);
  };

  const handleEmailVerification = () => {
    if (!/^\S+@\S+\.\S+$/.test(formValues.email.trim())) {
      setFieldErrors(current => ({
        ...current,
        email: "인증할 이메일 주소를 먼저 입력해 주세요.",
      }));
      return;
    }
    Alert.alert("이메일 인증", "이메일 인증 발송 기능은 아직 연결되지 않았습니다.");
  };

  const generateNickname = () => {
    const suggestions = ["알뜰한치즈", "달콤한구독", "똑똑한쥐", "야무진구독쥐"];
    const nickname = suggestions[Math.floor(Math.random() * suggestions.length)];
    updateFormValue("name", nickname);
  };

  const handlePreferenceChange = (value: RegistrationPreferences) => {
    setPreferences(value);
    setPreferenceError("");
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        className="flex-1 bg-background"
      >
        <View className="w-full max-w-[500px] flex-1 self-center px-3 pb-4 pt-2">
          <RegisterProgressHeader
            step={currentStep}
            onBack={() => setStepIndex(current => (current === 2 ? 1 : 0))}
          />
          <RegisterWelcome step={currentStep} />
          {(currentStep === 1 || currentStep === 3) && <CheeseBonusBanner />}
          {currentStep < 3 ? (
            <RegisterDetailsForm
              step={currentStep === 1 ? 1 : 2}
              values={formValues}
              errors={fieldErrors}
              onChange={updateFormValue}
              onRequestEmailVerification={handleEmailVerification}
              onGenerateNickname={generateNickname}
            />
          ) : (
            <RegisterPreferences
              value={preferences}
              error={preferenceError}
              onChange={handlePreferenceChange}
            />
          )}
          {currentStep === 2 && (
            <RegisterAgreements
              agreements={agreements}
              error={agreementError}
              onChange={value => {
                setAgreements(value);
                setAgreementError("");
              }}
            />
          )}
          <RegisterActions
            step={currentStep}
            isLoading={isLoading}
            error={error}
            onNext={handleNext}
            onSubmit={handleSubmit}
            onLogin={() => router.push("/auth/login")}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
