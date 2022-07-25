import { Text, View } from "react-native";
import { createRef, useMemo, useState } from "react";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Button, Input, Layout } from "components";
import validateEmail from "utils/validateEmail";
import validatePassword from "utils/validatePassword";
import { func } from "prop-types";
import className from "./style.module.scss";

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
export default function Login({ onChangeView }) {
  Login.navigate = useNavigation().navigate;

  return (
    <>
      {texts.map(({ style, label }) => (
        <Text key={label} style={className[style]}>
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

      <View style={className.user}>
        <Checkbox />
        <Text onPress={onChangeView} style={className.forgot}>
          Forgot password
        </Text>
      </View>

      <Button
        label="Log into your account"
        variant="primary"
        style={className.button}
        onPress={Login.onNavigate}
      />
    </>
  );
}
Login.onNavigate = function onNavigate() {
  Login.navigate("Dashboard");
};
Login.propTypes = { onChangeView: func.isRequired };

function Checkbox() {
  const [isChecked, check] = useState();
  const wrapperStyles = useMemo(
    () => [className.wrapper, isChecked && className.isChecked],
    [isChecked]
  );

  return (
    <RectButton
      style={className.checkbox}
      onPress={check.bind(null, (old) => !old)}
      activeOpacity={0}
    >
      <View style={wrapperStyles}>
        <MaterialIcons name="check" size={11} color="white" />
      </View>
      <Text style={className.text}>Remember me</Text>
    </RectButton>
  );
}
