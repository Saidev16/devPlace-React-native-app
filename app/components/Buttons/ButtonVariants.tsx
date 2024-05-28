import React, { FC } from "react";

import Button from "./Button";
import { IButton } from "@/types/types";
import Colors from "@/constants/Colors";

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
