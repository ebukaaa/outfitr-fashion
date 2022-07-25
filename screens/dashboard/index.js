import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { Layout } from "components";
import className from "./style.module.scss";
import OutfitIdeas from "./outfit-ideas";

const { create, absoluteFill } = StyleSheet;
const { Navigator, Screen } = createDrawerNavigator();
const { width, height } = Dimensions.get("window");

const body = [
  { style: "profile" },
  { style: "top" },
  { style: "bottom" },
  { style: "content" },
];
const texts = [
  { label: "Mike Peter", style: "name" },
  { label: "mike@flexinstudio.com", style: "email" },
];
const items = [
  { label: "Outfit Ideas", icon: "flash" },
  {
    amount: 26,
    label: "Favorite Outfits",
    icon: "heart",
  },
  { label: "Edit Profile", icon: "person" },
  {
    label: "Transaction History",
    amount: 8,
    icon: "time",
  },
  {
    label: "Notification Settings",
    icon: "settings",
  },
  { label: "Logout", icon: "arrow-undo", screen: "Auth" },
];
const screenOptions = {
  drawerType: "front",
  drawerStyle: className.drawer,
  sceneContainerStyle: className.sceneContainer,
  headerStyle: create({ styles: { shadowColor: "transparent" } }).styles,
  headerTitleStyle: [
    className.headerTitle,
    create({ styles: { fontSize: 0.035 * width } }).styles,
  ],
};
const dashboardStyle = create({
  profile: {
    width: 0.24 * width,
    height: width * 0.24,
    top: (-width * 0.24) / 2,
  },
  name: { fontSize: width * 0.067 },
  email: { fontSize: width * 0.035 },
  header: { paddingTop: Constants.statusBarHeight + 10 },
  title: { fontSize: 0.028 * width },
  label: { fontSize: 0.035 * width },
  icon: { height: 0.075 * width, width: 0.075 * width },
});
export default function Dashboard() {
  return (
    <Navigator
      drawerContent={Dashboard.DrawerContent}
      screenOptions={screenOptions}
    >
      <Screen name="Outfit Ideas" component={OutfitIdeas} />
    </Navigator>
  );
}
Dashboard.DrawerContent = function useDrawerContent({
  navigation: { closeDrawer, navigate },
}) {
  return (
    <View style={className.drawerContent}>
      <View style={[className.header, dashboardStyle.header]}>
        <MaterialCommunityIcons
          name="close"
          color="white"
          size={0.038 * width}
          onPress={closeDrawer}
        />

        <Text style={[className.title, dashboardStyle.title]}>my profile</Text>

        <MaterialCommunityIcons
          name="shopping-outline"
          color="white"
          size={0.035 * width}
        />
      </View>

      <View style={className.body}>
        {body.map(({ style }) => (
          <View key={style} style={[className[style], dashboardStyle[style]]}>
            {style === "bottom" && (
              <Layout.Cover
                style={className.bottomCover}
                width={0.76 * width}
                height={0.7 * height}
              />
            )}
            {style === "content" && (
              <>
                {texts.map(({ label, style: textStyle }) => (
                  <Text
                    key={label}
                    style={[className[textStyle], dashboardStyle[textStyle]]}
                  >
                    {label}
                  </Text>
                ))}
                {items.map(({ label, amount, icon, screen }) => (
                  <DrawerItem
                    key={label}
                    label={() => (
                      <Dashboard.Label label={label} amount={amount} />
                    )}
                    icon={Dashboard.Icon.bind(null, icon)}
                    style={className.item}
                    onPress={Dashboard.onNavigate.bind(
                      null,
                      screen || label,
                      navigate
                    )}
                  />
                ))}
              </>
            )}
          </View>
        ))}
      </View>

      <View style={className.footer}>
        <Layout.Cover
          style={absoluteFill}
          width={0.76 * width}
          height={0.7 * height}
        />
      </View>
    </View>
  );
};
Dashboard.Label = function useLabel({ label, amount }) {
  return (
    <Text style={[className.label, dashboardStyle.label]}>
      {label} {amount && <Text style={className.amount}>({amount})</Text>}
    </Text>
  );
};
Dashboard.Icon = function useIcon(name) {
  return (
    <View style={[className.icon, dashboardStyle.icon, className[name]]}>
      <Ionicons name={name} size={width * 0.035} color="white" />
    </View>
  );
};
Dashboard.onNavigate = function onNavigate(screen, navigate = () => {}) {
  navigate(screen);
};
