import { useStore } from "./utils";

export function useLogin() {
  const { Layout, Footer } = useStore();

  return <Layout isWrapper Footer={Footer} />;
}
