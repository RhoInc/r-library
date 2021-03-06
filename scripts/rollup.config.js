import babel from "rollup-plugin-babel";

var pkg = require("../package.json");

module.exports = {
  input: pkg.module,
  output: {
    name: "RLibrary",
    file: "./build/RLibrary.js",
    format: "umd",
    globals: {
      d3: "d3",
      webcharts: "webCharts"
    }
  },
  external: (function() {
    var dependencies = pkg.dependencies;

    return Object.keys(dependencies);
  })(),
  plugins: [
    babel({
      exclude: "node_modules/**",
      presets: [["env", { modules: false }]],
      plugins: ["external-helpers"],
      babelrc: false
    })
  ]
};
