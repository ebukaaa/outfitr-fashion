import { Text, View } from "react-native";
import { createRef } from "react";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Button, Input, Layout } from "components";
import validateEmail from "utils/validateEmail";
import validatePassword from "utils/validatePassword";
import { func } from "prop-types";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import styleName from "./style.module.scss";

const ref = createRef();
const texts = [
  { label: "Welcome back", style: "title" },
  {
    label: " Use your credentials below and login to your account",
    style: "body",
  },
];
const inputs = [
  {
    placeholder: "Enter your email",
    keyboardType: "email-address",
    textContentType: "emailAddress",
    icon: "mail-outline",
    returnKeyType: "next",
    onSubmitEditing() {
      ref.current?.focus();
    },
    onValidate: validateEmail,
  },
  {
    placeholder: "Enter your password",
    textContentType: "password",
    icon: "lock-outline",
    returnKeyType: "send",
    onValidate: validatePassword,
    onSubmitEditing() {
      Layout.onDismissKeyboard();
    },
  },
];
const onNavigate = (navigate = () => {}) => navigate("Dashboard");
export default function Login({ onChangeView }) {
  const { navigate } = useNavigation();

  return (
    <>
      {texts.map(({ style, label }) => (
        <Text key={label} style={styleName[style]}>
          {label}
        </Text>
      ))}
      {inputs.map(
        (
          {
            placeholder,
            icon,
            keyboardType,
            textContentType,
            returnKeyType,
            onValidate,
            onSubmitEditing,
          },
          index
        ) => (
          <Input
            key={placeholder}
            ref={index === inputs.length - 1 ? ref : undefined}
            icon={icon}
            placeholder={placeholder}
            keyboardType={keyboardType}
            returnKeyType={returnKeyType}
            textContentType={textContentType}
            onValidate={onValidate}
            onSubmitEditing={onSubmitEditing}
          />
        )
      )}

      <View style={styleName.user}>
        <Checkbox />
        <Text onPress={onChangeView} style={styleName.forgot}>
          Forgot password
        </Text>
      </View>

      <Button
        label="Log into your account"
        variant="primary"
        styleButton={styleName.button}
        onPress={onNavigate.bind(null, navigate)}
      />
    </>
  );
}
Login.propTypes = { onChangeView: func.isRequired };

const onCheck = (background) => {
  const newBackground = background;
  newBackground.value =
    background.value === "transparent"
      ? styleName.lightSeaGreen
      : "transparent";
};
function Checkbox() {
  const background = useSharedValue("transparent");
  const animatedIcon = useAnimatedStyle(() => ({
    backgroundColor: background.value,
  }));

  return (
    <RectButton
      style={styleName.checkbox}
      onPress={onCheck.bind(null, background)}
      activeOpacity={0}
    >
      <Animated.View style={[styleName.icon, animatedIcon]}>
        <MaterialIcons name="check" size={11} color="white" />
      </Animated.View>

      <Text style={styleName.text}>Remember me</Text>
    </RectButton>
  );
}
