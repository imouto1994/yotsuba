const browserslist = require("./browserslist");

module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: browserslist,
        },
        modules: false,
      },
    ],
    ["@babel/preset-react"],
    "@emotion/babel-preset-css-prop",
  ],
  plugins: [
    ["emotion", { sourceMap: true }],
    [
      "@babel/plugin-transform-runtime",
      {
        helpers: true,
        regenerator: false,
        useESModules: true,
      },
    ],
  ],
};
