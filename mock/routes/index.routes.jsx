import { useStore } from "./utils";

export function useM() {
  const {
    stack: { Screen, Navigator },
  } = useStore();

  return (
    <Navigator>
      <Screen name="" component={() => {}} />
    </Navigator>
  );
}
