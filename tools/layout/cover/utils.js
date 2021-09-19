import { useWindowDimensions } from "react-native";
import Svg, { G, Path } from "react-native-svg";

export function useStore() {
  return {
    dimensions: useWindowDimensions(),
    Svg,
    G,
    Path,
  };
}
