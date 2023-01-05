import { forwardRef, useState } from "react";
import { TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { arrayOf, bool, func, string } from "prop-types";
import styleName from "./style.module.scss";

const onCheckText = (
  placeholder,
  validate,
  onValidate,
  { nativeEvent: { text } }
) => {
  if (!text) {
    validate((old) => (old === undefined ? old : undefined));
    return;
  }

  function validity(old) {
    const isValid = onValidate(text.trim());
    return old === isValid ? old : isValid;
  }

  if (placeholder.match("password")) {
    setTimeout(validate, 500, validity);
    return;
  }
  validate(validity);
};
export const Input = forwardRef(function useInput(
  {
    style,
    icon,
    placeholder,
    keyboardType,
    textContentType,
    returnKeyType,
    autoCapitalize,
    onValidate,
    onChangeText,
    onSubmitEditing,
  },
  ref
) {
  const [isValid, validate] = useState();

  return (
    <View style={[styleName.input, styleName[`${isValid}Tint`], style]}>
      <MaterialIcons
        name={icon}
        size={15}
        style={styleName[`${isValid}Icon`]}
      />

      <TextInput
        style={styleName.text}
        ref={ref}
        placeholder={placeholder}
        placeholderTextColor="rgba(21,22,36,0.5)"
        keyboardType={!keyboardType ? "default" : keyboardType}
        textContentType={textContentType}
        autoCapitalize={!autoCapitalize ? "none" : autoCapitalize}
        secureTextEntry={!!placeholder.match("password")}
        returnKeyType={returnKeyType}
        onBlur={onCheckText.bind(this, placeholder, validate, onValidate)}
        onChange={onCheckText.bind(this, placeholder, validate, onValidate)}
        onChangeText={onChangeText && onChangeText.bind(this, textContentType)}
        onSubmitEditing={onSubmitEditing}
      />

      {isValid !== undefined && (
        <MaterialIcons
          name={isValid ? "check-circle" : isValid === false && "cancel"}
          size={20}
          style={styleName[`${isValid}Icon`]}
        />
      )}
    </View>
  );
});
Input.propTypes = {
  style: arrayOf(Object),
  icon: string.isRequired,
  placeholder: string,
  keyboardType: string,
  textContentType: string,
  returnKeyType: string,
  autoCapitalize: bool,
  onValidate: func,
  onChangeText: func,
  onSubmitEditing: func,
};
Input.defaultProps = {
  style: undefined,
  placeholder: undefined,
  keyboardType: undefined,
  textContentType: undefined,
  returnKeyType: undefined,
  autoCapitalize: undefined,
  onValidate: undefined,
  onChangeText: undefined,
  onSubmitEditing: undefined,
};
export default Input;
