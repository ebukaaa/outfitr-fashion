import { forwardRef, useStore } from "./utils";

export const useInput = forwardRef(
  (
    {
      style,
      icon,
      placeholder,
      keyboardType,
      autoCapitalize,
      textContentType,
      returnKeyType,
      onValidate,
      onChangeText,
      onSubmitEditing,
    },
    ref
  ) => {
    const {
      styles: { containerStyles, inputStyles, placeholderTextColor },
      isValid,
      onCheckText,
      onCheckColor,
      View,
      TextInput,
      MaterialIcons,
    } = useStore({ style, onValidate });

    // useEffect(() => {
    //   console.log(ref?.current?.focus);
    // }, [ref]);

    return (
      <View style={containerStyles}>
        <MaterialIcons name={icon} size={15} color={onCheckColor(isValid)} />

        <TextInput
          style={inputStyles}
          ref={ref}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          keyboardType={!keyboardType ? "default" : keyboardType}
          textContentType={textContentType}
          autoCapitalize={!autoCapitalize ? "none" : autoCapitalize}
          secureTextEntry={!!placeholder.match("password")}
          returnKeyType={returnKeyType}
          onBlur={onCheckText.bind(this, placeholder)}
          onChange={onCheckText.bind(this, placeholder)}
          onChangeText={
            onChangeText && onChangeText.bind(this, textContentType)
          }
          onSubmitEditing={onSubmitEditing}
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
);
export default useInput;
