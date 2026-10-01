import { Alert, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import Header from "@/components/header/Header";
import OverviewCard from "@/components/card/OverviewCard";
import { Redirect } from "expo-router";

export default function IndexScreen() {
  return <Redirect href="/(tabs)" />;
}
