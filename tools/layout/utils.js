import { useMemo } from "react";
import {
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import Svg, { Path, G } from "react-native-svg";
import { cetaceanBlue } from "tools/styles/colors";

export function useStore() {
  return {
    Wrapper: useMemo(() => {
      function useWrapper({ children, Footer }) {
        const { width, height } = useWindowDimensions();

        function useCover({ style }) {
          return (
            <Svg
              height={0.28 * height}
              viewBox="1 1 375 191"
              width={width}
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              style={style}
            >
              <G fill="none" fillRule="evenodd">
                <Path d="M375.5 1v188H.5V1z" fill="#ececf4" />
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
        }

        const Cover = useCover;
        const { create, absoluteFill } = useMemo(() => StyleSheet, []);
        const {
          containerStyles,
          coverStyles: { wrapperStyles, containerStyles: coverStyles },
          childrenStyles: { containerStyles: childrenStyles, contentStyles },
        } = useMemo(
          () => ({
            ...create({
              containerStyles: { flex: 1 },
            }),
            coverStyles: create({
              containerStyles: {
                ...absoluteFill,
                top: -height * 0.2,
              },
              wrapperStyles: {
                borderBottomLeftRadius: 75,
                overflow: "hidden",
                borderColor: "transparent",
                height: "20%",
              },
            }),
            childrenStyles: create({
              containerStyles: {
                flex: 1,
                overflow: "hidden",
                backgroundColor: cetaceanBlue(),
              },
              contentStyles: {
                height: "78%",
                borderRadius: 75,
                backgroundColor: "white",
                borderTopLeftRadius: 0,
              },
            }),
          }),
          [absoluteFill, height, create]
        );

        return (
          <View style={containerStyles}>
            <View style={wrapperStyles}>
              <Cover />
            </View>

            <View style={childrenStyles}>
              <Cover style={coverStyles} />

              <View style={contentStyles}>{children}</View>

              {Footer && <Footer />}
            </View>
          </View>
        );
      }
      return useWrapper;
    }, []),
    SafeAreaView,
  };
}
