import { memo, useLayoutEffect, useMemo, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { setStatusBarStyle } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { useButton, useInput } from "tools";
import { lightSeaGreen } from "tools/styles/colors";
import { bodyStyles } from "tools/styles/text";

export function useStore() {
  const { create, setOptions } = {
    ...useMemo(() => StyleSheet, []),
    ...useRoute(),
    ...useNavigation(),
  };

  useLayoutEffect(() => {
    setStatusBarStyle("light");
    return setStatusBarStyle.bind(null, "dark");
  }, []);

  useLayoutEffect(() => {
    setOptions({
      headerTitle: "Welcome back",
    });
  }, [setOptions]);

  return {
    styles: useMemo(
      () => ({
        ...create({
          buttonStyles: {
            alignSelf: "center",
          },
        }),
        subTitleStyles: [
          bodyStyles,
          create({
            styles: {
              textAlign: "center",
              paddingHorizontal: "8%",
              paddingBottom: 10,
            },
          }).styles,
        ],
        userStyles: create({
          containerStyles: {
            flexDirection: "row",
            justifyContent: "space-between",
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
          onValidate(email) {
            return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
              String(email).toLowerCase()
            );
          },
        },
        {
          id: "Enter your password",
          textContentType: "password",
          icon: "lock-outline",
          onValidate(password) {
            if (
              password.match(/[a-z]/g) &&
              password.match(/[A-Z]/g) &&
              password.match(/[0-9]/g) &&
              password.length >= 8
            ) {
              return true;
            }
            return false;
          },
        },
      ],
      []
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
  };
}
