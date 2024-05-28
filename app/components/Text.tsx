import React from "react";
import { Text as RNText, TextProps, TextStyle, StyleSheet } from "react-native";

interface IText extends TextProps {
  children?: React.ReactNode;
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  p?: boolean;
  size?: TextStyle["fontSize"];
  fontSize?: TextStyle["fontSize"];
  bold?: boolean;
  semibold?: boolean;
  weight?: TextStyle["fontWeight"];
  fontWeight?: TextStyle["fontWeight"];
  center?: boolean;
  color?: TextStyle["color"];
  opacity?: TextStyle["opacity"];
  font?: TextStyle["fontFamily"];
  fontFamily?: TextStyle["fontFamily"];
  align?: TextStyle["textAlign"];
  textAlign?: TextStyle["textAlign"];
  transform?: TextStyle["textTransform"];
  textTransform?: TextStyle["textTransform"];
  lineHeight?: TextStyle["lineHeight"];
  position?: TextStyle["position"];
  top?: TextStyle["top"];
  right?: TextStyle["right"];
  bottom?: TextStyle["bottom"];
  left?: TextStyle["left"];
}

const Text = ({
  children,
  h1,
  h2,
  h3,
  h4,
  h5,
  p,
  size,
  fontSize,
  bold,
  semibold,
  weight,
  fontWeight,
  center,
  color,
  opacity,
  font,
  fontFamily,
  align,
  textAlign,
  transform,
  textTransform,
  lineHeight,
  position,
  top,
  right,
  bottom,
  left,
  style,
  ...props
}: IText) => {
  const textStyle = StyleSheet.flatten([
    h1 && { fontSize: 38, fontWeight: "800", fontFamily: "System" },
    h2 && { fontSize: 32, fontWeight: "800", fontFamily: "System" },
    h3 && { fontSize: 28, fontWeight: "800", fontFamily: "System" },
    h4 && { fontSize: 24, fontWeight: "600", fontFamily: "System" },
    h5 && { fontSize: 18, fontWeight: "600", fontFamily: "System" },
    p && { fontSize: 14, fontWeight: "normal", fontFamily: "System" },
    center && { textAlign: "center" },
    (align || textAlign) && { textAlign: textAlign || align },
    bold && { fontWeight: "800" },
    semibold && { fontWeight: "600" },
    (weight || fontWeight) && { fontWeight: fontWeight || weight },
    (transform || textTransform) && {
      textTransform: textTransform || transform,
    },
    (font || fontFamily) && { fontFamily: fontFamily || font },
    (size || fontSize) && { fontSize: fontSize || size },
    color && { color },
    opacity && { opacity },
    lineHeight && { lineHeight },
    position && { position },
    right !== undefined && { right },
    left !== undefined && { left },
    top !== undefined && { top },
    bottom !== undefined && { bottom },
    style,
  ]) as TextStyle;

  return (
    <RNText style={textStyle} {...props}>
      {children}
    </RNText>
  );
};

export default Text;
