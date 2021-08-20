import { useStore } from "./utils";

export function useLayout({ style, children, isWrapper, Footer }) {
  const { SafeAreaView, Wrapper } = useStore();

  return isWrapper ? (
    <Wrapper Footer={Footer}>{children}</Wrapper>
  ) : (
    <SafeAreaView style={style}>{children}</SafeAreaView>
  );
}

export default useLayout;
