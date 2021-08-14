import { useStore } from "./utils";

export function useScreens() {
  const {
    stack: { Navigator, Screen },
    screenOptions,
    useAuth,
  } = useStore();

  return (
    <Navigator screenOptions={screenOptions}>
      <Screen name="Auth" component={useAuth} />
    </Navigator>
  );
}
