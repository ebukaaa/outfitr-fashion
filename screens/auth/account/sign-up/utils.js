import { useNavigation } from "@react-navigation/native";
import { createRef, useCallback, useMemo } from "react";
import { StyleSheet, Text } from "react-native";
import { useButton, useInput } from "tools";
import { bodyStyles, titleStyles } from "tools/styles/text";
import { validateEmail, validatePassword } from "tools/validation";

export function useStore() {
  const { inputsState, refs, navigate } = {
    ...useNavigation(),
    inputsState: {},
    refs: useMemo(() => [createRef(), createRef()], []),
  };

  return {
    styles: useMemo(() => {
      const { create } = StyleSheet;
      return {
        ...create({
          buttonStyles: {
            alignSelf: "center",
          },
        }),
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
    inputs: [
      ...useMemo(
        () => [
          {
            id: "Enter your email",
            keyboardType: "email-address",
            textContentType: "emailAddress",
            icon: "mail-outline",
            returnKeyType: "next",
            onSubmitEditing() {
              refs[0]?.current?.focus();
            },
            onValidate: validateEmail,
          },
          {
            id: "Enter your password",
            textContentType: "password",
            icon: "lock-outline",
            returnKeyType: "next",
            ref: refs[0],
            onSubmitEditing() {
              refs[1].current?.focus();
            },
            onValidate: validatePassword,
          },
        ],
        [refs]
      ),
      {
        ...useMemo(
          () => ({
            id: "Confirm your password",
            textContentType: "newPassword",
            icon: "lock-outline",
            returnKeyType: "join",
            ref: refs[1],
            onSubmitEditing() {},
          }),
          [refs]
        ),
        onValidate(oldPassword) {
          if (
            validatePassword(oldPassword) &&
            oldPassword === inputsState.password
          ) {
            return true;
          }
          return false;
        },
      },
    ],
    Input: useInput,
    Button: useButton,
    Text,
    onChangeText(key, value) {
      inputsState[key] = value;
    },
    onNavigate: useCallback(() => navigate("Dashboard"), [navigate]),
  };
}
