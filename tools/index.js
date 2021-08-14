import { lazy, Suspense } from "react";

function load(importPath, props) {
  const Path = lazy(() => importPath);

  return (
    <Suspense fallback={null}>
      <Path {...props} />
    </Suspense>
  );
}

export const useStatusBar = () => load(import("./status-bar"));
export const useLayout = (props) => load(import("./layout"), props);
export const useButton = (props) => load(import("./button"), props);
