import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { useAccount } from "./account/index.routes";
import { useOnboarding } from "./onboarding";
import { useWelcome } from "./welcome";

export function useStore() {
  return {
    stack: useMemo(() => createNativeStackNavigator(), []),
    screenOptions: useMemo(
      () => ({
        headerShown: false,
        ...StyleSheet.create({
          contentStyle: {
            backgroundColor: "white",
          },
        }),
      }),
      []
    ),
    useOnboarding,
    useWelcome,
    useAccount,
  };
}
