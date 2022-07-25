import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Auth from "./auth";
import Dashboard from "./dashboard";

const { Navigator, Screen } = createNativeStackNavigator();

const screenOptions = { headerShown: false };
export default function useScreens() {
  return (
    <Navigator screenOptions={screenOptions}>
      <Screen component={Auth} name="Auth" />
      <Screen component={Dashboard} name="Dashboard" />
    </Navigator>
  );
}
