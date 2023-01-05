const { getDefaultConfig } = require("metro-config");

module.exports = (async function config() {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig(__dirname);

  return {
    transformer: {
      babelTransformerPath: require.resolve("./utils/transform.js"),
    },
    resolver: {
      assetExts: assetExts.filter((ext) => ext !== "svg"),
      sourceExts: [...sourceExts, "scss", "sass", "svg"],
    },
  };
})();
