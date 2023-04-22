const PostCSSPlugin = require("eleventy-plugin-postcss")

// -- config --
module.exports = function (config) {
  // -- constants --
  const srcDir = "src"
  const dstDir = "dist"

  // -- assets --
  config.addPlugin(PostCSSPlugin)
  config.addPassthroughCopy(`${srcDir}/img`)

  // -- output --
  return {
    dir: {
      input: srcDir,
      output: dstDir,
      layouts: "_layouts",
    },
  }
}
