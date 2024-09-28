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
      // label={}
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
    <Button width={"auto"} {...props} justify="center" align="center">
      {props.children}
    </Button>
  );
};
