import { NavigationContainer } from "@react-navigation/native";
import { useStatusBar } from "tools";
import { useFonts } from "expo-font";
import { Text } from "react-native";
import { useScreens } from "./screens/index.routes";

export function useStore() {
  const [isLoaded] = useFonts({
    SFProDisplayBold: require("assets/fonts/sf-pro-display/Bold.otf"),
    SFProDisplayMedium: require("assets/fonts/sf-pro-display/Medium.otf"),
    SFProDisplayRegular: require("assets/fonts/sf-pro-display/Regular.otf"),
    SFProDisplaySemibold: require("assets/fonts/sf-pro-display/Semibold.otf"),
  });

  return {
    isLoaded,
    Text,
    NavigationContainer,
    StatusBar: useStatusBar,
    Screens: useScreens,
  };
}
