import { Link, router } from "expo-router";
import { View, Text, Alert, TextInput, StyleSheet } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Input from "../components/Inputs/index";
import Colors from "@/constants/Colors";
import Button from "../components/Buttons/Button";
import Buttons from "../components/Buttons";
import { color } from "react-native-elements/dist/helpers";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const setUser = useAuth();

  const signInWithEmail = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
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
      <View style={styles.screenContainer}>
        <TouchableOpacity>
          <Text style={styles.loginText}>Let's get started</Text>
          <Text style={styles.loginParagraph}>
            Sign up now for the habit tracker app and embark on a journey of
            positive change!
          </Text>
        </TouchableOpacity>

        <View style={{ gap: 18, marginBottom: 40 }}>
          <Input placeholder="Name" />
          <Input placeholder="Email" />
          <Input secureTextEntry={true} placeholder="Password" />
        </View>

        <View>
          <Buttons.Primary
            onPress={signInWithEmail}
            label="Continue"
            width={"auto"}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginText: {
    fontSize: 28,
    fontWeight: 700,
    marginBottom: 10,
  },
  loginParagraph: {
    color: Colors.light.gray,
    fontSize: 15,
    fontWeight: 400,
  },

  screenContainer: {
    flex: 1,
    gap: 80,
    marginTop: 120,
    // alignItems: "center",
  },
});
