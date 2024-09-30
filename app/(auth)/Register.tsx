import { View } from "@/components/Themed";
import React, { useEffect, useState } from "react";
import { Text } from "../components";
import { Alert, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Colors from "@/constants/Colors";
import Button from "../components/Buttons/Button";
import { isValidEmail } from "@/utils/form-validator";
import { supabase } from "@/lib/supabase";
import Input from "../components/Inputs";
import Buttons from "../components/Buttons";
import { useAuth } from "@/contexts/AuthContext";
import { router } from "expo-router";

const initFormValue = {
  name: "",
  email: "",
  password: "",
};

type registerType = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const user = useAuth();

  const [formData, setFormData] = useState(initFormValue);

  const [errorMsg, setErrorMsg] = useState(initFormValue);

  const handleChange = (field: string, value: string) => {
    setFormData((prevState) => {
      return { ...prevState, [field]: value };
    });
  };

  const validateFields = (formData: registerType) => {
    setErrorMsg(initFormValue);
    if (!formData.name) {
      setErrorMsg((prevErr) => {
        return { ...prevErr, name: "Name is required" };
      });
    }

    if (!isValidEmail(formData.email)) {
      setErrorMsg((prevErr) => {
        return { ...prevErr, email: "invalid email format" };
      });
    }
  };

  const signUpWithEmail = async () => {
    console.log("fist signup 1");
    console.log(formData.email, formData.password);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });
    console.log("fist signup 2");

    if (error) {
      console.log("error");
      Alert.alert(error.message);
    }
    console.log("fist signup 3");
    router.replace("/(tabs)");

    // if (!session) {
    //   Alert.alert("Please check your inbox for email verification !");
    // }
  };

  const handleOnPress = () => {
    validateFields(formData);
    console.log("here 0");

    console.log(errorMsg);
    console.log(Object.entries(errorMsg).length !== 0);
    // if (Object.values(errorMsg).length !== 0) return;
    console.log("here 1");
    signUpWithEmail();
  };

  useEffect(() => {
    console.log(formData, errorMsg);
  }, [formData, errorMsg]);

  useEffect(() => {
    console.log("user", user);
    if (user) {
      router.replace("/(tabs)");
    }
  }, []);

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

        <View
          style={{
            gap: 18,
            marginBottom: 40,
            backgroundColor: Colors.light.white,
          }}
        >
          <Input
            placeholder="Name"
            value={formData.name}
            onChangeText={(value) => handleChange("name", value)}
          />
          {errorMsg.name && <Text>{errorMsg.name}</Text>}

          <Input
            placeholder="Email"
            value={formData.email}
            onChangeText={(value) => handleChange("email", value)}
          />
          {errorMsg.email && <Text>{errorMsg.email}</Text>}

          <Input
            secureTextEntry={true}
            placeholder="Password"
            value={formData.password}
            onChangeText={(value) => handleChange("password", value)}
          />
          {errorMsg.password && <Text>{errorMsg.password}</Text>}
        </View>

        <View>
          <Buttons.Primary
            onPress={handleOnPress}
            label="Continue"
            width={"auto"}
          />
        </View>
      </View>
    </View>
  );
};

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
    marginTop: 70,
    backgroundColor: Colors.light.white,

    // alignItems: "center",
  },
});

export default Register;
