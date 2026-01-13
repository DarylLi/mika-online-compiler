const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");
const { VueLoaderPlugin } = require("rspack-vue-loader");
const rspack = require("@rspack/core");
const { defineConfig } = require("@rspack/cli");

const config = defineConfig({
  mode: "development",
  // entry: [path.join(__dirname,'/src/main.js'),path.join(__dirname,'/src/extra.js'),path.join(__dirname,'/src/haha.js')],
  entry: {
    app: path.join(__dirname, "/src/app.jsx"),
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "[name].bundle.js",
    libraryTarget: "umd",
    library: "[name]_MikaEdit",
  },
  module: {
    rules: [
      {
        test: /\.css$/, // 正则匹配以.css结尾的文件
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(scss|sass)$/, // 正则匹配以.scss和.sass结尾的文件
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.less$/,
        loader: "less-loader",
        type: "css",
      },
      {
        test: /\.(jsx?)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets:
                    "iOS 9, Android 4.4, last 2 versions, > 0.2%, not dead",
                },
              ],
              ["@babel/preset-react"],
            ],
          },
        },
      },
      {
        test: /\.(tsx?)|(ts?)$/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.(ts?)$/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "img/[name].[hash:7].[ext]",
        },
      },
      {
        test: /\.vue$/,
        loader: "rspack-vue-loader",
        options: {
          // Note, for the majority of features to be available, make sure this option is `true`
          experimentalInlineMatchResource: true,
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
    }),
    new CleanWebpackPlugin(),
    new MonacoWebpackPlugin({
      // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
      languages: ["javascript"],
    }),
    new WasmPackPlugin({
      crateDirectory: path.resolve(__dirname, "."),
    }),
    new rspack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: [".vue", ".ts", ".js", ".tsx", ".jsx", ".wasm", ".scss"],
    alias: {
      "@components": path.resolve(__dirname, "src/components/"),
      "@mock": path.resolve(__dirname, "src/mock/"),
      "~@styles": path.resolve(__dirname, "src/styles/"),
      "@store": path.resolve(__dirname, "src/store/"),
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@server": path.resolve(__dirname, "src/server/"),
      "@pkg": path.resolve(__dirname, "pkg/"),
      "@api": path.resolve(__dirname, "src/api/"),
    },
  },
  devServer: {
    server: "http",
    port: "8080",
    // headers: {
    //   "Cross-Origin-Opener-Policy": "same-origin",
    //   "Cross-Origin-Embedder-Policy": "require-corp",
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Methods": "*",
    // },
    // allowedHosts: [
    //   "host.com",
    //   "subdomain.host.com",
    //   "subdomain2.host.com",
    //   "host2.com",
    //   "daryl.cn",
    // ],
  },
  experiments: {
    css: true,
    asyncWebAssembly: true,
  },
});

module.exports = config;
