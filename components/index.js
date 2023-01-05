import { forwardRef, lazy, Suspense } from "react";

export function load(importPath, props) {
  const Path = lazy(() => importPath);
  return (
    <Suspense fallback={null}>
      <Path {...props} />
    </Suspense>
  );
}

export const Button = (props) => load(import("./button"), props);
export const Input = forwardRef(function useInput(props, ref) {
  return load(import("./input"), { ...props, ref });
});
export { Layout } from "./layout";
