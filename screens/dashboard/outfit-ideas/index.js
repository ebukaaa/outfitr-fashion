import { FlatList, StyleSheet, Text, View } from "react-native";
import { Layout } from "components";
import { useLayoutEffect, useState } from "react";
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
import { node, number } from "prop-types";
import { PanGestureHandler, RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import className from "./style.module.scss";

const feeds = [{ id: "New In", style: "feed" }];
const cardCount = 3;
const cards = [...Array(cardCount)];
export default function OutfitIdeas() {
  const { setOptions, openDrawer } = useNavigation();

  OutfitIdeas.onOpenDrawer = openDrawer;

  useLayoutEffect(() => {
    setOptions({
      headerRight: OutfitIdeas.headerRight,
      headerLeft: OutfitIdeas.headerLeft,
    });
  }, [setOptions]);

  return (
    <State>
      <Overlay />

      <View style={className.content}>
        <View style={className.list}>
          <FlatList
            horizontal
            data={feeds}
            renderItem={({ item: { style } }) => (
              <View style={className[style]} />
            )}
          />
        </View>

        <View style={className.cards}>
          {cards.map((_, index) => (
            <Card key={index} index={index} />
          ))}
        </View>
      </View>
    </State>
  );
}
OutfitIdeas.headerLeft = function useHeaderLeft() {
  return (
    <View style={className.headerLeft}>
      <RectButton
        onPress={OutfitIdeas.onOpenDrawer}
        style={className.button}
        activeOpacity={0.06}
      >
        <View style={className.bar} />
        <View style={[className.bar, className.bottomBar]} />
      </RectButton>
    </View>
  );
};
OutfitIdeas.headerRight = function useHeaderRight() {
  return (
    <View style={className.headerRight}>
      <RectButton style={className.button} activeOpacity={0.06}>
        <View style={className.badge}>
          <Text style={className.label}>5</Text>
        </View>

        <MaterialCommunityIcons name="shopping-outline" size={15} />
      </RectButton>
    </View>
  );
};

const views = ["top", "bottom", "content"];
function Overlay() {
  return (
    <>
      <View style={className.header}>
        {views.map((style) => (
          <View
            key={style}
            style={[className[style], className[`${style}Overlay`]]}
          />
        ))}
      </View>

      <View style={className.body}>
        {views.map(
          (style) =>
            style !== "bottom" && (
              <View
                key={`${style}Body`}
                style={[
                  className[style],
                  className[`${style}Overlay`],
                  className[`${style}Body`],
                ]}
              >
                {style === "content" &&
                  views.map(
                    (coverStyle) =>
                      coverStyle !== "content" && (
                        <Layout.Cover
                          key={`${coverStyle}Cover`}
                          style={className[`${coverStyle}Cover`]}
                          backgroundFill={className.paleBlue}
                        />
                      )
                  )}
              </View>
            )
        )}
      </View>

      <View style={className.footer}>
        <Layout.Cover style={className.coverFooter} />
        <View style={className.contentFooter} />
      </View>
    </>
  );
}

function State({ children }) {
  [State.index, State.setIndex] = useState(0);
  State.animatedIndex = withTiming(State.index);
  return <View style={className.outfitIdeas}>{children}</View>;
}
State.propTypes = { children: node.isRequired };

const colors = ["#c9e9e7", "#74bcb8"];
const step = 1 / (cardCount - 1);
function Card({ index }) {
  const cardStyle = StyleSheet.create({
    style: { paddingTop: index * 28 },
  }).style;

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const position = useDerivedValue(
    () => index * step - State.animatedIndex().current
  );

  const animatedCard = useAnimatedStyle(() => ({
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
  }));
  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, context) {
      context.x = translateX.value;
      context.y = translateY.value;
    },
    onActive({ translationX, translationY }, context) {
      translateX.value = translationX + context.x;
      translateY.value = translationY + context.y;
    },
    onEnd({ velocityX, velocityY }) {
      translateY.value = withSpring(0, { velocity: velocityY });
      translateX.value = withSpring(0, { velocity: velocityX });
    },
  });

  return (
    <View style={[className.cardWrapper, cardStyle]}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[className.card, animatedCard]} />
      </PanGestureHandler>
    </View>
  );
}
Card.propTypes = { index: number.isRequired };
