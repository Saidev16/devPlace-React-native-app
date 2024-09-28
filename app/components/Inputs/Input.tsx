import Colors from "@/constants/Colors";
import React, { useState } from "react";
import { TextInput, TextInputProps } from "react-native";

interface IInput extends TextInputProps {}

const Input = (props: IInput) => {
  const [focused, setFocused] = useState<boolean>(false);

  return (
    <TextInput
      {...props}
      style={{
        borderWidth: 1.5,
        borderRadius: 10,
        borderColor: focused ? Colors.light.purple : Colors.light.gray,
        padding: 15,
        backgroundColor: focused
          ? Colors.light.lightPurple
          : Colors.light.background,
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
};

export default Input;
