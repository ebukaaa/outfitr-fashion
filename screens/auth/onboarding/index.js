import { useMemo } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Button } from "components";
import { bool, func, number, string } from "prop-types";
import { useNavigation } from "@react-navigation/native";
import className from "./style.module.scss";

const { create } = StyleSheet;
const { width } = Dimensions.get("window");

const sliders = [
  {
    id: "Relaxed",
    color: "#bfeaf5",
    subtitle: "Find Your Outfits",
    description:
      "Confused about your outfit? Don't worry!\nFind the best outfit here!",
    image: "",
  },
  {
    id: "Playful",
    color: "#beecc4",
    subtitle: "Hear it First, Wear it First",
    description:
      "Hating the clothes in your wardrobe?\nExplore hundreds of outfit ideas",
    image: "",
  },
  {
    id: "Excentric",
    color: "#ffe4d9",
    subtitle: "Your Style, Your Way",
    description:
      "Create your individual & unique style and look amazing everyday",
    image: "",
  },
  {
    id: "Funky",
    color: "#ffdddd",
    subtitle: "Look Good, Feel Good",
    description:
      "Discover the latest trends in fashion and explore your personality",
    image: "",
  },
];
export default function Onboarding() {
  Onboarding.slideIndex = useSharedValue(0);
  const { navigate } = useNavigation();
  const { topScrollRef, bottomScrollRef } = {
    topScrollRef: useAnimatedRef(),
    bottomScrollRef: useAnimatedRef(),
  };
  const { progress } = {
    ...useDerivedValue(() => {
      scrollTo(bottomScrollRef, Onboarding.slideIndex.value * width, 0, true);
      scrollTo(topScrollRef, Onboarding.slideIndex.value * width, 0, true);
    }),
    progress: useDerivedValue(
      () =>
        withTiming(
          sliders.map((_, i) => i * width)[Onboarding.slideIndex.value]
        ),
      [Onboarding.slideIndex, width]
    ),
  };
  const { animatedBackgroundColor, animatedFooter } = {
    animatedBackgroundColor: useAnimatedStyle(() => ({
      backgroundColor: interpolateColor(
        progress.value,
        sliders.map((_, i) => i * width),
        sliders.map(({ color }) => color)
      ),
    })),
    animatedFooter: useAnimatedStyle(() => ({
      backgroundColor: interpolateColor(
        progress.value,
        sliders.map((_, i) => i * width),
        sliders.map(({ color }) => color)
      ),
    })),
  };
  const onScroll = useAnimatedScrollHandler({
    onEndDrag({ targetContentOffset: { x } }) {
      if (x === 0) {
        Onboarding.slideIndex.value = 0;
      } else if (x === width) {
        Onboarding.slideIndex.value = 1;
      } else if (x === sliders.map((_, i) => i * width)[2]) {
        Onboarding.slideIndex.value = 2;
      } else if (x === sliders.map((_, i) => i * width)[3]) {
        Onboarding.slideIndex.value = 3;
      }
    },
  });

  return (
    <>
      <Animated.ScrollView
        horizontal
        decelerationRate="fast"
        scrollEventThrottle={1}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        style={[className.topScroll, animatedBackgroundColor]}
        snapToInterval={width}
        ref={topScrollRef}
        onEndDrag={onScroll}
      >
        {sliders.map(({ id }, index) => (
          <TopSlide key={id} title={id} isRight={!!(index % 2)} />
        ))}
      </Animated.ScrollView>

      <Animated.View style={[className.bottomScroll, animatedFooter]}>
        <View style={className.pagination}>
          {sliders.map(({ id }, index) => (
            <Dot key={id} index={index} />
          ))}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          ref={bottomScrollRef}
          style={className.footer}
        >
          {sliders.map(({ subtitle, description }, index) => (
            <BottomSlide
              key={subtitle}
              subtitle={subtitle}
              description={description}
              isLast={index === sliders.length - 1}
              onPress={Onboarding.onSlide.bind(null, index, navigate)}
            />
          ))}
        </ScrollView>
      </Animated.View>
    </>
  );
}
Onboarding.onSlide = function onSlide(index, navigate) {
  if (index === sliders.length - 1) navigate("Welcome");
  else Onboarding.slideIndex.value += 1;
};

const topSlideStyles = create({ container: { width } });
function TopSlide({ title, isRight }) {
  const titleStyles = useMemo(
    () =>
      create({ style: { left: +`${isRight ? "+" : "-"}${width / 3}` } }).style,
    [isRight]
  );

  return (
    <View style={[className.topSlide, topSlideStyles.container]}>
      <Text style={[className.title, titleStyles]}>{title}</Text>
    </View>
  );
}
TopSlide.propTypes = { title: string.isRequired, isRight: bool.isRequired };

function Dot({ index }) {
  const input = useDerivedValue(
    () => withTiming(Onboarding.slideIndex.value),
    []
  );
  const animatedDot = useAnimatedStyle(() => ({
    opacity: interpolate(
      input.value,
      [index - 1, index, index + 1],
      [0.5, 1, 0.5],
      Extrapolate.CLAMP
    ),
    transform: [
      {
        scale: interpolate(
          input.value,
          [index - 1, index, index + 1],
          [1, 1.25, 1],
          Extrapolate.CLAMP
        ),
      },
    ],
  }));

  return <Animated.View style={[className.dot, animatedDot]} />;
}
Dot.propTypes = { index: number.isRequired };

const bottomSlideStyles = create({ container: { width } });
function BottomSlide({ isLast, subtitle, description, onPress }) {
  return (
    <View style={[className.bottomSlide, bottomSlideStyles.container]}>
      <Text style={className.subtitle}>{subtitle}</Text>
      <Text style={className.description}>{description}</Text>

      <Button
        label={isLast ? "Let's get started" : "Next"}
        onPress={onPress}
        variant={isLast ? "primary" : "secondary"}
      />
    </View>
  );
}
BottomSlide.propTypes = {
  isLast: bool.isRequired,
  subtitle: string.isRequired,
  description: string.isRequired,
  onPress: func.isRequired,
};
