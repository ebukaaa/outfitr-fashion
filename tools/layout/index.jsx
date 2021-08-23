import { useStore } from "./utils";

export function useLayout({
  containerStyle,
  contentStyle,
  children,
  footerChildren,
  Footer: CustomFooter,
}) {
  const {
    styles: {
      containerStyles,
      coverStyles: { wrapperStyles, containerStyles: coverStyles },
      childrenStyles: { containerStyles: childrenStyles, contentStyles },
    },
    Animated,
    View,
    TouchableWithoutFeedback,
    AnimatedKeyboardAvoidingView,
    Cover,
    Footer,
    onDismissKeyboard,
  } = useStore({ containerStyle, contentStyle });

  return (
    <View style={containerStyles}>
      <Animated.View style={wrapperStyles}>
        <Cover />
      </Animated.View>

      <View style={childrenStyles}>
        <Cover style={coverStyles} />

        <TouchableWithoutFeedback onPress={onDismissKeyboard}>
          <AnimatedKeyboardAvoidingView
            behavior="height"
            style={contentStyles}
            keyboardVerticalOffset={10}
          >
            {children}
          </AnimatedKeyboardAvoidingView>
        </TouchableWithoutFeedback>

        {!CustomFooter ? <Footer>{footerChildren}</Footer> : <CustomFooter />}
      </View>
    </View>
  );
}

export default useLayout;
