const path = require("path");

module.exports = [
  // Add support for native node modules
  {
    test: /\.node$/,
    use: "node-loader",
  },
  {
    exclude: [path.resolve(__dirname, "./node_modules/")],
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: [
      {
        loader: "@marshallofsound/webpack-asset-relocator-loader",
        options: {
          outputAssetBase: "native_modules",
        },
      },
      {
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
        },
      },
    ],
  },
  // Put your webpack loader rules in this array.  This is where you would put
  // your ts-loader configuration for instance:
  /**
   * Typescript Example:
   *
   * {
   *   test: /\.tsx?$/,
   *   exclude: /(node_modules|.webpack)/,
   *   loaders: [{
   *     loader: 'ts-loader',
   *     options: {
   *       transpileOnly: true
   *     }
   *   }]
   * }
   */
];
