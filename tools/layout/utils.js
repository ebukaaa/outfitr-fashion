import { useCallback, useMemo, useLayoutEffect } from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { cetaceanBlue } from "tools/styles/colors";
import config from "tools/styles/config";
import { useCover } from "./cover";
import { useFooter } from "./footer";

export function useStore({ contentStyle, containerStyle }) {
  const { height, yTranslate } = {
    ...useWindowDimensions(),
    yTranslate: useSharedValue(0),
  };
  const animatedYTranslate = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withSpring(yTranslate.value, config),
      },
    ],
  }));

  useLayoutEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      "keyboardWillShow",
      ({ endCoordinates: { height: keyboardHeight } }) => {
        yTranslate.value = -keyboardHeight / 2;
      }
    );
    return () => Keyboard.removeSubscription(keyboardWillShow);
  }, [yTranslate]);

  return {
    styles: useMemo(() => {
      const { create, absoluteFill } = StyleSheet;
      return {
        containerStyles: [
          create({
            styles: { flex: 1 },
          }).styles,
          animatedYTranslate,
        ],
        coverStyles: {
          ...create({
            containerStyles: {
              ...absoluteFill,
              top: -height * 0.2,
            },
          }),
          wrapperStyles: [
            create({
              styles: {
                overflow: "hidden",
                borderColor: "transparent",
                height: "20%",
              },
            }).styles,
            containerStyle,
          ],
        },
        childrenStyles: {
          ...create({
            containerStyles: {
              flex: 1,
              overflow: "hidden",
              backgroundColor: cetaceanBlue(),
            },
          }),
          contentStyles: [
            create({
              styles: {
                height: "78%",
                borderRadius: 75,
                backgroundColor: "white",
                overflow: "hidden",
                justifyContent: "space-between",
              },
            }).styles,
            contentStyle,
          ],
        },
      };
    }, [animatedYTranslate, height, containerStyle, contentStyle]),
    Animated,
    View,
    TouchableWithoutFeedback,
    Cover: useCover,
    Footer: useFooter,
    onDismissKeyboard: useCallback(() => {
      Keyboard.dismiss();
      yTranslate.value = 0;
    }, [yTranslate]),
  };
}
