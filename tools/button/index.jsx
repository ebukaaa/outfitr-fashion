import { useStore } from "./utils";

export function useButton({ style, label, variant, onPress }) {
  const {
    styles: { buttonStyles, labelStyles },
    RectButton,
    Text,
  } = useStore({ style, variant });

  return (
    <RectButton style={buttonStyles} onPress={onPress}>
      <Text style={labelStyles}>{label}</Text>
    </RectButton>
  );
}
export default useButton;
