import { useMemo } from "react";
import { StyleSheet, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { cetaceanBlue, lightSeaGreen } from "tools/styles/colors";
import { labelStyles } from "tools/styles/text";

export function useStore({ style, variant }) {
  return {
    styles: useMemo(() => {
      const { create } = StyleSheet;

      return {
        labelStyles: [
          labelStyles,
          create({
            styles: {
              color: variant === "primary" ? "white" : cetaceanBlue(),
            },
          }).styles,
        ],
        buttonStyles: [
          create({
            styles: {
              borderRadius: 25,
              height: 50,
              width: 245,
              backgroundColor:
                variant === "primary" ? lightSeaGreen() : cetaceanBlue(0.05),
              alignItems: "center",
              justifyContent: "center",
            },
          }).styles,
          style,
        ],
      };
    }, [style, variant]),
    RectButton,
    Text,
  };
}
