import { Link, router } from "expo-router";
import { View, Text } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { TouchableOpacity } from "react-native";
export default function Login() {
  const { setUser } = useAuth();

  const login = () => {
    setUser({
      name: "John Doe",
    });
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
      }}
    >
      <TouchableOpacity onPress={login}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.replace("/(auth)/Register")}>
        <Text>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.navigate("(tabs)")}>
        <Text>Back</Text>
      </TouchableOpacity>
    </View>
  );
}
