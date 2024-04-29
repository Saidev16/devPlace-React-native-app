import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { router } from "expo-router";

const SettingsScreen = () => {
  const { user } = useAuth();

  console.log(user);
  useEffect(() => {
    if (!user) {
      return router.replace("/(auth)/Login");
    }
  }, []);

  return (
    <View>
      <Text>Settings</Text>
    </View>
  );
};

export default SettingsScreen;
