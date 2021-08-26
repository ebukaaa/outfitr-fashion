import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useMemo } from "react";
import { StyleSheet, View, Text } from "react-native";

export function useStore() {
  const { setOptions } = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      stackAnimation: "fade",
      headerTitle: "Create account",
    });
  }, [setOptions]);

  return {
    styles: useMemo(
      () =>
        StyleSheet.create({
          appStyles: { flex: 1 },
        }),
      []
    ),
    View,
    Text,
  };
}
