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
import { bool, func, number, objectOf, string } from "prop-types";
import { useNavigation } from "@react-navigation/native";
import styleName from "./style.module.scss";

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
const onSlide = (index, navigate, slideIndex) => {
  const newSlideIndex = slideIndex;
  if (index === sliders.length - 1) navigate("Welcome");
  else newSlideIndex.value += 1;
};
export default function Onboarding() {
  const slideIndex = useSharedValue(0);
  const { navigate } = useNavigation();
  const { topScrollRef, bottomScrollRef } = {
    topScrollRef: useAnimatedRef(),
    bottomScrollRef: useAnimatedRef(),
  };
  const { progress } = {
    ...useDerivedValue(() => {
      scrollTo(bottomScrollRef, slideIndex.value * width, 0, true);
      scrollTo(topScrollRef, slideIndex.value * width, 0, true);
    }),
    progress: useDerivedValue(
      () => withTiming(sliders.map((_, i) => i * width)[slideIndex.value]),
      [slideIndex, width]
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
        slideIndex.value = 0;
      } else if (x === width) {
        slideIndex.value = 1;
      } else if (x === sliders.map((_, i) => i * width)[2]) {
        slideIndex.value = 2;
      } else if (x === sliders.map((_, i) => i * width)[3]) {
        slideIndex.value = 3;
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
        style={[styleName.topScroll, animatedBackgroundColor]}
        snapToInterval={width}
        ref={topScrollRef}
        onEndDrag={onScroll}
      >
        {sliders.map(({ id }, index) => (
          <TopSlide key={id} title={id} isRight={!!(index % 2)} />
        ))}
      </Animated.ScrollView>

      <Animated.View style={[styleName.bottomScroll, animatedFooter]}>
        <View style={styleName.pagination}>
          {sliders.map(({ id }, index) => (
            <Dot key={id} index={index} slideIndex={slideIndex} />
          ))}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          ref={bottomScrollRef}
          style={styleName.footer}
        >
          {sliders.map(({ subtitle, description }, index) => (
            <BottomSlide
              key={subtitle}
              subtitle={subtitle}
              description={description}
              isLast={index === sliders.length - 1}
              onPress={onSlide.bind(null, index, navigate, slideIndex)}
            />
          ))}
        </ScrollView>
      </Animated.View>
    </>
  );
}

const topSlideStyles = create({ s: [styleName.topSlide, { width }] }).s;
function TopSlide({ title, isRight }) {
  return (
    <View style={topSlideStyles}>
      <Text
        style={[
          styleName.title,
          { left: +`${isRight ? "+" : "-"}${width / 3}` },
        ]}
      >
        {title}
      </Text>
    </View>
  );
}
TopSlide.propTypes = { title: string.isRequired, isRight: bool.isRequired };

function Dot({ index, slideIndex }) {
  const input = useDerivedValue(() => withTiming(slideIndex.value), []);
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

  return <Animated.View style={[styleName.dot, animatedDot]} />;
}
Dot.propTypes = {
  index: number.isRequired,
  slideIndex: objectOf(number).isRequired,
};

const bottomSlideStyles = create({ s: [styleName.bottomSlide, { width }] }).s;
function BottomSlide({ isLast, subtitle, description, onPress }) {
  return (
    <View style={bottomSlideStyles}>
      <Text style={styleName.subtitle}>{subtitle}</Text>
      <Text style={styleName.description}>{description}</Text>

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
