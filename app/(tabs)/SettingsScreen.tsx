import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { router } from "expo-router";
import { supabase } from "@/lib/supabase";

const SettingsScreen = () => {
  const user = useAuth();

  console.log("user", user);
  useEffect(() => {
    if (!user) {
      return router.replace("/(auth)/Login");
    }
  }, []);

  return (
    <View>
      <Text>Settings</Text>

      <TouchableOpacity
        onPress={() => {
          router.replace("/(auth)/Login");
        }}
        // onPress={async () => {
        //   const { error } = await supabase.auth.signOut();
        //   if (error) Alert.alert(error.message);
        //   router.replace("/(auth)/Login");
        // }}
      >
        <Text>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          router.replace("/(auth)/Register");
        }}
      >
        <Text>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
