import { useLayoutEffect, useMemo } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useLayout, useSocials as Socials } from "tools";
import { lightSeaGreen } from "tools/styles/colors";
import { setStatusBarStyle } from "expo-status-bar";

export function useStore() {
  useLayoutEffect(() => {
    setStatusBarStyle("light");
    return () => setStatusBarStyle("dark");
  });

  return {
    Layout: useLayout,
    Footer: useMemo(() => {
      function useFooter() {
        const { create } = useMemo(() => StyleSheet, []);
        const {
          footerStyles,
          textStyles: { containerStyles: textStyles, innerStyles },
        } = useMemo(
          () => ({
            ...create({
              footerStyles: {
                flex: 1,
                justifyContent: "center",
              },
            }),
            textStyles: create({
              containerStyles: {
                color: "white",
                textAlign: "center",
                paddingTop: 12,
                fontFamily: "SFProDisplayRegular",
              },
              innerStyles: {
                color: lightSeaGreen(),
              },
            }),
          }),
          [create]
        );

        return (
          <View style={footerStyles}>
            <Socials />

            <Text style={textStyles}>
              Don&apos;t have an account?{" "}
              <Text style={innerStyles}>Sign Up here</Text>
            </Text>
          </View>
        );
      }
      return useFooter;
    }, []),
  };
}
