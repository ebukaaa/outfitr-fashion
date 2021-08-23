import { useStore } from "./utils";

export function useFooter({ children }) {
  const {
    styles: {
      footerStyles,
      socialsStyles,
      textStyles: { containerStyles: textStyles, innerStyles },
    },
    logos,
    Logo,
    Google,
    FontAwesome,
    View,
    Text,
  } = useStore();

  return (
    <View style={footerStyles}>
      <View style={socialsStyles}>
        {logos.map((logo) => (
          <Logo key={logo}>
            {logo !== "google" ? (
              <FontAwesome name={logo} size={20} />
            ) : (
              <Google size={20} />
            )}
          </Logo>
        ))}
      </View>

      {!children ? (
        <Text style={textStyles}>
          Don&apos;t have an account?{" "}
          <Text style={innerStyles}>Sign Up here</Text>
        </Text>
      ) : (
        children
      )}
    </View>
  );
}
