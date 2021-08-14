import { useStore } from "./utils";

export function useLayout({ style, children }) {
  const { SafeAreaView } = useStore();

  return <SafeAreaView style={style}>{children}</SafeAreaView>;
}

export default useLayout;
