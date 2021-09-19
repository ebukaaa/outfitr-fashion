import { useStore } from "./utils";

export function useDashboard() {
  const {
    drawer: { Screen, Navigator },
    screenOptions,
    drawerContent,
    useOutfitIdeas,
  } = useStore();

  return (
    <Navigator drawerContent={drawerContent} screenOptions={screenOptions}>
      <Screen name="OutfitIdeas" component={useOutfitIdeas} />
    </Navigator>
  );
}
