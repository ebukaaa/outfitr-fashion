import { Dimensions, ScrollView, View } from "react-native";
import Animated, {
  FadeIn,
  Layout,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { BorderlessButton } from "react-native-gesture-handler";
import { useLayoutEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { number } from "prop-types";
import { Button } from "components";
import Footer from "assets/svgs/footer.svg";
import styleName from "./style.module.scss";
import Dashboard from "..";

const { height } = Dimensions.get("window");

const favourites = [
  { id: 0, aspectRatio: 1 },
  { id: 1, aspectRatio: 200 / 145 },
  { id: 2, aspectRatio: 180 / 145 },
  { id: 3, aspectRatio: 180 / 145 },
  { id: 4, aspectRatio: 1 },
  { id: 5, aspectRatio: 120 / 145 },
  { id: 6, aspectRatio: 210 / 145 },
  { id: 7, aspectRatio: 160 / 145 },
];
export default function FavouriteOutfits() {
  const { setOptions, openDrawer } = useNavigation();
  const scrollRef = useRef();

  useLayoutEffect(() => {
    setOptions({ headerLeft: Dashboard.headerLeft.bind(null, openDrawer) });
  }, [openDrawer, setOptions]);

  return (
    <>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styleName.scrollContent}
        style={styleName.scroll}
      >
        {favourites
          .filter(({ id }) => id < 2)
          .map(({ id: index }) => (
            <View key={index} style={styleName.favourites}>
              {favourites
                .filter(({ id }) => (index ? id % 2 !== 0 : id % 2 === 0))
                .map(({ aspectRatio, id }) => (
                  <Favourite key={id} id={id} aspectRatio={aspectRatio} />
                ))}
            </View>
          ))}
      </ScrollView>

      <Footer style={styleName.svg} />

      <Button
        styleButton={styleName.button}
        variant="primary"
        label="Add to favourites"
        onPress={FavouriteOutfits.onFooter}
      />
    </>
  );
}
FavouriteOutfits.onFooter = () => {
  for (let i = 0; i < favourites.length; i += 1) {
    FavouriteOutfits[`display${i}`].value = FavouriteOutfits[`isChecked${i}`]
      ? "none"
      : "flex";
  }
};

const onFavourite = (iconOpacity, id) => {
  const newIconOpacity = iconOpacity;
  newIconOpacity.value = iconOpacity.value ? 0 : 1;
  FavouriteOutfits[`isChecked${id}`] = !newIconOpacity.value;
};
function Favourite({ id, aspectRatio }) {
  FavouriteOutfits[`display${id}`] = useSharedValue(
    FavouriteOutfits[`display${id}`]?.value || "flex"
  );

  const viewDisplay = FavouriteOutfits[`display${id}`];
  const iconOpacity = useSharedValue(0);
  const animatedIcon = useAnimatedStyle(() => ({ opacity: iconOpacity.value }));
  const animatedView = useAnimatedStyle(() => ({ display: viewDisplay.value }));

  return (
    <Animated.View
      entering={FadeIn.delay(100 * id)}
      layout={Layout.duration(500)}
      style={[styleName.favourite, animatedView]}
    >
      <BorderlessButton
        style={[
          styleName[`favourite${id}`],
          { height: 0.22 * height * aspectRatio },
        ]}
        onPress={onFavourite.bind(null, iconOpacity, id)}
      >
        <Animated.View style={animatedIcon}>
          <AntDesign
            size={24}
            name="checkcircle"
            color={styleName.lightSeaGreen}
          />
        </Animated.View>
      </BorderlessButton>
    </Animated.View>
  );
}
Favourite.propTypes = { id: number.isRequired, aspectRatio: number.isRequired };
