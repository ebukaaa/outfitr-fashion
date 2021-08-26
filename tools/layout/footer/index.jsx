import { useStore } from "./utils";

export function useFooter() {
  const {
    styles: {
      footerStyles,
      socialsStyles,
      textStyles: { containerStyles: textStyles, innerStyles },
    },
    logos,
    props: { label, link, onNavigate, Footer } = {},
    onPress,
    Logo,
    Google,
    FontAwesome,
    View,
    Text,
  } = useStore();

  return !Footer ? (
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

      <Text style={textStyles} onPress={onPress.bind(null, link, onNavigate)}>
        {label}? <Text style={innerStyles}>{link}</Text>
      </Text>
    </View>
  ) : (
    <Footer />
  );
}
