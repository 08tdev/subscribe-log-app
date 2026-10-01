import { Tabs } from "expo-router";
import CustomTabBar from "../../components/tabs/CustomTabBar";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: "대시보드" }} />
      <Tabs.Screen name="explore" options={{ title: "발견" }} />
      <Tabs.Screen name="add" options={{ title: "등록" }} />
      <Tabs.Screen name="stats" options={{ title: "통계" }} />
      <Tabs.Screen name="profile" options={{ title: "마이" }} />
      <Tabs.Screen
          name="payment/[id]"
          options={{
            href: null, // 👈 하단 탭바 렌더링에서 제외시킵니다.
          }}
        />
    </Tabs>
  );
}
