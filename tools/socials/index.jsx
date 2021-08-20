import { useStore } from "./utils";

export function useSocials() {
  const {
    styles: { appStyles },
    logos,
    View,
    FontAwesome,
    Google,
    Logo,
  } = useStore();

  return (
    <View style={appStyles}>
      {logos.map((logo) => (
        <Logo key={logo}>
          {logo !== "google" ? (
            <FontAwesome name={logo} size={24} />
          ) : (
            <Google size={24} />
          )}
        </Logo>
      ))}
    </View>
  );
}
export default useSocials;
