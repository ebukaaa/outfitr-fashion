import { useStore } from "./utils";

export function useLogin({ onChangeView }) {
  const {
    styles: {
      titleStyles,
      subTitleStyles,
      buttonStyles,
      userStyles: { containerStyles: userStyles, forgotPasswordStyles },
    },
    inputs,
    Input,
    Button,
    Checkbox,
    View,
    Text,
    onNavigate,
  } = useStore();

  return (
    <>
      <Text style={titleStyles}>Welcome back</Text>
      <Text style={subTitleStyles}>
        Use your credentials below and login to your account
      </Text>

      {inputs.map(
        ({
          id,
          ref,
          icon,
          keyboardType,
          textContentType,
          returnKeyType,
          onValidate,
          onSubmitEditing,
        }) => (
          <Input
            key={id}
            ref={ref}
            icon={icon}
            placeholder={id}
            keyboardType={keyboardType}
            returnKeyType={returnKeyType}
            textContentType={textContentType}
            onValidate={onValidate}
            onSubmitEditing={onSubmitEditing}
          />
        )
      )}

      <View style={userStyles}>
        <Checkbox />
        <Text
          onPress={onChangeView.bind(null, "Forgot")}
          style={forgotPasswordStyles}
        >
          Forgot password
        </Text>
      </View>

      <Button
        label="Log into your account"
        variant="primary"
        style={buttonStyles}
        onPress={onNavigate}
      />
    </>
  );
}
