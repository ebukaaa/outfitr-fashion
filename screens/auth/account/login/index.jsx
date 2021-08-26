import { useStore } from "./utils";

export function useLogin({ onNavigate }) {
  const {
    styles: {
      subTitleStyles,
      buttonStyles,
      userStyles: { containerStyles: userStyles, forgotPasswordStyles },
    },
    inputs,
    Input,
    Button,
    View,
    Text,
    Checkbox,
  } = useStore();

  return (
    <>
      <Text style={subTitleStyles}>
        Use your credentials below and login to your account
      </Text>

      {inputs.map(({ id, keyboardType, textContentType, icon, onValidate }) => (
        <Input
          key={id}
          placeholder={id}
          keyboardType={keyboardType}
          textContentType={textContentType}
          icon={icon}
          onValidate={onValidate}
        />
      ))}

      <View style={userStyles}>
        <Checkbox />
        <Text style={forgotPasswordStyles}>Forgot password</Text>
      </View>

      <Button
        label="Log into your account"
        variant="primary"
        style={buttonStyles}
        onPress={onNavigate.bind(null, "Login")}
      />
    </>
  );
}
