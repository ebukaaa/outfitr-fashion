import { useMemo } from "react";
import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useCover as Cover } from "tools/layout/cover";
import { cetaceanBlue, lightSeaGreen, magicMint } from "tools/styles/colors";
import {
  titleStyles as defaultTitleStyles,
  bodyStyles as defaultBodyStyles,
} from "tools/styles/text";
import Constants from "expo-constants";
import { useOutfitIdeas } from "./outfit-ideas";

export function useStore() {
  const { create, absoluteFill, width, height } = {
    ...useMemo(() => StyleSheet, []),
    ...useWindowDimensions(),
  };

  return {
    drawer: useMemo(() => createDrawerNavigator(), []),
    screenOptions: useMemo(
      () => ({
        drawerType: "front",
        drawerStyle: create({
          styles: {
            width: 0.75 * width,
            borderTopRightRadius: 50,
            borderBottomRightRadius: 50,
            overflow: "hidden",
            borderColor: "transparent",
          },
        }).styles,
        sceneContainerStyle: create({
          styles: { backgroundColor: "white" },
        }).styles,
        headerStyle: create({
          styles: { shadowColor: "transparent" },
        }).styles,
        headerTitleStyle: create({
          styles: {
            textTransform: "uppercase",
            fontFamily: "SFProDisplayBold",
            fontSize: 0.035 * width,
            letterSpacing: 2,
          },
        }).styles,
      }),
      [create, width]
    ),
    drawerContent: useMemo(() => {
      const {
        onPress,
        items,
        drawerStyles,
        headerStyles: { containerStyles: headerStyles, titleStyles },
        bodyStyles: {
          containerStyles: bodyStyles,
          contentStyles: {
            containerStyles: contentStyles,
            nameStyles,
            emailStyles,
            drawerItemStyles: {
              containerStyles: drawerItemStyles,
              labelStyles: { containerStyles: labelStyles, amountStyles },
              iconStyles,
            },
          },
          profileStyles,
          topStyles,
          bottomStyles: { containerStyles: bottomStyles, coverStyles },
        },
        footerStyles,
      } = {
        ...create({
          drawerStyles: { flex: 1 },
          footerStyles: {
            flex: 0.05,
            borderTopLeftRadius: 75,
            backgroundColor: lightSeaGreen(),
            overflow: "hidden",
            borderColor: "transparent",
          },
        }),
        headerStyles: create({
          containerStyles: {
            flex: 0.2,
            backgroundColor: cetaceanBlue(),
            borderBottomRightRadius: 75,
            borderColor: "transparent",
            flexDirection: "row",
            justifyContent: "space-around",
            paddingTop: Constants.statusBarHeight + 10,
          },
          titleStyles: {
            textTransform: "uppercase",
            color: "white",
            fontFamily: "SFProDisplayRegular",
            fontSize: 0.028 * width,
            letterSpacing: 2,
          },
        }),
        bodyStyles: {
          ...create({
            containerStyles: { flex: 0.75 },
            topStyles: {
              flex: 0.5,
              backgroundColor: cetaceanBlue(),
            },
            profileStyles: {
              width: width * 0.24,
              height: width * 0.24,
              borderRadius: 50,
              backgroundColor: magicMint(),
              position: "absolute",
              alignSelf: "center",
              top: (-width * 0.24) / 2,
              zIndex: 1,
            },
          }),
          bottomStyles: create({
            containerStyles: {
              flex: 0.5,
              backgroundColor: lightSeaGreen(),
              flexDirection: "column-reverse",
              overflow: "hidden",
            },
            coverStyles: { top: -0.097 * height },
          }),
          contentStyles: {
            containerStyles: [
              absoluteFill,
              create({
                styles: {
                  backgroundColor: "white",
                  borderTopLeftRadius: 75,
                  borderBottomRightRadius: 75,
                  paddingVertical: "28%",
                  borderColor: "transparent",
                  alignItems: "center",
                },
              }).styles,
            ],
            nameStyles: [
              defaultTitleStyles(1),
              create({
                styles: {
                  textAlign: "center",
                  fontSize: width * 0.067,
                },
              }).styles,
            ],
            emailStyles: [
              defaultBodyStyles,
              create({
                styles: {
                  paddingBottom: 12,
                  textAlign: "center",
                  color: "grey",
                  fontSize: width * 0.035,
                },
              }).styles,
            ],
            drawerItemStyles: {
              ...create({
                containerStyles: {
                  paddingLeft: "15%",
                  width: "100%",
                },
                iconStyles: {
                  borderRadius: 75,
                  height: 0.075 * width,
                  width: 0.075 * width,
                  justifyContent: "center",
                  alignItems: "center",
                },
              }),
              labelStyles: create({
                containerStyles: {
                  marginLeft: -20,
                  fontFamily: "SFProDisplayMedium",
                  fontSize: 0.035 * width,
                },
                amountStyles: { color: "grey" },
              }),
            },
          },
        },
        items: [
          {
            label: "Outfit Ideas",
            style: { backgroundColor: lightSeaGreen() },
            icon: "flash",
            screen: "OutfitIdeas",
          },
          {
            label: "Favorite Outfits",
            style: { backgroundColor: "#ff4e0f" },
            amount: 26,
            icon: "heart",
            screen: "FavoriteOutfits",
          },
          {
            label: "Edit Profile",
            screen: "EditProfile",
            style: { backgroundColor: "#fec400" },
            icon: "person",
          },
          {
            label: "Transaction History",
            screen: "TransactionHistory",
            style: { backgroundColor: "#ff7da0" },
            amount: 8,
            icon: "time",
          },
          {
            label: "Notification Settings",
            screen: "NotificationSettings",
            style: { backgroundColor: "#4724b5" },
            icon: "settings",
          },
          {
            label: "Logout",
            style: { backgroundColor: cetaceanBlue() },
            icon: "arrow-undo",
            screen: "Logout",
          },
        ],
        onPress(closeDrawer) {
          closeDrawer();
        },
      };

      function useIcon({ style, name }) {
        return (
          <View style={[iconStyles, style]}>
            <Ionicons name={name} size={width * 0.035} color="white" />
          </View>
        );
      }

      function useDrawerContent({ navigation: { closeDrawer } }) {
        // state: { routeNames },
        const Icon = useIcon;

        return (
          <View style={drawerStyles}>
            <View style={headerStyles}>
              <MaterialCommunityIcons
                name="close"
                color="white"
                size={0.038 * width}
                onPress={onPress.bind(null, closeDrawer)}
              />

              <Text style={titleStyles}>my profile</Text>

              <MaterialCommunityIcons
                name="shopping-outline"
                color="white"
                size={0.035 * width}
              />
            </View>

            <View style={bodyStyles}>
              <View style={profileStyles} />
              <View style={topStyles} />
              <View style={bottomStyles}>
                <Cover
                  style={coverStyles}
                  width={0.76 * width}
                  height={0.7 * height}
                />
              </View>

              <View style={contentStyles}>
                <Text style={nameStyles}>Mike Peter</Text>
                <Text style={emailStyles}>mike@flexinstudio.com</Text>

                {items.map(({ label, style, amount, icon }) => (
                  <DrawerItem
                    key={label}
                    label={() => (
                      <Text style={labelStyles}>
                        {label}{" "}
                        {amount && <Text style={amountStyles}>({amount})</Text>}
                      </Text>
                    )}
                    icon={() => <Icon style={style} name={icon} />}
                    style={drawerItemStyles}
                  />
                ))}
              </View>
            </View>

            <View style={footerStyles}>
              <Cover
                style={absoluteFill}
                width={0.76 * width}
                height={0.7 * height}
              />
            </View>
          </View>
        );
      }
      return useDrawerContent;
    }, [absoluteFill, create, height, width]),
    useOutfitIdeas,
  };
}
