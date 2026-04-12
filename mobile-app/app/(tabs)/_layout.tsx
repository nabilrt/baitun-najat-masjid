import { Tabs } from "expo-router";
import { BottomNavBar } from "@/components/BottomNav";
import type { ComponentProps } from "react";

const mapRouteToTab = (name: string) => {
  if (name === "index") return "home";
  if (name === "prayer") return "prayer";
  if (name === "gallery") return "gallery";
  return "donate";
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        animation: "none"
      }}
      tabBar={({ state, navigation }) => (
        <BottomNavBar
          active={mapRouteToTab(state.routes[state.index]?.name)}
          onSelect={(_, href) => navigation.navigate(href === "/" ? "index" : href.slice(1) as never)}
        />
      )}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="prayer" />
      <Tabs.Screen name="gallery" />
      <Tabs.Screen name="donate" />
    </Tabs>
  );
}
