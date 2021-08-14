import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { useMemo } from "react";
import { useAuth } from "./auth/index.routes";

export function useStore() {
  return {
    stack: useMemo(() => createNativeStackNavigator(), []),
    screenOptions: useMemo(
      () => ({
        headerShown: false,
      }),
      []
    ),
    useAuth,
  };
}
