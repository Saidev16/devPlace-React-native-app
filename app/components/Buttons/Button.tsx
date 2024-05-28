import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  Vibration,
  GestureResponderEvent,
} from "react-native";
import React, { useCallback } from "react";
import { TouchableOpacity } from "react-native";
import { IButton } from "@/types/types";

const Button = ({
  children,
  color,
  outlined,
  radius,
  flex,
  row,
  justify,
  justifyContent,
  align,
  alignItems,
  shadow,
  width,
  height,
  position,
  top,
  right,
  bottom,
  left,
  disabled,
  vibrate,
  onPress,
  ...props
}: IButton) => {
  const btnStyle = StyleSheet.flatten([
    color && { backgroundColor: color },

    outlined && {
      borderWidth: 1,
      borderColor: color,
      backgroundColor: "transparent",
    },
    radius && { borderRadius: radius },
    flex && { flex: flex },
    row && { flexDirection: "row" },
    justify && { justifyContent: justify },
    justifyContent && { justifyContent: justifyContent },
    align && { alignItems: align },
    alignItems && { alignItems: alignItems },
    shadow && {
      ...shadow,
    },
    { minHeight: height || 48 },
    { minWidth: width || 48 },
    position && { position },
    top && { top },
    right && { right },
    bottom && { bottom },
    left && { left },
    disabled && { opacity: 0.5 },
  ]) as ViewStyle;

  const handleOnPress = useCallback(
    (event: GestureResponderEvent) => {
      onPress && onPress(event);
      if (vibrate) {
        Vibration.vibrate(vibrate);
      }
    },
    [vibrate, onPress]
  );

  return (
    <TouchableOpacity
      style={btnStyle}
      onPress={handleOnPress}
      disabled={disabled}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Button;
