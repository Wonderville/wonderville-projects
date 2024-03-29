const fs = require("fs/promises")
const path = require("path")

// -- config --
const dst = path.join(__dirname, "src", "_includes", "shared", "rand.css")

// -- command --
async function Main() {
  // generate random-valued css classes
  let body = `
/* this file is generated by running \`node rand.js\` */
  `
  for (let i = 0; i < 100; i++) {
    body += `
.Rand--${i} {
  --rand: ${Math.random()};
}
    `
  }

  // write to disk
  try {
    await fs.writeFile(dst, body)
  } catch (err) {
    console.error(err);
  };
}

// -- bootstrap --
Main()