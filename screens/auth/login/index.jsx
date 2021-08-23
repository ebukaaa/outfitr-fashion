import { useStore } from "./utils";

export function useLogin() {
  const {
    styles: {
      layoutStyles: { contentStyles, containerStyles },
      titleStyles,
      subTitleStyles,
      buttonStyles,
      userStyles: { containerStyles: userStyles, forgotPasswordStyles },
    },
    inputs,
    Input,
    Layout,
    Button,
    View,
    Text,
    Checkbox,
    onLogin,
  } = useStore();

  return (
    <Layout contentStyle={contentStyles} containerStyle={containerStyles}>
      <Text style={titleStyles}>Welcome back</Text>
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
        onPress={onLogin}
      />
    </Layout>
  );
}
