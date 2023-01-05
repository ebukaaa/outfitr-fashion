const upstreamTransformer = require("metro-react-native-babel-transformer");

const sass = require("react-native-sass-transformer");
const svg = require("react-native-svg-transformer");

module.exports.transform = function transform({ src, filename, options }) {
  if (filename.endsWith(".scss") || filename.endsWith(".sass"))
    return sass.transform({ src, filename, options });

  if (filename.endsWith(".svg"))
    return svg.transform({ src, filename, options });

  return upstreamTransformer.transform({ src, filename, options });
};
