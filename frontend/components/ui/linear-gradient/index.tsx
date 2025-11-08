"use client";
import React from "react";
import { tva } from "@gluestack-ui/utils/nativewind-utils";
import { LinearGradient as ExpoLinearGradient } from "expo-linear-gradient";
import { cssInterop } from "nativewind";

cssInterop(ExpoLinearGradient, {
  className: "style",
});

const linearGradientStyle = tva({
  base: "",
});

// eslint-disable-next-line react/display-name
export const LinearGradient = React.forwardRef(
  ({ className, ...props }: any, ref?: any) => {
    return (
      <ExpoLinearGradient
        {...props}
        className={linearGradientStyle({ class: className })}
        ref={ref}
      />
    );
  }
);
