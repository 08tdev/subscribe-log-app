import { useState } from "react";
import { Alert, ScrollView } from "react-native";
import AddWelcomeSection from "@/components/add/AddWelcomeSection";
import SubscriptionDetailsForm, {
  SubscriptionDraft,
} from "@/components/add/SubscriptionDetailsForm";
import SubscriptionPaymentPreferences from "@/components/add/SubscriptionPaymentPreferences";
import SubscriptionPicker, {
  INITIAL_SUBSCRIPTION_SELECTION,
  SubscriptionSelection,
} from "@/components/add/SubscriptionPicker";
import ResponsiveContent from "@/components/layout/ResponsiveContent";

export default function AddScreen() {
  const [selection, setSelection] = useState<SubscriptionSelection>(INITIAL_SUBSCRIPTION_SELECTION);

  const handleSubmit = (draft: SubscriptionDraft) => {
    const cycleLabels = {
      monthly: "매월",
      yearly: "매년",
      weekly: "매주",
      custom: "직접 설정",
    };
    const personalAmount = draft.splitEnabled
      ? Math.ceil(Number(draft.monthlyAmount) / draft.memberCount)
      : Number(draft.monthlyAmount);

    Alert.alert(
      "구독 등록 기능 준비 중",
      `${selection.serviceName} ${selection.planName} · 월 ₩${Number(draft.monthlyAmount).toLocaleString()} · ${cycleLabels[draft.cycle]} 결제\n${draft.splitEnabled ? `${draft.memberCount}명 분담, 1인당 ₩${personalAmount.toLocaleString()} · ` : ""}${draft.paymentDate}${draft.trialReminder ? " · 무료 체험 알림 켬" : ""}\n실제 저장 기능은 연동 준비 중입니다.`,
    );
  };

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <ResponsiveContent maxWidth={760} className="pb-8 pt-4">
        <AddWelcomeSection />
        <SubscriptionPicker value={selection} onChange={setSelection} />
        <SubscriptionDetailsForm selection={selection} onSubmit={handleSubmit}>
          <SubscriptionPaymentPreferences />
        </SubscriptionDetailsForm>
      </ResponsiveContent>
    </ScrollView>
  );
}
