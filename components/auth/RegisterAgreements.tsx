import { Ionicons } from "@expo/vector-icons";
import { Alert, Pressable, Text, View } from "react-native";
import { useThemeColors } from "@/constants/theme";

export type AgreementId = "terms" | "privacy" | "age" | "marketing";
export type AgreementState = Record<AgreementId, boolean>;

type RegisterAgreementsProps = {
  agreements: AgreementState;
  error?: string;
  onChange: (agreements: AgreementState) => void;
};

const AGREEMENT_ITEMS: {
  id: AgreementId;
  required: boolean;
  label: string;
  detail: string;
}[] = [
  {
    id: "terms",
    required: true,
    label: "서비스 이용약관 동의",
    detail: "서비스 이용 조건과 구독 관리 기능에 대한 약관입니다.",
  },
  {
    id: "privacy",
    required: true,
    label: "개인정보 수집 및 이용 동의",
    detail: "회원 계정 관리와 서비스 제공을 위해 필요한 개인정보 안내입니다.",
  },
  {
    id: "age",
    required: true,
    label: "만 14세 이상입니다",
    detail: "만 14세 이상만 회원가입할 수 있습니다.",
  },
  {
    id: "marketing",
    required: false,
    label: "결제 예정일 및 혜택 맞춤 알림 수신 동의",
    detail: "선택 동의이며, 동의하지 않아도 서비스 이용이 가능합니다.",
  },
];

function AgreementCheckbox({ checked }: { checked: boolean }) {
  const colors = useThemeColors();

  return (
    <View
      className={`h-3 w-3 shrink-0 items-center justify-center rounded-[2px] ${checked ? "bg-primary" : "border border-border bg-surface"}`}
    >
      {checked && <Ionicons name="checkmark" size={10} color={colors.primaryForeground} />}
    </View>
  );
}

export default function RegisterAgreements({
  agreements,
  error,
  onChange,
}: RegisterAgreementsProps) {
  const allChecked = Object.values(agreements).every(Boolean);

  const toggleOne = (id: AgreementId) => {
    onChange({ ...agreements, [id]: !agreements[id] });
  };

  return (
    <View className="mt-3 rounded-[11px] border border-border bg-surface px-2.5 py-2">
      <View className="mb-1.5 flex-row items-center justify-between border-b border-border pb-1.5">
        <Pressable
          accessibilityRole="checkbox"
          accessibilityState={{ checked: allChecked }}
          onPress={() =>
            onChange({
              terms: !allChecked,
              privacy: !allChecked,
              age: !allChecked,
              marketing: !allChecked,
            })
          }
          className="flex-row items-center gap-1.5"
        >
          <AgreementCheckbox checked={allChecked} />
          <Text className="text-[8px] font-bold text-foreground">약관 전체 동의하기</Text>
        </Pressable>
        <Text className="text-[7px] font-medium text-primary">모두 동의</Text>
      </View>

      {AGREEMENT_ITEMS.map(item => (
        <View key={item.id} className="min-h-[23px] flex-row items-center gap-1.5">
          <Pressable
            accessibilityRole="checkbox"
            accessibilityState={{ checked: agreements[item.id] }}
            onPress={() => toggleOne(item.id)}
            className="min-w-0 flex-1 flex-row items-center gap-1.5 py-1"
          >
            <AgreementCheckbox checked={agreements[item.id]} />
            <Text className="min-w-0 flex-1 text-[7px] leading-[10px] text-foreground">
              <Text
                className={item.required ? "font-semibold text-primary" : "font-medium text-muted"}
              >
                [{item.required ? "필수" : "선택"}]
              </Text>{" "}
              {item.label}
              {item.id === "marketing" && " · 웰컴 치즈 스탬프 +50"}
            </Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${item.label} 내용 보기`}
            onPress={() => Alert.alert(item.label, item.detail)}
            className="shrink-0 flex-row items-center gap-0.5 px-1 py-1"
          >
            <Text className="text-[7px] text-muted">보기</Text>
            <Ionicons name="chevron-forward" size={9} color="#8991A3" />
          </Pressable>
        </View>
      ))}
      {!!error && <Text className="mt-1 text-[8px] text-danger">{error}</Text>}
    </View>
  );
}
