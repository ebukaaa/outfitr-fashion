import { Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import className from "./style.module.scss";

export default function useButton({
  style,
  label,
  children,
  variant = "secondary",
  onPress,
}) {
  return (
    <RectButton
      style={[className.button, className[`${variant}Button`], style]}
      onPress={onPress}
    >
      {children || (
        <Text style={[className.label, className[`${variant}Label`]]}>
          {label}
        </Text>
      )}
    </RectButton>
  );
}
