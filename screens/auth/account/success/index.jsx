import { useStore } from "./utils";

export function useSuccess({ onChangeView }) {
  const {
    styles: {
      logoStyles: { containerStyles: logoStyles, iconStyles },
      titleStyles,
      bodyStyles,
    },
    Button,
    FontAwesome5,
    View,
    Text,
  } = useStore();

  return (
    <>
      <View style={logoStyles}>
        <FontAwesome5 name="check" size={20} color={iconStyles} />
      </View>

      <Text style={titleStyles}>Your password was successfully changed</Text>
      <Text style={bodyStyles}>Close this window and login again</Text>

      <Button label="Login again" variant="primary" onPress={onChangeView} />
    </>
  );
}
