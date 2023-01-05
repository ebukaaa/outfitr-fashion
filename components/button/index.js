import { Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import styleName from "./style.module.scss";

export default function useButton({
  styleButton,
  styleLabel,
  label,
  children,
  variant = "secondary",
  onPress,
}) {
  return (
    <RectButton
      style={[styleName.button, styleName[`${variant}Button`], styleButton]}
      onPress={onPress}
      activeOpacity={0.08}
    >
      {children || (
        <Text
          style={[styleName.label, styleName[`${variant}Label`], styleLabel]}
        >
          {label}
        </Text>
      )}
    </RectButton>
  );
}
