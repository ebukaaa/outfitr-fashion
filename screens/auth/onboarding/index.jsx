import { useStore } from "./utils";

export function useOnboarding() {
  const {
    styles: {
      sliderStyles,
      footerStyles: {
        animatedFooter,
        containerStyles: footerStyles,
        paginationStyles,
      },
    },
    width,
    sliders,
    topScrollRef,
    bottomScrollRef,
    ScrollView,
    Animated,
    View,
    Dot,
    Slider,
    Slide,
    onScroll,
    onSlide,
  } = useStore();

  return (
    <>
      <Animated.ScrollView
        horizontal
        decelerationRate="fast"
        style={sliderStyles}
        snapToInterval={width}
        ref={topScrollRef}
        scrollEventThrottle={1}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onEndDrag={onScroll}
      >
        {sliders.map(({ id }, index) => (
          <Slider key={id} title={id} isRight={!!(index % 2)} />
        ))}
      </Animated.ScrollView>

      <Animated.View style={animatedFooter}>
        <View style={paginationStyles}>
          {sliders.map((_, index) => (
            <Dot key={String(index)} index={index} />
          ))}
        </View>

        <ScrollView
          horizontal
          ref={bottomScrollRef}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          style={footerStyles}
        >
          {sliders.map(({ subtitle, description }, index) => (
            <Slide
              key={subtitle}
              subtitle={subtitle}
              description={description}
              isLast={index === sliders.length - 1}
              onPress={onSlide.bind(null, index)}
            />
          ))}
        </ScrollView>
      </Animated.View>
    </>
  );
}
