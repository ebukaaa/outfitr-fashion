import { useStore } from "./utils";

export function useScreens() {
  const {
    stack: { Navigator, Screen },
    screenOptions,
    useAuth,
    useDashboard,
  } = useStore();

  return (
    <Navigator screenOptions={screenOptions}>
      <Screen name="Auth" component={useAuth} />
      <Screen name="Dashboard" component={useDashboard} />
    </Navigator>
  );
}
