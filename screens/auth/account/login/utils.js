import { memo, useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { useButton, useInput } from "tools";
import { lightSeaGreen } from "tools/styles/colors";
import { bodyStyles, titleStyles } from "tools/styles/text";
import { validateEmail, validatePassword } from "tools/validation";
import { useNavigation } from "@react-navigation/native";

export function useStore() {
  const { create, navigate, ref } = {
    ...useNavigation(),
    ...useMemo(() => StyleSheet, []),
    ref: useRef(),
  };

  return {
    styles: useMemo(
      () => ({
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
        userStyles: create({
          containerStyles: {
            flexDirection: "row",
            justifyContent: "space-between",
            paddingBottom: 20,
          },
          forgotPasswordStyles: {
            color: lightSeaGreen(),
            fontFamily: "SFProDisplayMedium",
          },
        }),
      }),
      [create]
    ),
    inputs: useMemo(
      () => [
        {
          id: "Enter your email",
          keyboardType: "email-address",
          textContentType: "emailAddress",
          icon: "mail-outline",
          returnKeyType: "next",
          onSubmitEditing() {
            ref?.current?.focus();
          },
          onValidate: validateEmail,
        },
        {
          id: "Enter your password",
          textContentType: "password",
          icon: "lock-outline",
          returnKeyType: "send",
          ref,
          onSubmitEditing() {},
          onValidate: validatePassword,
        },
      ],
      [ref]
    ),
    Input: useInput,
    Button: useButton,
    Checkbox: useMemo(() => {
      function useCheckbox() {
        const [isChecked, check] = useState(false);
        const { containerStyles, textStyles, checkboxStyles } = {
          checkboxStyles: useMemo(
            () =>
              create({
                styles: {
                  height: 18,
                  width: 18,
                  backgroundColor: isChecked ? lightSeaGreen() : "transparent",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 2.4,
                  borderWidth: 1.4,
                  borderColor: lightSeaGreen(),
                },
              }).styles,
            [isChecked]
          ),
          ...useMemo(
            () =>
              create({
                containerStyles: {
                  flexDirection: "row",
                  justifyContent: "space-between",
                },
                textStyles: {
                  fontFamily: "SFProDisplayMedium",
                  paddingLeft: 10,
                },
              }),
            []
          ),
        };

        return (
          <RectButton
            style={containerStyles}
            onPress={check.bind(null, (old) => !old)}
            activeOpacity={0}
          >
            <View style={checkboxStyles}>
              <MaterialIcons name="check" size={11} color="white" />
            </View>

            <Text style={textStyles}>Remember me</Text>
          </RectButton>
        );
      }
      return memo(useCheckbox);
    }, [create]),
    View,
    Text,
    onNavigate: useCallback(() => navigate("Dashboard"), [navigate]),
  };
}
