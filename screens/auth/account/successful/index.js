import { Text, View } from "react-native";
import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Button } from "components";
import { func } from "prop-types";
import className from "./style.module.scss";

const texts = [
  { label: "Your password was successfully changed", style: "title" },
  { label: "Close this window and login again", style: "body" },
];
export default function Successful({ onChangeView }) {
  const { setOptions } = useNavigation();

  useLayoutEffect(() => {
    setOptions({ contentStyle: className.content });
  }, [setOptions]);

  return (
    <>
      <View style={className.successful}>
        <FontAwesome5 name="check" size={20} style={className.icon} />
      </View>

      {texts.map(({ label, style }) => (
        <Text key={label} style={className[style]}>
          {label}
        </Text>
      ))}

      <Button label="Login again" variant="primary" onPress={onChangeView} />
    </>
  );
}
Successful.propTypes = { onChangeView: func.isRequired };
