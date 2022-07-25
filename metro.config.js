const { getDefaultConfig } = require("metro-config");

module.exports = (async function config() {
  const {
    resolver: { sourceExts },
  } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve("react-native-sass-transformer"),
    },
    resolver: { sourceExts: [...sourceExts, "scss", "sass"] },
  };
})();
