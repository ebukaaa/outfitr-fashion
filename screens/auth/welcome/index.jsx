import { useStore } from "./utils";

export function useWelcome() {
  const {
    styles: {
      topStyles: { containerStyles: topStyles, headerStyles },
      bottomStyles: {
        containerStyles: bottomStyles,
        contentStyles: {
          containerStyles: contentStyles,
          titleStyles,
          descriptionStyles,
          lastButtonStyles,
        },
      },
    },
    View,
    Text,
    Button,
    onNavigate,
  } = useStore();

  return (
    <>
      <View style={topStyles}>
        <Text style={headerStyles}>out</Text>
      </View>

      <View style={bottomStyles}>
        <View style={contentStyles}>
          <Text style={titleStyles}>Let&apos;s get Started</Text>
          <Text style={descriptionStyles}>
            Login to your account below or signup for an amazing exoerience
          </Text>

          <Button
            variant="primary"
            label="Have an account? Login"
            onPress={onNavigate.bind(null, "Account")}
          />
          <Button
            label="Join us, it's Free"
            onPress={onNavigate.bind(null, "Account", {
              initialRouteName: "SignUp",
            })}
          />
          <Button
            label="Forgot password"
            style={lastButtonStyles}
            onPress={onNavigate.bind(null, "Account", {
              initialRouteName: "Forgot",
            })}
          />
        </View>
      </View>
    </>
  );
}
