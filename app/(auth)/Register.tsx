import { View } from "@/components/Themed";
import React, { useEffect, useState } from "react";
import { Text } from "../components";
import { Alert, StyleSheet, TextInput } from "react-native";
import Colors from "@/constants/Colors";
import Button from "../components/Buttons/Button";
import { isValidEmail } from "@/utils/form-validator";
import { supabase } from "@/lib/supabase";

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
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });
    console.log("fist signup 2");

    if (error) {
      Alert.alert(error.message);
    }
    console.log("fist signup 3");

    if (!session) {
      Alert.alert("Please check your inbox for email verification !");
    }
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

  return (
    <View style={styles.pageContainer}>
      <TextInput
        onChangeText={(value) => handleChange("name", value)}
        value={formData.name}
        placeholder="name"
      />

      {errorMsg.name && <Text>{errorMsg.name}</Text>}
      <TextInput
        value={formData.email}
        placeholder="email"
        onChangeText={(value) => handleChange("email", value)}
      />
      <TextInput
        value={formData.password}
        placeholder="password"
        onChangeText={(value) => handleChange("password", value)}
      />

      <Button onPress={handleOnPress}>
        <Text style={{ backgroundColor: Colors.light.gray, padding: 20 }}>
          Register
        </Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingTop: 60,
    padding: 20,
    gap: 20,
  },
});

export default Register;
