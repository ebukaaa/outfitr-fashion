import "react-native-gesture-handler";
import { useStore } from "./utils";

export default function App() {
  const { isLoaded, Text, StatusBar, NavigationContainer, Screens } =
    useStore();

  return !isLoaded ? (
    <Text>Loading fonts</Text>
  ) : (
    <NavigationContainer>
      <StatusBar />
      <Screens />
    </NavigationContainer>
  );
}
