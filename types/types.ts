import { ViewStyle } from "react-native";
import { TouchableOpacityProps } from "react-native-gesture-handler";

export interface IButton extends TouchableOpacityProps {
  children?: React.ReactNode;
  color?: ViewStyle["backgroundColor"];
  outlined?: boolean;
  radius?: ViewStyle["borderRadius"];
  flex?: ViewStyle["flex"];
  row?: boolean;
  justify?: ViewStyle["justifyContent"];
  justifyContent?: ViewStyle["justifyContent"];
  align?: ViewStyle["alignItems"];
  alignItems?: ViewStyle["alignItems"];
  shadow?: {
    color?: ViewStyle["shadowColor"];
    offset?: ViewStyle["shadowOffset"];
    opacity?: ViewStyle["shadowOpacity"];
    radius?: ViewStyle["shadowRadius"];
  };
  width?: ViewStyle["width"];
  height?: ViewStyle["height"];
  position?: ViewStyle["position"];
  top?: ViewStyle["top"];
  right?: ViewStyle["right"];
  bottom?: ViewStyle["bottom"];
  left?: ViewStyle["left"];
  disabled?: boolean;
  vibrate?: number | number[];
  onPress?: TouchableOpacityProps["onPress"];
}
