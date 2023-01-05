import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import Share from "assets/svgs/share.svg";
import { Button, Layout } from "components";
import config from "styles/config";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Dashboard from "..";
import styleName from "./style.module.scss";

const date = new Date();
const numbers = [...Array(12)].map((_, i) => i);
const headerRight = () => (
  <Dashboard.Header>
    <Share width={18} height={18} />
  </Dashboard.Header>
);
export default function TransactionHistory() {
  const { setOptions, openDrawer } = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      headerLeft: Dashboard.headerLeft.bind(null, openDrawer),
      headerRight,
    });
  }, [openDrawer, setOptions]);

  return (
    <>
      <View style={styleName.body}>
        <View style={styleName.bodyOverlay}>
          <Layout.Cover
            style={styleName.bodyCover}
            backgroundFill={styleName.cetaceanBlue}
          />
        </View>

        <ScrollView style={styleName.bodyContent}>
          <Price />
          <Graph />
          <Invoice />
        </ScrollView>
      </View>

      <View style={styleName.footer}>
        <View style={styleName.footerContent}>
          <Layout.Cover backgroundFill={styleName.cetaceanBlue} />
        </View>
      </View>
    </>
  );
}

function Price() {
  return (
    <>
      <Text style={styleName.total}>total spent</Text>

      <View style={styleName.header}>
        <Text style={styleName.price}>$619.19</Text>

        <Button
          label="All Time"
          styleButton={styleName.filterButton}
          styleLabel={styleName.filterLabel}
        />
      </View>
    </>
  );
}

const heights = { "-2": 88, "-1": 170, 1: 118 };
const onLayout = (height, value) => {
  const newHeight = height;
  newHeight.value = withSpring(heights[value], config);
};
function Graph() {
  return (
    <View style={styleName.graph}>
      <View>
        {numbers
          .filter((i) => i < 4)
          .map((i, _, a) => (
            <View style={styleName.yAxis} key={i}>
              <Text style={styleName.graphLabel}>
                {100 * (a.length - 1 - i)}
              </Text>
            </View>
          ))}
      </View>

      <View style={styleName.chart}>
        {numbers
          .filter((i) => i < 4)
          .map((i) => (
            <View style={styleName.chartLine} key={i}>
              <View style={styleName.line} />
            </View>
          ))}

        <View style={styleName.xAxis}>
          {numbers
            .filter((i) => i < 7)
            .map((id, _, a) => {
              const value = 3 + id - a.length;
              date.setMonth(value);
              return (
                <View key={date}>
                  <Graph.Bar value={value} />

                  <Text style={styleName.graphLabel}>
                    {date.toLocaleString("en", { month: "short" })}
                  </Text>
                </View>
              );
            })}
        </View>
      </View>
    </View>
  );
}
Graph.Bar = function useBar({ value }) {
  const height = useSharedValue(0);
  const animatedHeight = useAnimatedStyle(() => ({ height: height.value }));

  return (
    <Animated.View
      style={[styleName.bar, styleName[`bar${value}`], animatedHeight]}
      onLayout={onLayout.bind(null, height, value)}
    >
      <View style={styleName[`marker${value}`]} />
    </Animated.View>
  );
};

const costs = [198.54, 281.23, 139.42];
function Invoice() {
  return costs.map((cost, i) => {
    const value = (i !== costs.length - 1 ? i : 3) - 2;
    date.setMonth(value);
    return (
      <View key={cost} style={styleName.invoice}>
        <View>
          <View style={styleName.invoiceTitle}>
            <View style={styleName[`tag${i}`]} />
            <Text style={styleName.invoiceID}>#24567{costs.length - i}</Text>
          </View>

          <Text style={styleName.invoiceDetail}>
            ${cost} {date.toLocaleString("en", { month: "short" })}, 2020
          </Text>
        </View>

        <Button label="See more" styleButton={styleName.seeMore} />
      </View>
    );
  });
}
