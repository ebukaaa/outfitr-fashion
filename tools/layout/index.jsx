import { useStore } from "./utils";

export function useLayout({ containerStyle, contentStyle, children }) {
  const {
    styles: {
      containerStyles,
      coverStyles: { wrapperStyles, containerStyles: coverStyles },
      childrenStyles: { containerStyles: childrenStyles, contentStyles },
    },
    Animated,
    View,
    TouchableWithoutFeedback,
    Cover,
    Footer,
    onDismissKeyboard,
  } = useStore({ containerStyle, contentStyle });

  return (
    <TouchableWithoutFeedback onPress={onDismissKeyboard}>
      <Animated.View style={containerStyles}>
        <Animated.View style={wrapperStyles}>
          <Cover />
        </Animated.View>

        <View style={childrenStyles}>
          <Cover style={coverStyles} />

          <Animated.View style={contentStyles}>{children}</Animated.View>

          <Footer />
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

export { useProps as useFooterProps } from "./footer/utils";
export default useLayout;
