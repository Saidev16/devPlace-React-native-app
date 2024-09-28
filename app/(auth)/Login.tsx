import { Link, router } from "expo-router";
import { View, Text, Alert, TextInput } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Input from "../components/Inputs/index";
import Colors from "@/constants/Colors";
import Button from "../components/Buttons/Button";
import Buttons from "../components/Buttons";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const { setUser } = useAuth();

  const signInWithEmail = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  };

  const login = () => {
    setUser({
      name: "John Doe",
    });
  };
  console.log("login page");

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        padding: 25,
        backgroundColor: Colors.light.white,
      }}
    >
      <TouchableOpacity onPress={login}>
        <Text>Login</Text>
      </TouchableOpacity>

      <View style={{ width: "100%", gap: 18 }}>
        <Input placeholder="Name" />
        <Input placeholder="Email" />
        <Input secureTextEntry={true} placeholder="Password" />
      </View>

      <Buttons.Primary label="Continue" />
    </View>
  );
}
