import { Text } from "react-native";
import { Button, Input } from "components";
import validateEmail from "utils/validateEmail";
import { func } from "prop-types";
import className from "./style.module.scss";

const texts = [
  { label: "Forgot password?", style: "title" },
  {
    label: "Enter the email address associated with your account",
    style: "body",
  },
];
export default function Forgot({ onChangeView }) {
  return (
    <>
      {texts.map(({ label, style }) => (
        <Text key={label} style={className[style]}>
          {label}
        </Text>
      ))}

      <Input
        placeholder="Enter your email"
        icon="mail-outline"
        keyboardType="email-address"
        textContentType="emailAddress"
        returnKeyType="send"
        onValidate={validateEmail}
        onSubmitEditing={onChangeView}
      />
      <Button
        label="Reset password"
        variant="primary"
        style={className.button}
        onPress={onChangeView}
      />
    </>
  );
}
Forgot.propTypes = { onChangeView: func.isRequired };
