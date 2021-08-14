import { StyleSheet } from "react-native";
import { cetaceanBlue } from "./colors";

const { create } = StyleSheet;

export const heroStyles = create({
  styles: {
    fontSize: 70,
    lineHeight: 80,
    fontFamily: "SFProDisplayBold",
    color: "white",
    textAlign: "center",
  },
}).styles;
export const bodyStyles = create({
  styles: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "SFProDisplayRegular",
    color: cetaceanBlue(0.7),
  },
}).styles;
export const labelStyles = create({
  styles: {
    fontSize: 15,
    fontFamily: "SFProDisplayMedium",
  },
}).styles;

export function titleStyles(theme) {
  let styles;

  if (theme === 1) {
    styles = create({
      styles: {
        fontSize: 28,
        fontFamily: "SFProDisplaySemibold",
        color: cetaceanBlue(),
      },
    }).styles;
  } else if (theme === 2) {
    styles = create({
      styles: {
        fontSize: 24,
        lineHeight: 30,
        fontFamily: "SFProDisplaySemibold",
        color: cetaceanBlue(),
      },
    }).styles;
  }

  return styles;
}
