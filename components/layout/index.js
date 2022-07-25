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
import config from "styles/config";
import { node, objectOf } from "prop-types";
import { memo, useLayoutEffect, useState } from "react";
import Svg, { G, Path } from "react-native-svg";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import className from "./style.module.scss";

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
        <Animated.View style={[className.container, animatedYTranslate]}>
          <Animated.View style={[className.wrapper, containerStyle]}>
            <Layout.Cover />
          </Animated.View>

          <View style={className.children}>
            <Layout.Cover style={className.cover} />

            <Animated.View style={[className.content, contentStyle]}>
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
Layout.onDismissKeyboard = function onDismissKeyboard() {
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
function Footer() {
  [Layout.footer, Layout.setFooter] = useState();
  return (
    Layout.footer || (
      <View style={className.footer}>
        <View style={className.social}>
          {socials.map((logo) => (
            <Footer.Logo key={logo}>
              {logo !== "google" ? (
                <FontAwesome name={logo} size={20} />
              ) : (
                <Footer.Google size={20} />
              )}
            </Footer.Logo>
          ))}
        </View>

        <Footer.Text />
      </View>
    )
  );
}
Footer.Google = function useGoogle({ size }) {
  return (
    <Svg
      height={size}
      viewBox="0 0 512 512"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M507.879 208.612a4.121 4.121 0 014.121 4.121V256c0 16.194-1.504 32.028-4.389 47.388-22.317 119.309-127.427 209.474-253.416 208.605C112.826 511.019-.312 396.794.001 255.423.312 114.306 114.81 0 256 0c69.173 0 131.935 27.442 178.014 72.018 1.664 1.609 1.707 4.261.07 5.897l-61.211 61.211a4.108 4.108 0 01-5.737.08c-28.921-27.529-68.051-44.43-111.136-44.43-88.971 0-160.616 71.136-161.22 160.105-.607 89.553 71.809 162.342 161.22 162.342 72.545 0 133.903-47.924 154.136-113.835H260.121a4.121 4.121 0 01-4.121-4.121v-86.535a4.121 4.121 0 014.121-4.121h247.758z"
        fill="#2196f3"
      />
      <Path
        d="M507.879 208.612h-30.905a4.121 4.121 0 014.121 4.121V256c0 16.194-1.504 32.028-4.389 47.388-21.291 113.822-117.936 201.117-236.175 208.15 4.524.267 9.078.423 13.664.455 125.99.869 231.099-89.297 253.416-208.605A256.485 256.485 0 00512 256v-43.268a4.12 4.12 0 00-4.121-4.12z"
        fill="#1e88e5"
      />
      <Path
        d="M109.56 188.482l-77.748-56.176C75.43 53.415 159.482 0 256 0c69.173 0 131.935 27.442 178.014 72.018 1.664 1.609 1.707 4.261.07 5.897l-61.211 61.211c-1.573 1.573-4.119 1.622-5.73.088C338.222 111.68 299.089 94.777 256 94.777c-64.932 0-120.902 38.384-146.44 93.705z"
        fill="#f44336"
      />
      <Path
        d="M87.115 172.265l22.445 16.217c23.31-50.494 71.978-86.86 129.668-92.825.434-.047.851-.104 1.293-.146a163.167 163.167 0 00-15.426-.734c-58.657 0-109.777 30.923-137.98 77.488zM403.109 72.018c1.664 1.609 1.707 4.261.07 5.898l-49.683 49.683c4.76 3.62 9.316 7.492 13.64 11.608a4.108 4.108 0 005.737-.08l61.211-61.211c1.637-1.637 1.593-4.288-.07-5.898C387.935 27.442 325.173 0 256 0c-5.191 0-10.341.173-15.455.478 63.04 3.755 119.941 30.308 162.564 71.54z"
        fill="#e53935"
      />
      <Path
        d="M443.792 429.977C397.042 480.425 330.204 512 256 512c-100.226 0-186.998-57.597-229.02-141.506l79.375-54.394C130.174 375.367 188.204 417.223 256 417.223c42.546 0 81.24-16.483 110.044-43.412z"
        fill="#4caf50"
      />
      <Path
        d="M106.356 316.101L82.95 332.14c27.185 50.644 80.644 85.083 142.145 85.083 5.201 0 10.342-.255 15.417-.736-61.049-5.82-112.174-45.687-134.156-100.386zM256 512c74.204 0 141.042-31.575 187.792-82.023l-19.043-13.757c-43.896 54.63-109.746 90.871-184.163 95.314 5.1.304 10.238.466 15.414.466z"
        fill="#43a047"
      />
      <Path
        d="M94.777 256c0 21.242 4.11 41.527 11.579 60.101L26.98 370.494C9.715 336.045 0 297.156 0 256c0-44.864 11.538-87.03 31.812-123.694l77.748 56.176c-9.488 20.531-14.783 43.412-14.783 67.518z"
        fill="#ffc107"
      />
      <Path
        d="M82.95 332.14l23.406-16.039C98.887 297.527 94.777 277.242 94.777 256c0-24.106 5.295-46.987 14.783-67.518l-22.445-16.217c-14.575 24.065-23.034 52.304-23.24 82.617-.19 27.954 6.737 54.275 19.075 77.258z"
        fill="#ffb300"
      />
    </Svg>
  );
};
Footer.Logo = function useLogo({ children }) {
  return <View style={className.logo}>{children}</View>;
};
Footer.Text = function useText() {
  [Layout.text, Layout.setText] = useState({
    label: "Don't have an account",
    url: "Create one here",
  });
  return (
    <Text style={className.outerText} onPress={Footer.onPress}>
      {Layout.text.label}?{" "}
      <Text style={className.innerText}>{Layout.text.url}</Text>
    </Text>
  );
};
Footer.onPress = function onPress() {
  const { link } = Footer;
  link[String(Layout.text.url).toLowerCase().split(" ")[0]]();
};
Footer.link = {
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
