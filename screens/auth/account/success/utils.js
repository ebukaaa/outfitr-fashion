import { useLayoutEffect, useMemo } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useButton } from "tools";
import { titleStyles, bodyStyles } from "tools/styles/text";
import { lightSeaGreen } from "tools/styles/colors";

export function useStore() {
  const { create, setOptions } = {
    ...useMemo(() => StyleSheet, []),
    ...useNavigation(),
  };

  useLayoutEffect(() => {
    setOptions({
      headerShown: false,
      contentStyle: create({
        styles: {
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        },
      }).styles,
    });
  }, [create, setOptions]);

  return {
    styles: useMemo(
      () => ({
        logoStyles: {
          iconStyles: lightSeaGreen(),
          containerStyles: create({
            styles: {
              backgroundColor: lightSeaGreen(0.2),
              width: 64,
              height: 64,
              borderRadius: 75,
              justifyContent: "center",
              alignItems: "center",
            },
          }).styles,
        },
        titleStyles: [
          titleStyles(2),
          create({
            styles: {
              textAlign: "center",
              paddingHorizontal: "8%",
              paddingTop: 18,
            },
          }).styles,
        ],
        bodyStyles: [
          bodyStyles,
          create({
            styles: { paddingVertical: 18 },
          }).styles,
        ],
      }),
      [create]
    ),
    Button: useButton,
    FontAwesome5,
    View,
    Text,
  };
}
