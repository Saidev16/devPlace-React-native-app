import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, Text, View } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import HomeScreen from ".";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: {
          marginBottom: -7,
          paddingTop: -2,
          backgroundColor: "white",
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarLabelStyle: {
          fontSize: 12,

          fontWeight: "500",
          color: Colors.light.text,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        // component={HomeScreen}
        options={{
          title: "Home",
          headerStyle: {
            backgroundColor: "red",
          },
          headerShown: false,
          tabBarIcon: () => (
            <TabBarIcon name="home" color={Colors.light.text} />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />

      <Tabs.Screen
        name="ProgressScreen"
        options={{
          title: "Progress",

          tabBarIcon: ({ color }) => (
            <TabBarIcon name="bar-chart" color={Colors.light.text} />
          ),
        }}
      />

      <Tabs.Screen
        name="SettingsScreen"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="gear" color={Colors.light.text} />
          ),
        }}
      />
    </Tabs>
  );
}
