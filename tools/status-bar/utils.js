import { useMemo } from "react";
import { StatusBar } from "expo-status-bar";

export function useStore() {
  return {
    style: useMemo(() => "auto", []),
    StatusBar,
  };
}
