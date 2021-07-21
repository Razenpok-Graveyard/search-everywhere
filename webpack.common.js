const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const { DefinePlugin } = require("webpack");

const src = path.resolve(__dirname, "src");

module.exports = {
  context: __dirname,
  entry: {
    client: "./src/client/index.ts",
    server: "./src/server/index.ts",
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        include: src,
        loader: "pug-plain-loader",
      },
      {
        test: /\.tsx?$/,
        include: src,
        loader: "ts-loader",
        options: {
          happyPackMode: true,
          experimentalWatchApi: true,
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.styl(us)?$/,
        include: src,
        use: [
          {
            loader: "style-loader",
            options: {
              injectType: "singletonStyleTag",
              insert: require("./src/client/shims/css-loader-shim"),
            },
          },
          "css-loader",
          "stylus-loader",
        ],
      },
      {
        test: /\.vue$/,
        include: src,
        loader: "vue-loader",
        options: {
          compilerOptions: {
            isCustomElement: (tag) => tag === "search-everywhere-extension",
          },
        },
      },
      {
        test: /\.svg$/,
        include: src,
        use: ["vue-loader", "vue-svg-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".vue", ".json"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new ForkTsCheckerWebpackPlugin(),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./manifest.json" },
        { from: "./icons/icon16.png" },
        { from: "./icons/icon32.png" },
        { from: "./icons/icon48.png" },
        { from: "./icons/icon128.png" },
      ],
    }),
  ],
};
