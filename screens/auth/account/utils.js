import { memo, useCallback, useEffect, useMemo } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { useLayout, useFooterProps as footerProps } from "tools/layout";
import config from "tools/styles/config";
import { titleStyles } from "tools/styles/text";
import { useLogin as Login } from "./login";
import { useSignUp } from "./sign-up";

export function useStore() {
  const {
    navigate,
    params: { initialRouteName } = { initialRouteName: "Login" },
    borderBottomLeftRadius,
    borderBottomRightRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    create,
    compose,
  } = {
    ...useNavigation(),
    ...useRoute(),
    ...useMemo(() => StyleSheet, []),
    borderBottomLeftRadius: useSharedValue(75),
    borderTopLeftRadius: useSharedValue(0),
    borderTopRightRadius: useSharedValue(75),
    borderBottomRightRadius: useSharedValue(0),
  };
  const { animatedContainerStyles, animatedContentStyles, onChange } = {
    animatedContainerStyles: useAnimatedStyle(() => ({
      borderBottomLeftRadius: withSpring(borderBottomLeftRadius.value, config),
      borderBottomRightRadius: withSpring(
        borderBottomRightRadius.value,
        config
      ),
    })),
    animatedContentStyles: useAnimatedStyle(() => ({
      borderTopLeftRadius: withSpring(borderTopLeftRadius.value, config),
      borderTopRightRadius: withSpring(borderTopRightRadius.value, config),
    })),
    onChange: useCallback(
      (screen, shouldNavigate = true) => {
        if (screen === "SignUp") {
          borderBottomLeftRadius.value = 0;
          borderTopLeftRadius.value = withDelay(200, withTiming(75));
          borderTopRightRadius.value = withDelay(300, withTiming(0));
          borderBottomRightRadius.value = withDelay(600, withTiming(75));
        } else if (screen === "Login") {
          borderBottomRightRadius.value = 0;
          borderTopRightRadius.value = withDelay(200, withTiming(75));
          borderTopLeftRadius.value = withDelay(300, withTiming(0));
          borderBottomLeftRadius.value = withDelay(600, withTiming(75));
        }

        if (shouldNavigate) {
          navigate(screen);
        }
      },
      [
        borderBottomLeftRadius,
        borderBottomRightRadius,
        borderTopLeftRadius,
        borderTopRightRadius,
        navigate,
      ]
    ),
  };

  useEffect(() => {
    const { putProps } = footerProps();

    onChange(initialRouteName, false);

    if (initialRouteName === "Login" || !initialRouteName) {
      putProps((old) => ({
        ...old,
        onNavigate: onChange,
      }));
    } else if (initialRouteName === "SignUp") {
      putProps((old) => ({
        ...old,
        label: "Already have an account",
        link: "Login here",
        onNavigate: onChange,
      }));
    }
  }, [initialRouteName, onChange]);

  return {
    styles: useMemo(
      () => ({
        layoutStyles: {
          contentStyle: compose(
            create({
              styles: {
                paddingTop: 40,
              },
            }).styles,
            animatedContentStyles
          ),
          containerStyle: compose(animatedContainerStyles),
        },
      }),
      [animatedContainerStyles, animatedContentStyles, compose, create]
    ),
    stack: useMemo(() => createNativeStackNavigator(), []),
    screenOptions: useMemo(
      () => ({
        headerHideShadow: true,
        headerHideBackButton: true,
        gestureEnabled: false,
        headerTitleStyle: titleStyles(2),
        contentStyle: create({
          styles: {
            backgroundColor: "white",
            justifyContent: "space-between",
            paddingHorizontal: 40,
            paddingBottom: 30,
          },
        }).styles,
      }),
      [create]
    ),
    initialRouteName,
    Layout: useMemo(() => memo(useLayout, () => true), []),
    useLogin: useCallback(() => <Login onNavigate={onChange} />, [onChange]),
    useSignUp,
  };
}
