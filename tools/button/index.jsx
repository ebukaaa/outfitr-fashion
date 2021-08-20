import { useStore } from "./utils";

export function useButton({ style, label, children, variant, onPress }) {
  const {
    styles: { buttonStyles, labelStyles },
    RectButton,
    Text,
  } = useStore({ style, variant });

  return (
    <RectButton style={buttonStyles} onPress={onPress}>
      {!children ? <Text style={labelStyles}>{label}</Text> : children}
    </RectButton>
  );
}
export default useButton;
