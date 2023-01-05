import {
  Dimensions,
  Keyboard,
  Linking,
  Text,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { memo, useLayoutEffect, useState } from "react";
import Svg, { G, Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { node, objectOf } from "prop-types";
import Google from "assets/svgs/google.svg";
import config from "styles/config";
import styleName from "./style.module.scss";

const { height, width } = Dimensions.get("window");

export const Layout = memo(
  ({ containerStyle, contentStyle, children }) => {
    Layout.yTranslate = useSharedValue(0);
    Layout.navigate = useNavigation().navigate;

    const animatedYTranslate = useAnimatedStyle(() => ({
      transform: [{ translateY: withSpring(Layout.yTranslate.value, config) }],
    }));

    useLayoutEffect(() => {
      Layout.displayName = "Layout";
      Keyboard.addListener(
        "keyboardWillShow",
        ({ endCoordinates: { height: keyboardHeight } }) => {
          Layout.yTranslate.value = -keyboardHeight / 2;
        }
      );
      return () => Keyboard.removeAllListeners("keyboardWillShow");
    }, []);

    return (
      <TouchableWithoutFeedback onPress={Layout.onDismissKeyboard}>
        <Animated.View style={[styleName.container, animatedYTranslate]}>
          <Animated.View style={[styleName.wrapper, containerStyle]}>
            <Layout.Cover />
          </Animated.View>

          <View style={styleName.children}>
            <Layout.Cover style={styleName.cover} />

            <Animated.View style={[styleName.content, contentStyle]}>
              {children}
            </Animated.View>

            <Footer />
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  },
  () => true
);
Layout.propTypes = {
  containerStyle: objectOf(String),
  contentStyle: objectOf(String),
  children: node.isRequired,
};
Layout.defaultProps = {
  containerStyle: null,
  contentStyle: null,
};
Layout.onDismissKeyboard = () => {
  Keyboard.dismiss();
  Layout.yTranslate.value = 0;
};
Layout.Cover = function useCover({
  style,
  width: customWidth,
  height: customHeight,
  backgroundFill,
}) {
  return (
    <Svg
      height={0.28 * (customHeight || height)}
      viewBox="1 1 375 191"
      width={customWidth || width}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      style={style}
    >
      <G fill="none" fillRule="evenodd">
        <Path d="M375.5 1v188H.5V1z" fill={backgroundFill || "#ececf4"} />
        <Path
          d="M251 95.722v31.5h-63v-31.5c0-17.397 14.103-31.5 31.5-31.5s31.5 14.103 31.5 31.5z"
          fill="#111747"
        />
        <Path d="M251 127.222v63h-63v-63z" fill="#111747" />
        <Path
          d="M313 158.722c0 17.397-14.103 31.5-31.5 31.5H250v-31.5c0-17.397 14.103-31.5 31.5-31.5s31.5 14.103 31.5 31.5zM64 158.722c0 17.397-14.103 31.5-31.5 31.5H1v-63h31.5c17.397 0 31.5 14.103 31.5 31.5z"
          fill="#ff87a2"
        />
        <Path
          d="M189 95.722v31.5h-31.5c-17.397 0-31.5-14.103-31.5-31.5s14.103-31.5 31.5-31.5 31.5 14.103 31.5 31.5z"
          fill="#2cb9b0"
        />
        <Path
          d="M189 190.222v-63c17.12 0 31 14.103 31 31.5s-13.88 31.5-31 31.5z"
          fill="#fe5e33"
        />
        <Path d="M189 127.222v63h-63v-63z" fill="#ffc641" />
        <Path
          d="M127 127.222v63H95.5c-17.397 0-31.5-14.103-31.5-31.5s14.103-31.5 31.5-31.5z"
          fill="#ffc641"
        />
        <Path d="M63.5 1v63H.5V1z" fill="#111747" />
        <Path d="M313 1.222v63h-63v-63z" fill="#2cb9b0" />
        <Path d="M189 1.222v63h-63v-63z" fill="#fe5e33" />
        <G fill="#ff87a2">
          <Path d="M251 1.222v63h-63v-63zM251 64.222v63c-17.12 0-31-14.103-31-31.5s13.88-31.5 31-31.5z" />
          <Path d="M313 64.222v63h-63v-63zM313 127.222v-63c17.12 0 31 14.103 31 31.5s-13.88 31.5-31 31.5z" />
        </G>
        <Path
          d="M376 127.222c-17.12 0-31-13.879-31-31 17.12 0 31 13.88 31 31z"
          fill="#06818e"
        />
        <Path
          d="M313 64.222c17.12 0 31 13.88 31 31-17.12 0-31-13.879-31-31z"
          fill="#111747"
        />
        <Path
          d="M254 111.722c5.49-9.266 15.75-15.5 27.5-15.5 11.751 0 22.01 6.234 27.5 15.5-5.49 9.266-15.749 15.5-27.5 15.5-11.75 0-22.01-6.234-27.5-15.5z"
          fill="#fff"
        />
        <Path
          d="M313 64.222c-17.12 0-31-13.879-31-31 17.12 0 31 13.88 31 31z"
          fill="#ffc641"
        />
        <Path
          d="M126 64.222h63c0 17.121-14.103 31-31.5 31s-31.5-13.879-31.5-31z"
          fill="#fe5e33"
        />
        <Path
          d="M126 1.222c17.12 0 31 13.88 31 31-17.12 0-31-13.879-31-31z"
          fill="#2cb9b0"
        />
        <Path
          d="M376 1.222v63h-63v-63zM252 1.222c17.12 0 31 13.88 31 31-17.12 0-31-13.879-31-31z"
          fill="#06818e"
        />
        <Path
          d="M68 48.472c5.49-9.415 15.75-15.75 27.5-15.75s22.01 6.335 27.5 15.75c-5.49 9.416-15.75 15.75-27.5 15.75S73.49 57.888 68 48.472zm0-31.5c5.49-9.415 15.75-15.75 27.5-15.75s22.01 6.335 27.5 15.75c-5.49 9.416-15.75 15.75-27.5 15.75S73.49 26.388 68 16.972zM127 127.222v63H64v-63z"
          fill="#2cb9b0"
        />
        <Path d="M157 95.222v63H94v-63z" fill="#fff" />
        <Path d="M189 127.222v63h-63v-63z" fill="#fe5e33" />
        <Path
          d="M235 158.722c0 8.56-6.94 15.5-15.5 15.5s-15.5-6.94-15.5-15.5 6.94-15.5 15.5-15.5 15.5 6.94 15.5 15.5z"
          fill="#ffc641"
        />
        <Path
          d="M235 32.722c0 8.56-6.94 15.5-15.5 15.5s-15.5-6.94-15.5-15.5c0-8.56 6.94-15.5 15.5-15.5s15.5 6.94 15.5 15.5z"
          fill="#111747"
        />
        <Path
          d="M111 95.722c0 8.56-6.94 15.5-15.5 15.5s-15.5-6.94-15.5-15.5c0-8.56 6.94-15.5 15.5-15.5s15.5 6.94 15.5 15.5z"
          fill="#2cb9b0"
        />
        <Path
          d="M111 32.722c0 8.56-6.94 15.5-15.5 15.5S80 41.282 80 32.722c0-8.56 6.94-15.5 15.5-15.5s15.5 6.94 15.5 15.5z"
          fill="#fe5e33"
        />
        <Path
          d="M173 95.722c0 8.56-6.94 15.5-15.5 15.5s-15.5-6.94-15.5-15.5c0-8.56 6.94-15.5 15.5-15.5s15.5 6.94 15.5 15.5z"
          fill="#111747"
        />
        <Path
          d="M376 127.222v63h-31.5c-17.397 0-31.5-14.103-31.5-31.5s14.103-31.5 31.5-31.5z"
          fill="#06818e"
        />
        <G fill="#fe5e33">
          <Path d="M345 157.222c17.12 0 31 13.88 31 31-17.12 0-31-13.879-31-31zM63.5 64v63H.5V64z" />
          <Path d="M63 127.222v-63c17.12 0 31 14.103 31 31.5s-13.88 31.5-31 31.5z" />
        </G>
        <Path
          d="M33 33.222c17.12 0 31 13.88 31 31-17.12 0-31-13.879-31-31z"
          fill="#2cb9b0"
        />
        <Path
          d="M344 1.222c17.397 0 31.5 14.103 31.5 31.5-17.397 0-31.5-14.103-31.5-31.5zm31.5 31.5c0 17.397-14.103 31.5-31.5 31.5 0-17.397 14.103-31.5 31.5-31.5z"
          fill="#111747"
        />
        <Path
          d="M157 190.222c-17.397 0-31.5-14.103-31.5-31.5 17.397 0 31.5 14.103 31.5 31.5zm-63-63c17.397 0 31.5 14.103 31.5 31.5-17.397 0-31.5-14.103-31.5-31.5zm31.5 31.5c0-17.397 14.103-31.5 31.5-31.5 0 17.397-14.103 31.5-31.5 31.5zm0 0c0 17.397-14.103 31.5-31.5 31.5 0-17.397 14.103-31.5 31.5-31.5z"
          fill="#2cb9b0"
        />
      </G>
    </Svg>
  );
};

const socials = ["facebook", "google", "apple"];
const link = {
  create() {
    const {
      setText = () => {},
      onNavigate = () => {},
      navigate,
    } = Layout || {};
    setText((old) => ({
      ...old,
      label: "Already have an account",
      url: "Login here",
    }));
    onNavigate("Create", navigate);
  },
  login() {
    const { setText = () => {}, onNavigate, navigate } = Layout || {};
    setText((old) => ({
      ...old,
      label: "Don't have an account",
      url: "Create one here",
    }));
    onNavigate("Login", navigate);
  },
  try() {
    Linking.openURL("mailto:help@support.com");
  },
};
const onTextPress = () =>
  link[String(Layout.text.url).toLowerCase().split(" ")[0]]();
function Footer() {
  [Layout.footer, Layout.setFooter] = useState();
  return (
    Layout.footer || (
      <View style={styleName.footer}>
        <View style={styleName.social}>
          {socials.map((logo) => (
            <Footer.Logo key={logo}>
              {logo !== "google" ? (
                <FontAwesome name={logo} size={20} />
              ) : (
                <Google width={20} height={20} />
              )}
            </Footer.Logo>
          ))}
        </View>

        <Footer.Text />
      </View>
    )
  );
}
Footer.Logo = function useLogo({ children }) {
  return <View style={styleName.logo}>{children}</View>;
};
Footer.Text = function useText() {
  [Layout.text, Layout.setText] = useState({
    label: "Don't have an account",
    url: "Create one here",
  });
  return (
    <Text style={styleName.outerText} onPress={onTextPress}>
      {Layout.text.label}?{" "}
      <Text style={styleName.innerText}>{Layout.text.url}</Text>
    </Text>
  );
};
