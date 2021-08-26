import { useCallback, useMemo } from "react";
import { StyleSheet, View, Text, useWindowDimensions } from "react-native";
import { useButton } from "tools";
import { titleStyles, bodyStyles } from "tools/styles/text";
import { useNavigation } from "@react-navigation/native";

export function useStore() {
  const { width } = useWindowDimensions();
  const { navigate } = useNavigation();

  return {
    styles: useMemo(() => {
      const { create } = StyleSheet;

      return {
        topStyles: create({
          containerStyles: {
            backgroundColor: "#f4f0ef",
            borderBottomRightRadius: 75,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          },
          headerStyles: {
            color: "white",
            fontFamily: "SFProDisplayBold",
            fontSize: width * 0.6,
            transform: [
              {
                scale: 1.4,
              },
            ],
          },
        }),
        bottomStyles: {
          ...create({
            containerStyles: {
              backgroundColor: "#f4f0ef",
              height: "46%",
            },
          }),
          contentStyles: {
            ...create({
              containerStyles: {
                backgroundColor: "white",
                borderTopLeftRadius: 75,
                flex: 1,
                justifyContent: "space-evenly",
                alignItems: "center",
                paddingHorizontal: 60,
              },
              lastButtonStyles: {
                backgroundColor: "transparent",
              },
            }),
            titleStyles: [
              titleStyles(2),
              create({
                styles: { paddingVertical: 12 },
              }).styles,
            ],
            descriptionStyles: [
              bodyStyles,
              create({
                styles: {
                  textAlign: "center",
                  paddingBottom: 18,
                },
              }).styles,
            ],
          },
        },
      };
    }, [width]),
    View,
    Text,
    Button: useButton,
    onNavigate: useCallback(
      (screen, params) => navigate(screen, params),
      [navigate]
    ),
  };
}
