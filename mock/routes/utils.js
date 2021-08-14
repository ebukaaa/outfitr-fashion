import { useMemo } from "react";
import { createNativeStackNavigator } from "react-native-screens/native-stack";

export function useStore() {
  return {
    stack: useMemo(() => createNativeStackNavigator(), []),
  };
}
