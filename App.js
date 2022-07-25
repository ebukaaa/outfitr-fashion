import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { setStatusBarStyle } from "expo-status-bar";
import { useLayoutEffect } from "react";
import { Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Screens from "./screens";
import "styles/app.scss";

export default function App() {
  const [isLoaded, isError] = useFonts({
    SFProDisplayBold: require("assets/fonts/sf-pro-display/Bold.otf"),
    SFProDisplayMedium: require("assets/fonts/sf-pro-display/Medium.otf"),
    SFProDisplayRegular: require("assets/fonts/sf-pro-display/Regular.otf"),
    SFProDisplaySemibold: require("assets/fonts/sf-pro-display/Semibold.otf"),
  });

  useLayoutEffect(() => {
    setStatusBarStyle("dark");
  }, []);

  if (isError) return <Text styleName="message">Error loading fonts</Text>;
  if (!isLoaded) return <Text styleName="message">Loading fonts</Text>;
  return (
    <GestureHandlerRootView styleName="app">
      <NavigationContainer>
        <Screens />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
