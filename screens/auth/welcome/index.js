import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Button } from "components";
import { useNavigation } from "@react-navigation/native";
import className from "./style.module.scss";

const { create } = StyleSheet;

const welcomeStyles = create({
  header: { fontSize: Dimensions.get("window").width * 0.6 },
});
const texts = [
  { style: "title", label: "Let's get Started" },
  {
    style: "body",
    label: "Login to your account below or signup for an amazing exoerience",
  },
];
const buttons = [
  { variant: "primary", label: "Have an account? Login" },
  { label: "Join us, it's Free", initialRouteName: "Create" },
  { label: "Forgot password", initialRouteName: "Forgot", style: "forgot" },
];
export default function Welcome() {
  const { navigate } = useNavigation();

  return (
    <>
      <View style={className.top}>
        <Text style={[className.header, welcomeStyles.header]}>out</Text>
      </View>

      <View style={className.bottom}>
        <View style={className.wrapper}>
          {texts.map(({ style, label }) => (
            <Text key={label} style={className[style]}>
              {label}
            </Text>
          ))}
          {buttons.map(({ variant, label, style, initialRouteName }) => (
            <Button
              key={label}
              variant={variant}
              label={label}
              style={className[style]}
              onPress={Welcome.onPress.bind(null, navigate, initialRouteName)}
            />
          ))}
        </View>
      </View>
    </>
  );
}
Welcome.onPress = function onPress(navigate, initialRouteName) {
  navigate("Account", { initialRouteName });
};
