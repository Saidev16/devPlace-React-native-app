import { View } from "@/components/Themed";
import React, { useEffect, useState } from "react";
import { Text } from "../components";
import { StyleSheet, TextInput } from "react-native";
import Colors from "@/constants/Colors";
import Button from "../components/Buttons/Button";
import { isValidEmail } from "@/utils/form-validator";

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

  const handleOnPress = () => {
    validateFields(formData);
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
    backgroundColor: Colors.light.background,
    padding: 20,
    gap: 20,
  },
});

export default Register;
