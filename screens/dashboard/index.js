import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { memo, useEffect } from "react";
import { setStatusBarStyle } from "expo-status-bar";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { arrayOf, func, node } from "prop-types";
import { Layout } from "components";
import { RectButton } from "react-native-gesture-handler";
import styleName from "./style.module.scss";
import OutfitIdeas from "./outfit-ideas";
import FavouriteOutfits from "./favourite-outfits";
import TransactionHistory from "./transaction-history";

const { create, absoluteFill } = StyleSheet;
const { Navigator, Screen } = createDrawerNavigator();
const { width, height } = Dimensions.get("window");

const body = ["profile", "top", "bottom", "content"];
const texts = [
  { label: "Mike Peter", style: "name" },
  { label: "mike@flexinstudio.com", style: "email" },
];
const items = [
  { label: "Outfit Ideas", icon: "flash" },
  { amount: 26, label: "Favourite Outfits", icon: "heart" },
  { label: "Edit Profile", icon: "person" },
  { label: "Transaction History", amount: 8, icon: "time" },
  { label: "Notification Settings", icon: "settings" },
  { label: "Logout", icon: "arrow-undo", screen: "Auth" },
];
const screenOptions = {
  drawerType: "front",
  drawerStyle: styleName.drawer,
  sceneContainerStyle: styleName.sceneContainer,
  headerStyle: create({ styles: { shadowColor: "transparent" } }).styles,
  headerTitleStyle: [
    styleName.headerTitle,
    create({ styles: { fontSize: 0.035 * width } }).styles,
  ],
  headerLeftContainerStyle: styleName.headerContainer,
  headerRightContainerStyle: styleName.headerContainer,
};
const dashboardStyle = create({
  profile: {
    width: 0.24 * width,
    height: 0.24 * width,
    top: (-width * 0.24) / 2,
  },
  name: { fontSize: width * 0.067 },
  email: { fontSize: width * 0.035 },
  header: [styleName.header, { paddingTop: Constants.statusBarHeight + 16 }],
  title: [styleName.title, { fontSize: width * 0.035 }],
  label: { fontSize: width * 0.035 },
  icon: { height: width * 0.075, width: width * 0.075 },
});
const onNavigate = (screen, routeNames, navigate = () => {}) => {
  for (let i = 0; i < routeNames.length; i += 1) {
    if (screen === routeNames[i] || screen === "Auth") {
      navigate(screen);
      return;
    }
  }
};
const label = (name, amount) => (
  <Text style={[styleName.label, dashboardStyle.label]}>
    {name} {amount && <Text style={styleName.amount}>({amount})</Text>}
  </Text>
);
const icon = (name) => (
  <View style={[styleName.icon, dashboardStyle.icon, styleName[name]]}>
    <Ionicons name={name} size={width * 0.035} color="white" />
  </View>
);

const DrawerContent = memo(
  function useDrawerContent({ closeDrawer, navigate, routeNames }) {
    return (
      <View style={styleName.drawerContent}>
        <View style={dashboardStyle.header}>
          <MaterialCommunityIcons
            name="close"
            color="white"
            size={0.048 * width}
            onPress={closeDrawer}
          />

          <Text style={dashboardStyle.title}>my profile</Text>

          <MaterialCommunityIcons
            name="shopping-outline"
            color="white"
            size={0.044 * width}
          />
        </View>

        <View style={styleName.body}>
          {body.map((style) => (
            <View key={style} style={[styleName[style], dashboardStyle[style]]}>
              {style === "bottom" && (
                <Layout.Cover
                  style={styleName.bottomCover}
                  width={width}
                  height={0.7 * height}
                />
              )}
              {style === "content" && (
                <>
                  {texts.map(({ label: name, style: textStyle }) => (
                    <Text
                      key={name}
                      style={[styleName[textStyle], dashboardStyle[textStyle]]}
                    >
                      {name}
                    </Text>
                  ))}
                  {items.map(({ label: name, amount, icon: tag, screen }) => (
                    <DrawerItem
                      key={name}
                      label={label.bind(null, name, amount)}
                      icon={icon.bind(null, tag)}
                      style={styleName.item}
                      onPress={onNavigate.bind(
                        null,
                        screen || name,
                        routeNames,
                        navigate
                      )}
                    />
                  ))}
                </>
              )}
            </View>
          ))}
        </View>

        <View style={styleName.footer}>
          <Layout.Cover
            style={absoluteFill}
            width={width}
            height={0.7 * height}
          />
        </View>
      </View>
    );
  },
  () => true
);
DrawerContent.propTypes = {
  closeDrawer: func.isRequired,
  navigate: func.isRequired,
  routeNames: arrayOf(String).isRequired,
};

const useDrawerContent = ({
  state: { history, routeNames },
  navigation: { closeDrawer, navigate },
}) => {
  useEffect(() => {
    const { status: isDrawerOpen } = history[history.length - 1] || {};
    setStatusBarStyle(isDrawerOpen ? "light" : "dark");
  }, [history]);

  return (
    <DrawerContent
      closeDrawer={closeDrawer}
      navigate={navigate}
      routeNames={routeNames}
    />
  );
};
export default function Dashboard() {
  return (
    <Navigator drawerContent={useDrawerContent} screenOptions={screenOptions}>
      <Screen name="Outfit Ideas" component={OutfitIdeas} />
      <Screen name="Favourite Outfits" component={FavouriteOutfits} />
      <Screen name="Transaction History" component={TransactionHistory} />
    </Navigator>
  );
}

Dashboard.Header = memo(
  function useHeader({ onPress, children }) {
    return (
      <RectButton
        onPress={onPress}
        style={styleName.button}
        activeOpacity={0.06}
      >
        {children}
      </RectButton>
    );
  },
  () => true
);
Dashboard.Header.propTypes = { onPress: func, children: node.isRequired };
Dashboard.Header.defaultProps = { onPress: undefined };

Dashboard.LeftHeader = memo(
  function useLeftHeader({ onPress }) {
    return (
      <Dashboard.Header onPress={onPress}>
        {body
          .filter((_, index) => index < 2)
          .map((key, index) => (
            <View
              key={`bar${key}`}
              style={[styleName.bar, styleName[`bar${index + 1}`]]}
            />
          ))}
      </Dashboard.Header>
    );
  },
  () => true
);
Dashboard.LeftHeader.propTypes = { onPress: func.isRequired };

Dashboard.headerLeft = (onPress) => <Dashboard.LeftHeader onPress={onPress} />;
