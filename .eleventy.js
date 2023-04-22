const PostCSSPlugin = require("eleventy-plugin-postcss")
const { rm } = require("fs/promises")

// -- config --
module.exports = function (config) {
  // -- constants --
  const srcDir = "src"
  const dstDir = "dist"

  // -- assets --
  config.addPlugin(PostCSSPlugin)
  config.addPassthroughCopy(`${srcDir}/img`)

  // -- build --
  // remove the _collections dir from the site output
  config.on("eleventy.after", async () => {
    await rm(`${dstDir}/_collections`, { recursive: true, force: true })
  })

  // -- output --
  return {
    dir: {
      input: srcDir,
      output: dstDir,
      layouts: "_layouts",
    },
  }
}
