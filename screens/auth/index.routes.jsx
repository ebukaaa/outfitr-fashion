import { useStore } from "./utils";

export function useAuth() {
  const {
    stack: { Screen, Navigator },
    screenOptions,
    useOnboarding,
    useWelcome,
    useLogin,
  } = useStore();

  return (
    <Navigator screenOptions={screenOptions}>
      <Screen name="Onboarding" component={useOnboarding} />
      <Screen name="Welcome" component={useWelcome} />
      <Screen name="Login" component={useLogin} />
    </Navigator>
  );
}
