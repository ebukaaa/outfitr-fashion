import { useCallback, useMemo, useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { lightSeaGreen, redLightNeon } from "tools/styles/colors";

export { forwardRef } from "react";
export function useStore({ style, onValidate }) {
  const [isValid, setValid] = useState(null);
  const { create, iconTintColor } = useMemo(
    () => ({
      ...StyleSheet,
      iconTintColor: {
        valid: lightSeaGreen(),
        invalid: redLightNeon(),
        normal: "#8a8d90",
      },
    }),
    []
  );

  return {
    styles: {
      containerStyles: useMemo(() => {
        let borderColor = "#eee";
        const { valid, invalid } = iconTintColor;

        if (isValid) {
          borderColor = valid;
        } else if (isValid === false) {
          borderColor = invalid;
        }

        return [
          create({
            styles: {
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 5,
              borderWidth: 1,
              borderColor,
              padding: 10,
              marginBottom: 20,
            },
          }).styles,
          style,
        ];
      }, [create, iconTintColor, isValid, style]),
      ...useMemo(
        () => ({
          placeholderTextColor: "rgba(21,22,36,0.5)",
          ...create({
            inputStyles: {
              paddingHorizontal: 10,
              flex: 1,
            },
          }),
        }),
        [create]
      ),
    },
    isValid,
    onCheckText: useCallback(
      (placeholder, { nativeEvent: { text } }) => {
        if (!text) {
          setValid(null);
          return;
        }
        if (placeholder.match("password")) {
          setTimeout(() => setValid(onValidate(text.trim())), 500);
          return;
        }
        setValid(onValidate(text.trim()));
      },
      [onValidate]
    ),
    onCheckColor: useCallback(
      (isValidated) => {
        const { normal, valid, invalid } = iconTintColor;

        if (isValidated) {
          return valid;
        }
        if (isValidated === false) {
          return invalid;
        }
        return normal;
      },
      [iconTintColor]
    ),
    View,
    TextInput,
    MaterialIcons,
  };
}
