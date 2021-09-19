import { useLayoutEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  lightSeaGreen,
  magicMint,
  paleBule,
  cetaceanBlue,
} from "tools/styles/colors";
import { PanGestureHandler, RectButton } from "react-native-gesture-handler";
import { useCover as Cover } from "tools/layout/cover";
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export function useStore() {
  const cardCount = useMemo(() => 3, []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const {
    create,
    setOptions,
    absoluteFill,
    openDrawer,
    width,
    step,
    animatedIndex,
  } = {
    ...useWindowDimensions(),
    ...useNavigation(),
    ...useMemo(
      () => ({
        ...StyleSheet,
        step: 1 / (cardCount - 1),
      }),
      [cardCount]
    ),
    animatedIndex: withTiming(currentIndex),
  };

  useLayoutEffect(() => {
    const buttonStyles = create({
      styles: {
        backgroundColor: "#fafafa",
        height: 44,
        width: 44,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 22,
        overflow: "hidden",
      },
    }).styles;

    function useHeaderRight() {
      const {
        headerRightStyles,
        badgeStyles: { containerStyles: badgeStyles, labelStyles },
      } = {
        headerRightStyles: create({
          styles: { paddingRight: 15 },
        }).styles,
        badgeStyles: create({
          containerStyles: {
            position: "absolute",
            backgroundColor: lightSeaGreen(),
            height: 13,
            width: 13,
            justifyContent: "center",
            borderRadius: 6.5,
            right: 5,
            top: 5,
          },
          labelStyles: {
            fontSize: 6.5,
            color: "white",
            textAlign: "center",
          },
        }),
      };

      return (
        <View style={headerRightStyles}>
          <RectButton style={buttonStyles} activeOpacity={0.06}>
            <View style={badgeStyles}>
              <Text style={labelStyles}>5</Text>
            </View>

            <MaterialCommunityIcons name="shopping-outline" size={15} />
          </RectButton>
        </View>
      );
    }
    function useHeaderLeft() {
      const { menuStyles, barStyles, openNavigationDrawer } = {
        menuStyles: create({
          styles: { paddingLeft: 15 },
        }).styles,
        barStyles(isBottom) {
          return create({
            styles: {
              backgroundColor: "black",
              width: 18,
              height: 1.8,
              marginTop: isBottom && 4,
            },
          }).styles;
        },
        openNavigationDrawer: () => openDrawer(),
      };

      return (
        <View style={menuStyles}>
          <RectButton
            onPress={openNavigationDrawer}
            style={buttonStyles}
            activeOpacity={0.06}
          >
            <View style={barStyles()} />
            <View style={barStyles(true)} />
          </RectButton>
        </View>
      );
    }

    setOptions({
      headerTitle: "Outfit Ideas",
      headerRight: useHeaderRight,
      headerLeft: useHeaderLeft,
    });
  }, [create, openDrawer, setOptions, width]);

  return {
    styles: useMemo(
      () => ({
        ...create({
          appStyles: {
            flex: 1,
            backgroundColor: cetaceanBlue(),
          },
          cardsStyles: { flex: 0.8 },
        }),
        contentStyles: absoluteFill,
      }),
      [absoluteFill, create]
    ),
    cards: useMemo(() => [...Array(cardCount)], [cardCount]),
    feeds: useMemo(
      () => [
        {
          id: "New In",
          ...create({
            styles: {
              backgroundColor: magicMint(),
              height: 80,
              width: 80,
              borderRadius: 40,
            },
          }),
        },
      ],
      [create]
    ),
    View,
    Text,
    FlatList,
    Overlay: useMemo(() => {
      const {
        header: {
          containerStyles: headerStyles,
          topStyles: headerTopStyles,
          bottomStyles: headerBottomStyles,
          contentStyles: headerContentStyles,
        },
        body: {
          containerStyles: bodyStyles,
          topStyles: topBodyStyles,
          content: {
            containerStyles: bodyContentStyles,
            cover: {
              topStyles: coverTopStyles,
              bottomStyles: coverBottomStyles,
            },
          },
        },
        footer: {
          containerStyles: footerStyles,
          contentStyles: footerContentStyles,
          coverStyles,
        },
      } = {
        header: {
          ...create({
            containerStyles: { flex: 0.4 },
            topStyles: {
              flex: 0.5,
              backgroundColor: "white",
            },
            bottomStyles: {
              flex: 0.5,
              backgroundColor: paleBule(),
              overflow: "hidden",
            },
          }),
          contentStyles: [
            absoluteFill,
            create({
              styles: {
                borderBottomRightRadius: 75,
                backgroundColor: "white",
                borderColor: "transparent",
              },
            }).styles,
          ],
        },
        body: {
          ...create({
            containerStyles: { flex: 0.35 },
            topStyles: {
              flex: 0.5,
              backgroundColor: "white",
            },
          }),
          content: {
            containerStyles: [
              absoluteFill,
              create({
                styles: {
                  backgroundColor: paleBule(),
                  borderTopLeftRadius: 75,
                  borderBottomRightRadius: 75,
                  borderColor: "transparent",
                  overflow: "hidden",
                },
              }).styles,
            ],
            cover: create({
              topStyles: {
                transform: [
                  {
                    rotate: "180deg",
                  },
                ],
              },
              bottomStyles: {
                top: -6,
                transform: [
                  {
                    rotateX: "180deg",
                  },
                ],
              },
            }),
          },
        },
        footer: {
          containerStyles: create({
            styles: {
              flex: 0.25,
              backgroundColor: paleBule(),
              overflow: "hidden",
            },
          }).styles,
          coverStyles: [
            absoluteFill,
            create({
              styles: {
                top: -29,
                transform: [
                  {
                    rotateX: "180deg",
                  },
                ],
              },
            }).styles,
          ],
          contentStyles: create({
            styles: {
              flex: 1,
              borderTopLeftRadius: 75,
              backgroundColor: cetaceanBlue(),
              borderColor: "transparent",
            },
          }).styles,
        },
      };

      function useOverlay() {
        return (
          <>
            <View style={headerStyles}>
              <View style={headerTopStyles} />
              <View style={headerBottomStyles} />

              <View style={headerContentStyles} />
            </View>

            <View style={bodyStyles}>
              <View style={topBodyStyles} />

              <View style={bodyContentStyles}>
                <Cover style={coverTopStyles} backgroundFill={paleBule()} />
                <Cover style={coverBottomStyles} backgroundFill={paleBule()} />
              </View>
            </View>

            <View style={footerStyles}>
              <Cover style={coverStyles} />

              <View style={footerContentStyles} />
            </View>
          </>
        );
      }
      return useOverlay;
    }, [absoluteFill, create]),
    Card: useMemo(() => {
      const { wrapperStyles, containerStyles, colors } = {
        onSwipe() {
          setCurrentIndex((old) => old + step);
        },
        wrapperStyles: [
          absoluteFill,
          create({
            styles: {
              alignItems: "center",
            },
          }).styles,
        ],
        containerStyles: create({
          styles: {
            flex: 1,
            width: "75%",
            borderRadius: 24,
          },
        }).styles,
        colors: ["#c9e9e7", "#74bcb8"],
      };

      function useCard({ index }) {
        const { position, translateX, translateY } = {
          position: useDerivedValue(
            () => index * step - animatedIndex().current
          ),
          translateX: useSharedValue(0),
          translateY: useSharedValue(0),
        };
        const { newWrapperStyles, cardStyle, onGestureEvent } = {
          newWrapperStyles: useMemo(
            () => [
              wrapperStyles,
              create({ styles: { paddingTop: 28 * index } }).styles,
            ],
            [index]
          ),
          cardStyle: useAnimatedStyle(() => ({
            transform: [
              {
                scale: interpolate(
                  position.value,
                  [-0.5, 1.5],
                  [0.6, 1],
                  Extrapolate.CLAMP
                ),
              },
              { translateX: translateX.value },
              { translateY: translateY.value },
            ],
            backgroundColor: interpolateColor(position.value, [0, 1], colors),
          })),
          onGestureEvent: useAnimatedGestureHandler({
            onStart(_, context) {
              context.x = translateX.value;
              context.y = translateY.value;
            },
            onActive({ translationX, translationY }, context) {
              translateX.value = translationX + context.x;
              translateY.value = translationY + context.y;
            },
            onEnd({ velocityX, velocityY }) {
              translateY.value = withSpring(0, {
                velocity: velocityY,
              });
              translateX.value = withSpring(0, { velocity: velocityX });
            },
          }),
        };

        return (
          <View style={newWrapperStyles}>
            <PanGestureHandler onGestureEvent={onGestureEvent}>
              <Animated.View style={[containerStyles, cardStyle]} />
            </PanGestureHandler>
          </View>
        );
      }
      return useCard;
    }, [absoluteFill, animatedIndex, create, step]),
  };
}
