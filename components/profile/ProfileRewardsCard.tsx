import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";
import { useThemeColors } from "@/constants/theme";

type ProfileRewardsCardProps = {
  name?: string;
  email?: string;
  avatar?: string;
  stampCount?: string;
  savedAmount?: string;
  membershipTier?: string;
  onOpenRewards?: () => void;
};

function ProfileIdentity({
  name,
  email,
  avatar,
  membershipTier,
}: Required<Pick<ProfileRewardsCardProps, "name" | "email" | "membershipTier">> &
  Pick<ProfileRewardsCardProps, "avatar">) {
  const themeColors = useThemeColors();

  return (
    <View className="flex-row items-center gap-3">
      <View className="relative h-[68px] w-[68px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-soft">
        {avatar ? (
          <Image source={{ uri: avatar }} className="h-full w-full" resizeMode="cover" />
        ) : (
          <Ionicons name="person" size={31} color={themeColors.primary} />
        )}
        <View className="absolute bottom-1 right-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-success" />
      </View>
      <View className="min-w-0 flex-1">
        <Text className="text-[16px] font-bold text-foreground" numberOfLines={1}>
          치즈러버 {name} 님
        </Text>
        <Text className="mt-0.5 text-[11px] text-muted" numberOfLines={1}>
          {email}
        </Text>
        <View className="mt-1.5 self-start flex-row items-center gap-1 rounded-full bg-danger-soft px-2 py-1">
          <Text className="text-[10px]">🧀</Text>
          <Text className="text-[9px] font-semibold text-danger">{membershipTier}</Text>
        </View>
      </View>
    </View>
  );
}

function StampBalance({
  stampCount,
  savedAmount,
  onOpenRewards,
}: Required<Pick<ProfileRewardsCardProps, "stampCount" | "savedAmount">> &
  Pick<ProfileRewardsCardProps, "onOpenRewards">) {
  const themeColors = useThemeColors();

  return (
    <View className="mt-4 rounded-[16px] bg-primary-soft px-4 py-3">
      <Text className="text-[11px] font-semibold text-foreground">보유 치즈 스탬프</Text>
      <View className="mt-1 flex-row items-center justify-between gap-3">
        <View className="min-w-0 flex-1">
          <View className="flex-row items-center gap-1.5">
            <Text className="text-[26px] font-bold leading-8 text-primary">{stampCount}</Text>
            <Text className="text-[17px]">🧀</Text>
          </View>
          <View className="mt-1 flex-row items-start gap-1.5">
            <Ionicons name="wallet-outline" size={15} color={themeColors.success} />
            <View>
              <Text className="text-[10px] text-foreground">이번 달 지킨 금액</Text>
              <Text className="text-[14px] font-semibold leading-[17px] text-success">
                {savedAmount}
              </Text>
            </View>
          </View>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="혜택 상점 열기"
          onPress={onOpenRewards}
          className="min-h-[44px] w-[104px] shrink-0 flex-row items-center justify-center gap-1 rounded-[13px] bg-primary px-2 active:opacity-80"
        >
          <Text className="text-center text-[12px] font-bold leading-[15px] text-white">
            혜택 상점
          </Text>
          <Ionicons name="chevron-forward" size={15} color={themeColors.primaryForeground} />
        </Pressable>
      </View>
    </View>
  );
}

export default function ProfileRewardsCard({
  name = "김구독",
  email = "sub_lover@mouse.app",
  avatar,
  stampCount = "1,450",
  savedAmount = "₩38,200",
  membershipTier = "프로 아낌러 3단",
  onOpenRewards,
}: ProfileRewardsCardProps) {
  return (
    <View className="w-[94%] max-w-[480px] self-center rounded-[18px] border border-border bg-surface p-3.5">
      <ProfileIdentity
        name={name}
        email={email}
        avatar={avatar}
        membershipTier={membershipTier}
      />
      <StampBalance
        stampCount={stampCount}
        savedAmount={savedAmount}
        onOpenRewards={onOpenRewards}
      />
    </View>
  );
}