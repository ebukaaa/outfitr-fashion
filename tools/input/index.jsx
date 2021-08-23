import { useStore } from "./utils";

export function useInput({
  style,
  icon,
  placeholder,
  keyboardType,
  autoCapitalize,
  textContentType,
  onValidate,
}) {
  const {
    styles: { containerStyles, inputStyles, placeholderTextColor },
    isValid,
    onBlur,
    onCheckColor,
    View,
    TextInput,
    MaterialIcons,
  } = useStore({ style, onValidate });

  return (
    <View style={containerStyles}>
      <MaterialIcons name={icon} size={15} color={onCheckColor(isValid)} />

      <TextInput
        style={inputStyles}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        keyboardType={!keyboardType ? "default" : keyboardType}
        textContentType={textContentType}
        autoCapitalize={!autoCapitalize ? "none" : autoCapitalize}
        onBlur={onBlur}
        secureTextEntry={!!placeholder.match("password")}
      />

      {isValid !== null && (
        <MaterialIcons
          name={isValid ? "check-circle" : isValid === false && "cancel"}
          size={20}
          color={onCheckColor(isValid)}
        />
      )}
    </View>
  );
}
export default useInput;
