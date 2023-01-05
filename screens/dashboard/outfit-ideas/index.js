import { Dimensions, FlatList, Text, View, StyleSheet } from "react-native";
import { Layout } from "components";
import { useLayoutEffect } from "react";
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { number } from "prop-types";
import {
  BorderlessButton,
  PanGestureHandler,
  RectButton,
} from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { getDefaultHeaderHeight } from "@react-navigation/elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { setStatusBarStyle } from "expo-status-bar";
import styleName from "./style.module.scss";
import Dashboard from "..";

const { width, height } = Dimensions.get("window");
const { create } = StyleSheet;

const categories = ["new", "summer", "activewear", "outlet", "accessories"];
const cards = [...Array(4)].map((_, i) => i);
const sizeRatio = 0.18 * width;
const categoryStyles = create({
  size: { width: sizeRatio, height: sizeRatio },
  radius: { borderRadius: sizeRatio / 2 },
});
const headerStyle = create({
  s: [
    styleName.header,
    {
      paddingTop: Constants.statusBarHeight,
      height: getDefaultHeaderHeight(
        Dimensions.get("window"),
        false,
        Constants.statusBarHeight
      ),
    },
  ],
}).s;
export default function OutfitIdeas() {
  const { setOptions, openDrawer } = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      headerShown: false,
      sceneContainerStyle: styleName.outfitIdeas,
    });
    setStatusBarStyle("dark");
    return setStatusBarStyle.bind(null, "light");
  }, [setOptions]);

  OutfitIdeas.current = useSharedValue(0);

  return (
    <>
      <Overlay />

      <View style={headerStyle}>
        <Dashboard.LeftHeader onPress={openDrawer} />

        <Text style={styleName.title}>outfit ideas</Text>

        <RectButton style={styleName.button} activeOpacity={0.06}>
          <View style={styleName.badge}>
            <Text style={styleName.label}>5</Text>
          </View>

          <MaterialCommunityIcons name="shopping-outline" size={15} />
        </RectButton>
      </View>

      <View style={styleName.body}>
        <View>
          <FlatList
            contentContainerStyle={styleName.list}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            renderItem={({ item, index }) => (
              <BorderlessButton>
                <View
                  style={[
                    styleName[`category-border${index}`],
                    categoryStyles.size,
                    categoryStyles.radius,
                  ]}
                >
                  <View
                    style={[
                      styleName[`category${index}`],
                      categoryStyles.radius,
                    ]}
                  />
                </View>
                <Text style={styleName.categoryText}>{item}</Text>
              </BorderlessButton>
            )}
          />
        </View>

        <View style={styleName.cards}>
          {cards.map((index) => (
            <Card key={index} index={index} />
          ))}
        </View>
      </View>
    </>
  );
}

const views = ["top", "bottom", "content"];
function Overlay() {
  return (
    <View style={styleName.overlay}>
      <View style={styleName.overlayHeader}>
        {views.map((style) => (
          <View
            key={style}
            style={[styleName[style], styleName[`${style}Overlay`]]}
          />
        ))}
      </View>

      <View style={styleName.overlayBody}>
        {views.map(
          (style) =>
            style !== "bottom" && (
              <View
                key={`${style}Body`}
                style={[
                  styleName[style],
                  styleName[`${style}Overlay`],
                  styleName[`${style}Body`],
                ]}
              >
                {style === "content" &&
                  views.map(
                    (coverStyle) =>
                      coverStyle !== "content" && (
                        <Layout.Cover
                          key={`${coverStyle}Cover`}
                          style={styleName[`${coverStyle}Cover`]}
                          backgroundFill={styleName.paleBlue}
                        />
                      )
                  )}
              </View>
            )
        )}
      </View>

      <View style={styleName.overlayFooter}>
        <Layout.Cover style={styleName.coverFooter} />
        <View style={styleName.contentFooter} />
      </View>
    </View>
  );
}

const colors = [styleName.polishedAqua, styleName.tahitianSky];
const step = 1 / (cards.length - 1);
function Card({ index }) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const position = useDerivedValue(
    () => index * step - OutfitIdeas.current.value
  );
  const top = useDerivedValue(() => position.value * 120);

  const animatedCard = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          position.value,
          [-0.5, 1.5],
          [0.3, 1],
          Extrapolate.CLAMP
        ),
      },
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
    backgroundColor: interpolateColor(position.value, [0, 1], colors),
    top: top.value,
  }));
  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, context) {
      context.x = translateX.value;
      context.y = translateY.value;
    },
    onActive({ translationX, translationY }, { x, y }) {
      translateX.value = translationX + x;
      translateY.value = translationY + y;
    },
    onEnd({ translationX, translationY }) {
      if (position.value !== 1) {
        translateY.value = withSpring(0);
        translateX.value = withSpring(0);
        return;
      }

      if (translationX < -width / 9) {
        translateX.value = withSpring(-width - index - 10);
        OutfitIdeas.current.value = withSpring(
          OutfitIdeas.current.value - step
        );
      } else if (translationX > width / 9) {
        translateX.value = withSpring(width + index + 10);
        OutfitIdeas.current.value = withSpring(
          OutfitIdeas.current.value - step
        );
      } else translateX.value = withSpring(0);

      if (translationY < -height / 9) {
        translateY.value = withSpring(-height - index * 30);
        OutfitIdeas.current.value = withSpring(
          OutfitIdeas.current.value - step
        );
      } else if (translationY > height / 9) {
        translateY.value = withSpring(height + index + 10);
        OutfitIdeas.current.value = withSpring(
          OutfitIdeas.current.value - step
        );
      } else translateY.value = withSpring(0);
    },
  });

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={[styleName.card, animatedCard]} />
    </PanGestureHandler>
  );
}
Card.propTypes = { index: number.isRequired };
