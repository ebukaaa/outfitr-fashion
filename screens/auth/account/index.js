import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useMemo } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, TouchableOpacity } from "react-native";
import { setStatusBarStyle } from "expo-status-bar";
import { EvilIcons } from "@expo/vector-icons";
import { Layout } from "components";
import config from "styles/config";
import className from "./style.module.scss";
import Create from "./create";
import Login from "./login";
import Forgot from "./forgot";
import Successful from "./successful";

const { Navigator, Screen } = createNativeStackNavigator();

const screenOptions = {
  animation: "fade",
  gestureEnabled: false,
  headerShown: false,
  contentStyle: className.content,
};
export default function Account() {
  const { params: { initialRouteName = "Login" } = {} } = useRoute();
  const { navigate, setOptions } = useNavigation();

  Account.borderBottomLeftRadius = useSharedValue(75);
  Account.borderTopLeftRadius = useSharedValue(0);
  Account.borderTopRightRadius = useSharedValue(75);
  Account.borderBottomRightRadius = useSharedValue(0);
  Account.navigate = useMemo(() => navigate, [navigate]);

  const containerStyle = useAnimatedStyle(() => ({
    borderBottomLeftRadius: withSpring(
      Account.borderBottomLeftRadius.value,
      config
    ),
    borderBottomRightRadius: withSpring(
      Account.borderBottomRightRadius.value,
      config
    ),
  }));
  const contentStyle = useAnimatedStyle(() => ({
    borderTopLeftRadius: withSpring(Account.borderTopLeftRadius.value, config),
    borderTopRightRadius: withSpring(
      Account.borderTopRightRadius.value,
      config
    ),
  }));

  useLayoutEffect(() => {
    setOptions({ contentStyle: className.account });
    setStatusBarStyle("light");
    return setStatusBarStyle.bind(null, "dark");
  }, [setOptions]);
  useEffect(() => {
    Layout.onNavigate = Account.onChangeView;
    Account.view[`set${initialRouteName}`](
      Account.onChangeView.bind(null, initialRouteName)
    );
  }, [initialRouteName]);

  return (
    <Layout containerStyle={containerStyle} contentStyle={contentStyle}>
      <Navigator
        screenOptions={screenOptions}
        initialRouteName={initialRouteName}
      >
        <Screen name="Login" component={Account.Login} />
        <Screen name="Create" component={Create} />
        <Screen name="Forgot" component={Account.Forgot} />
        <Screen name="Successful" component={Account.Successful} />
      </Navigator>
    </Layout>
  );
}
Account.Login = function L() {
  return (
    <Login
      onChangeView={Account.view.setForgot.bind(
        null,
        Account.onChangeView.bind(null, "Forgot", Account.navigate)
      )}
    />
  );
};
Account.Forgot = function F() {
  return (
    <Forgot
      onChangeView={Account.onChangeView.bind(
        null,
        "Login",
        Account.navigate,
        "Successful",
        Layout.setFooter.bind(
          null,
          <View style={className.footer}>
            <TouchableOpacity style={className.logo} onPress={Account.onGoBack}>
              <EvilIcons name="close" size={32} />
            </TouchableOpacity>
          </View>
        )
      )}
    />
  );
};
Account.Successful = function S() {
  return <Successful onChangeView={Account.onGoBack} />;
};
Account.animate = function animate({
  borderBottomLeftRadius: {
    value: bottomLeftValue,
    delay: bottomLeftDelay,
  } = {},
  borderBottomRightRadius: {
    value: bottomRightValue,
    delay: bottomRightDelay,
  } = {},
  borderTopLeftRadius: { value: topLeftValue, delay: topLeftDelay } = {},
  borderTopRightRadius: { value: topRightValue, delay: topRightDelay } = {},
}) {
  if (bottomLeftDelay)
    Account.borderBottomLeftRadius.value = withDelay(
      bottomLeftDelay,
      withTiming(bottomLeftValue)
    );
  else Account.borderBottomLeftRadius.value = bottomLeftValue;

  if (bottomRightDelay)
    Account.borderBottomRightRadius.value = withDelay(
      bottomRightDelay,
      withTiming(bottomRightValue)
    );
  else Account.borderBottomRightRadius.value = bottomRightValue;

  Account.borderTopLeftRadius.value = withDelay(
    topLeftDelay,
    withTiming(topLeftValue)
  );
  Account.borderTopRightRadius.value = withDelay(
    topRightDelay,
    withTiming(topRightValue)
  );
};
Account.view = {
  create: Account.animate.bind(null, {
    borderBottomLeftRadius: { delay: 1, value: 0 },
    borderTopLeftRadius: { delay: 350, value: 75 },
    borderTopRightRadius: { delay: 300, value: 0 },
    borderBottomRightRadius: { delay: 600, value: 75 },
  }),
  setCreate(callback = () => {}) {
    const { setText = () => {} } = Layout || {};
    setText((old) =>
      old.label === "Already have an account"
        ? old
        : { ...old, label: "Already have an account", url: "Login here" }
    );
    callback();
  },
  forgot: Account.animate.bind(null, {
    borderBottomRightRadius: { value: 0 },
    borderBottomLeftRadius: { delay: 100, value: 0 },
    borderTopRightRadius: { delay: 200, value: 75 },
    borderTopLeftRadius: { delay: 300, value: 75 },
  }),
  setForgot(callback = () => {}) {
    const { setText = () => {} } = Layout || {};
    setText((old) =>
      old.label === "Didn't work"
        ? old
        : { ...old, label: "Didn't work", url: "Try another way" }
    );
    callback();
  },
  login: Account.animate.bind(null, {
    borderBottomRightRadius: { delay: 1, value: 0 },
    borderTopRightRadius: { delay: 350, value: 75 },
    borderTopLeftRadius: { delay: 300, value: 0 },
    borderBottomLeftRadius: { delay: 600, value: 75 },
  }),
  setLogin(callback = () => {}) {
    callback();
  },
};
Account.onChangeView = function onChangeView(
  screen,
  navigate,
  customScreen,
  callback = () => {}
) {
  callback();
  Account.view[String(screen).toLowerCase()]();
  if (navigate) navigate(customScreen || screen);
};
Account.onGoBack = function onGoBack() {
  Account.view.setLogin(Account.navigate.bind(null, "Login"));
  Layout.setFooter();
};
