import {
  StyleSheet,
  ViewStyle,
  Vibration,
  GestureResponderEvent,
} from "react-native";
import React, { useCallback } from "react";
import { TouchableOpacity } from "react-native";
import { IButton } from "@/types/types";
import Colors from "@/constants/Colors";

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
  direction,
  ...props
}: IButton) => {
  const btnStyle = StyleSheet.flatten([
    color && { backgroundColor: color },

    outlined && {
      borderWidth: 1,
      borderColor: Colors.light.purple,
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

    { width: width || 200 },
    position && { position },
    top && { top },
    right && { right },
    bottom && { bottom },
    left && { left },
    disabled && { opacity: 0.5 },
    direction && { flexDirection: direction, gap: 10 },
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
