const PostCSSPlugin = require("eleventy-plugin-postcss");

// -- config --
module.exports = function (config) {
  // -- constants --
  const srcDir = "src"
  const dstDir = "dist"

  // -- assets --
  config.addPlugin(PostCSSPlugin)
  config.addPassthroughCopy(`${srcDir}/site.css`);

  // -- output --
  return {
    dir: {
      input: srcDir,
      output: dstDir,
    },
  };
};
