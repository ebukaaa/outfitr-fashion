import { useMemo } from "react";
import { StyleSheet, Text } from "react-native";
import { useInput, useButton } from "tools";
import { bodyStyles, titleStyles } from "tools/styles/text";
import { validateEmail } from "tools/validation";

export function useStore() {
  return {
    styles: useMemo(() => {
      const { create } = StyleSheet;
      return {
        buttonStyles: create({
          styles: {
            alignSelf: "center",
          },
        }).styles,
        titleStyles: [
          titleStyles(2),
          create({
            styles: {
              textAlign: "center",
              paddingBottom: 20,
            },
          }).styles,
        ],
        subTitleStyles: [
          bodyStyles,
          create({
            styles: {
              textAlign: "center",
              paddingHorizontal: "8%",
              paddingBottom: 20,
            },
          }).styles,
        ],
      };
    }, []),
    validateEmail,
    Input: useInput,
    Button: useButton,
    Text,
  };
}
