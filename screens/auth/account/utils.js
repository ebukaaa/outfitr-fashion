import { memo, useCallback, useEffect, useLayoutEffect, useMemo } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
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
import { EvilIcons } from "@expo/vector-icons";
import { setStatusBarStyle } from "expo-status-bar";
import { useLogin as Login } from "./login";
import { useSignUp } from "./sign-up";
import { useForgot as Forgot } from "./forgot";
import { useSuccess as Success } from "./success";

export function useStore() {
  const {
    navigate,
    create,
    params: { initialRouteName = "Login" } = {},
    borderBottomLeftRadius,
    borderBottomRightRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
  } = {
    ...useNavigation(),
    ...useRoute(),
    ...useMemo(() => StyleSheet, []),
    borderBottomLeftRadius: useSharedValue(75),
    borderTopLeftRadius: useSharedValue(0),
    borderTopRightRadius: useSharedValue(75),
    borderBottomRightRadius: useSharedValue(0),
  };
  const {
    animatedContainerStyles,
    animatedContentStyles,
    onChangeView,
    onGoBack,
  } = {
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
    onChangeView: useMemo(() => {
      function animate({
        borderBottomLeftRadius: {
          value: bottomLeftValue,
          delay: bottomLeftDelay,
        } = {},
        borderBottomRightRadius: {
          value: bottomRightValue,
          delay: bottomRightDelay,
        } = {},
        borderTopLeftRadius: { value: topLeftValue, delay: topLeftDelay } = {},
        borderTopRightRadius: {
          value: topRightValue,
          delay: topRightDelay,
        } = {},
      }) {
        if (bottomLeftDelay) {
          borderBottomLeftRadius.value = withDelay(
            bottomLeftDelay,
            withTiming(bottomLeftValue)
          );
        } else {
          borderBottomLeftRadius.value = bottomLeftValue;
        }
        if (bottomRightDelay) {
          borderBottomRightRadius.value = withDelay(
            bottomRightDelay,
            withTiming(bottomRightValue)
          );
        } else {
          borderBottomRightRadius.value = bottomRightValue;
        }
        borderTopLeftRadius.value = withDelay(
          topLeftDelay,
          withTiming(topLeftValue)
        );
        borderTopRightRadius.value = withDelay(
          topRightDelay,
          withTiming(topRightValue)
        );
      }
      return (screen, shouldNavigate = true) => {
        if (screen === "SignUp") {
          animate({
            borderBottomLeftRadius: { delay: 1, value: 0 },
            borderTopLeftRadius: { delay: 350, value: 75 },
            borderTopRightRadius: { delay: 300, value: 0 },
            borderBottomRightRadius: { delay: 600, value: 75 },
          });
        } else if (screen === "Forgot") {
          animate({
            borderBottomRightRadius: { value: 0 },
            borderBottomLeftRadius: { delay: 100, value: 0 },
            borderTopRightRadius: { delay: 200, value: 75 },
            borderTopLeftRadius: { delay: 300, value: 75 },
          });
        } else if (screen === "Login") {
          animate({
            borderBottomRightRadius: { delay: 1, value: 0 },
            borderTopRightRadius: { delay: 350, value: 75 },
            borderTopLeftRadius: { delay: 300, value: 0 },
            borderBottomLeftRadius: { delay: 600, value: 75 },
          });
        }

        if (shouldNavigate) {
          navigate(screen);
        }
      };
    }, [
      borderBottomLeftRadius,
      borderBottomRightRadius,
      borderTopLeftRadius,
      borderTopRightRadius,
      navigate,
    ]),
    onGoBack: useCallback(() => {
      footerProps().putProps((old) => ({
        ...old,
        label: "Don't have an account",
        link: "Sign Up here",
        Footer: null,
      }));
      navigate("Login");
    }, [navigate]),
  };

  useLayoutEffect(() => {
    setStatusBarStyle("light");
    return setStatusBarStyle.bind(null, "dark");
  }, []);

  useEffect(() => {
    const { putProps: putFooterProps } = footerProps();

    onChangeView(initialRouteName, false);

    if (initialRouteName === "Login") {
      putFooterProps((old) => ({
        ...old,
        onNavigate: onChangeView,
      }));
    } else if (initialRouteName === "SignUp") {
      putFooterProps((old) => ({
        ...old,
        label: "Already have an account",
        link: "Login here",
        onNavigate: onChangeView,
      }));
    } else if (initialRouteName === "Forgot") {
      putFooterProps((old) => ({
        ...old,
        label: "Didn't work",
        link: "Try another way",
        onNavigate: onChangeView,
      }));
    }
  }, [initialRouteName, onChangeView]);

  return {
    styles: useMemo(
      () => ({
        layoutStyles: {
          contentStyle: animatedContentStyles,
          containerStyle: animatedContainerStyles,
        },
      }),
      [animatedContainerStyles, animatedContentStyles]
    ),
    stack: useMemo(() => createNativeStackNavigator(), []),
    screenOptions: useMemo(
      () => ({
        stackAnimation: "fade",
        gestureEnabled: false,
        headerShown: false,
        contentStyle: create({
          styles: {
            backgroundColor: "white",
            paddingHorizontal: 40,
            justifyContent: "center",
          },
        }).styles,
      }),
      [create]
    ),
    initialRouteName,
    Layout: useMemo(() => memo(useLayout, () => true), []),
    useLogin: useCallback(
      () => (
        <Login
          onChangeView={(screen) => {
            footerProps().putProps((old) => ({
              ...old,
              label: "Didn't work",
              link: "Try another way",
            }));
            onChangeView(screen);
          }}
        />
      ),
      [onChangeView]
    ),
    useSignUp,
    useForgot: useCallback(
      () => (
        <Forgot
          onChangeView={() => {
            onChangeView("Login", false);
            footerProps().putProps((old) => ({
              ...old,
              Footer() {
                const { logoStyles, footerStyles } = useMemo(
                  () => ({
                    ...create({
                      footerStyles: {
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      },
                      logoStyles: {
                        backgroundColor: "white",
                        height: 54,
                        width: 54,
                        borderRadius: 75,
                        justifyContent: "center",
                        alignItems: "center",
                      },
                    }),
                  }),
                  []
                );
                return (
                  <View style={footerStyles}>
                    <TouchableOpacity style={logoStyles} onPress={onGoBack}>
                      <EvilIcons name="close" size={32} />
                    </TouchableOpacity>
                  </View>
                );
              },
            }));
            navigate("Success");
          }}
        />
      ),
      [create, navigate, onChangeView, onGoBack]
    ),
    useSuccess: useCallback(
      () => <Success onChangeView={onGoBack} />,
      [onGoBack]
    ),
  };
}
