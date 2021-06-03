const path = require("path");
const webpack = require("webpack");
// const CopyWebpackPlugin=require('copy-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const tsImportPluginFactory = require("ts-import-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const camel2Dash = require("camel-2-dash");
module.exports = (env, argv) => ({
  entry: ["@babel/polyfill", "./src/index.ts"],
  target: "web",
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "../dist"),
    filename: "js/[name].[contenthash:8].js",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".vue", ".js", ".jsx", ".json"],

    alias: {
      assets: path.resolve(__dirname, "../src/assets"),
      pages: path.resolve(__dirname, "../src/pages"),
      vue: "vue/dist/vue.esm.js",
      config: path.resolve(__dirname, "../src/config"),
      components: path.resolve(__dirname, "../src/components"),
      utils: path.resolve(__dirname, "../src/utils"),
      store: path.resolve(__dirname, "../src/store"),
      constant: path.resolve(__dirname, "../src/constant"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: "element-ui",
                libraryDirectory: "lib",
                camel2DashComponentName: true,
                style: (p) =>
                  path.join(
                    "element-ui",
                    "lib",
                    "theme-chalk",
                    `${camel2Dash(path.basename(p, ".js"))}.css`
                  ),
              }),
            ],
          }),
        },
      },

      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader", // translates CSS into CommonJS
          },
          {
            loader: "less-loader", // compiles Less to CSS
            options: {
              lessOptions: {
                math: "always",
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // 其他选项
                    },
                  ],
                ],
              },
            },
          },
          "sass-loader",
          // 'post-loader', //添加post-loader加载器
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              esModule: false,
              limit: 100,
              outputPath: "assets/", // 为你的文件配置自定义 output 输出目录 ; 用来处理图片路径问题
              // publicPath: 'assets/', // 为你的文件配置自定义 public 发布目录 ; 用来处理图片路径问题
            },
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify({
        siteId: process.env.siteId,
        name: argv.name,
      }),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src", "index.html"),
      title: "手搭 Vue 开发环境",
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
    }),
    new VueLoaderPlugin(),
    new webpack.ProgressPlugin(),
  ],
});
