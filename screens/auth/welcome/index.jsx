import { useStore } from "./utils";

export function useWelcome() {
  const {
    styles: { appStyles },
    View,
    Text,
  } = useStore();

  return (
    <>
      <View
        style={{
          backgroundColor: "grey",
          borderBottomRightRadius: 75,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>out</Text>
      </View>

      <View
        style={{
          backgroundColor: "grey",
          height: "46%",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderTopLeftRadius: 75,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 60,
          }}
        >
          <Text>Let&apos;s get Started</Text>
          <Text
            style={{
              textAlign: "center",
              paddingTop: 10,
              paddingBottom: 20,
            }}
          >
            Login to your account below or signup for an amazing exoerience
          </Text>
          <Text>Have an account? Login</Text>
          <Text>Join us, it&apos; Free</Text>
          <Text>Forgot password</Text>
        </View>
      </View>
    </>
  );
}
