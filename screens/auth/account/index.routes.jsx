import { useStore } from "./utils";

export function useAccount() {
  const {
    styles: {
      layoutStyles: { containerStyle, contentStyle },
    },
    stack: { Screen, Navigator },
    screenOptions,
    initialRouteName,
    Layout,
    useLogin,
    useSignUp,
    useForgot,
    useSuccess,
  } = useStore();

  return (
    <Layout containerStyle={containerStyle} contentStyle={contentStyle}>
      <Navigator
        initialRouteName={initialRouteName}
        screenOptions={screenOptions}
      >
        <Screen name="Login" component={useLogin} />
        <Screen name="SignUp" component={useSignUp} />
        <Screen name="Forgot" component={useForgot} />
        <Screen name="Success" component={useSuccess} />
      </Navigator>
    </Layout>
  );
}
