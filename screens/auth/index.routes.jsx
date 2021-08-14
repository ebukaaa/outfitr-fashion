import { useStore } from "./utils";

export function useAuth() {
  const {
    stack: { Screen, Navigator },
    screenOptions,
    useOnboarding,
    useWelcome,
  } = useStore();

  return (
    <Navigator screenOptions={screenOptions}>
      <Screen name="Onboarding" component={useOnboarding} />
      <Screen name="Welcome" component={useWelcome} />
    </Navigator>
  );
}
