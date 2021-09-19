import { useStore } from "./utils";

export function useForgot({ onChangeView }) {
  const {
    styles: { titleStyles, subTitleStyles, buttonStyles },
    validateEmail,
    Input,
    Button,
    Text,
  } = useStore();

  return (
    <>
      <Text style={titleStyles}>Forgot password?</Text>
      <Text style={subTitleStyles}>
        Enter the email address associated with your account
      </Text>

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
        style={buttonStyles}
        onPress={onChangeView}
      />
    </>
  );
}
