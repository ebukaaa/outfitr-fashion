import { useCallback, useMemo } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
  useAnimatedRef,
  scrollTo,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { lightSeaGreen } from "tools/styles/colors";
import {
  titleStyles as defaultTitleStyles,
  heroStyles,
  bodyStyles,
} from "tools/styles/text";
import { useButton as Button } from "tools";
import { useNavigation } from "@react-navigation/native";

export function useStore() {
  const { absoluteFillObject, sliders, create } = useMemo(
    () => ({
      ...StyleSheet,
      sliders: [
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
      ],
    }),
    []
  );
  const { width } = useWindowDimensions();
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

  return {
    styles: useMemo(
      () => ({
        sliderStyles: [
          create({
            style: {
              height: "61%",
              borderBottomRightRadius: 75,
              borderColor: "transparent",
            },
          }).style,
          animatedBackgroundColor,
        ],
        footerStyles: {
          animatedFooter,
          ...create({
            containerStyles: {
              backgroundColor: "white",
              height: "39%",
              borderTopLeftRadius: 75,
              borderColor: "transparent",
            },
          }),
          paginationStyles: [
            absoluteFillObject,
            create({
              style: {
                height: 40,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1,
              },
            }).style,
          ],
        },
      }),
      [absoluteFillObject, animatedFooter, animatedBackgroundColor, create]
    ),
    width,
    sliders,
    topScrollRef,
    bottomScrollRef,
    View,
    ScrollView,
    Animated,
    Dot: useMemo(() => {
      function useDot({ index }) {
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
        const { containerStyles } = useMemo(
          () => ({
            containerStyles: [
              create({
                style: {
                  backgroundColor: lightSeaGreen(),
                  borderRadius: 4,
                  height: 6,
                  width: 6,
                  margin: 4,
                },
              }).style,
              animatedDot,
            ],
          }),
          [animatedDot]
        );

        return <Animated.View style={containerStyles} />;
      }

      return useDot;
    }, [slideIndex, create]),
    Slider: useMemo(() => {
      function useSlider({ title, isRight }) {
        const { containerStyles, titleStyles } = useMemo(
          () => ({
            ...create({
              containerStyles: {
                width,
                justifyContent: "center",
                alignItems: "center",
              },
            }),
            titleStyles: [
              heroStyles,
              create({
                styles: {
                  transform: [
                    {
                      rotate: "-90deg",
                    },
                  ],
                  [isRight ? "paddingTop" : "paddingBottom"]: "70%",
                },
              }).styles,
            ],
          }),
          [isRight]
        );

        return (
          <View style={containerStyles}>
            <Text style={titleStyles}>{title}</Text>
          </View>
        );
      }

      return useSlider;
    }, [width, create]),
    Slide: useMemo(() => {
      function useSlide({ isLast, subtitle, description, onPress }) {
        const { containerStyles, subtitleStyles, descriptionStyles } = useMemo(
          () => ({
            ...create({
              containerStyles: {
                padding: 24,
                justifyContent: "center",
                alignItems: "center",
                width,
              },
            }),
            descriptionStyles: [
              bodyStyles,
              create({
                styles: {
                  marginBottom: 40,
                  textAlign: "center",
                },
              }).styles,
            ],
            subtitleStyles: [
              defaultTitleStyles(2),
              create({
                styles: {
                  marginBottom: 12,
                  textAlign: "center",
                },
              }).styles,
            ],
          }),
          []
        );

        return (
          <View style={containerStyles}>
            <Text style={subtitleStyles}>{subtitle}</Text>
            <Text style={descriptionStyles}>{description}</Text>

            <Button
              label={isLast ? "Let's get started" : "Next"}
              onPress={onPress}
              variant={isLast && "primary"}
            />
          </View>
        );
      }

      return useSlide;
    }, [width, create]),
    onScroll: useAnimatedScrollHandler({
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
    }),
    onSlide: useCallback(
      (index) => {
        if (index === sliders.length - 1) {
          navigate("Welcome");
          return;
        }
        slideIndex.value += 1;
      },
      [slideIndex, sliders.length, navigate]
    ),
  };
}
