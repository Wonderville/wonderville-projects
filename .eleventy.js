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
  config.addPassthroughCopy(`${srcDir}/font`)
  config.addPassthroughCopy(`${srcDir}/**/*.js`)

  // -- filters --
  function camelize(value, isLower) {
    return value
      .split(/\s+/)
      .map((s, i) => {
        let first = s.slice(0, 1)
        if (i === 0 && isLower) {
          first = first.toLowerCase()
        } else {
          first = first.toUpperCase()
        }

        return first + s.slice(1, s.length)
      })
      .join("")
  }

  config.addFilter("camelize", (value) => camelize(value, false))
  config.addFilter("camelizeLower", (value) => camelize(value, true))

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
