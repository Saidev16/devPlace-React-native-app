import React, { FC } from "react";

import Button from "./Button";
import { IButton } from "@/types/types";
import Colors from "@/constants/Colors";
import Text from "../Text";

export const Primary: FC<IButton> = (props) => {
  return (
    <Button
      color={Colors.light.purple}
      width={props.width ?? 200}
      justify="center"
      radius={10}
      align="center"
      {...props}
    >
      {props.label && (
        <Text style={{ color: "white", fontSize: 14, fontWeight: 500 }}>
          {props.label}
        </Text>
      )}
      {props.children}
    </Button>
  );
};

export const Secondary: FC<IButton> = (props) => {
  return (
    <Button
      outlined
      width={props.width ?? 200}
      justify="center"
      radius={10}
      align="center"
      {...props}
    >
      {props.label && (
        <Text
          style={{ color: Colors.light.purple, fontSize: 14, fontWeight: 500 }}
        >
          {props.label}
        </Text>
      )}
      {props.children}
    </Button>
  );
};
