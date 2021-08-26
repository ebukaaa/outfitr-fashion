import { useStore } from "./utils";

export function useSignUp() {
  const {
    styles: { appStyles },
    View,
    Text,
  } = useStore();

  return (
    <View style={appStyles}>
      <Text>New mock</Text>
    </View>
  );
}
