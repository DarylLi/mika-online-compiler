const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

const config = {
  mode: "development",
  entry: {
    // 模块热替换的运行时代码
    // 用于 web 套接字传输、热重载逻辑的 web server 客户端
    dev: "webpack-dev-server/client/index.js?hot=false&live-reload=false",
    // 你的入口起点
    app: path.join(__dirname, "/src/app.jsx"),
  },
  plugins: [
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
    new WasmPackPlugin({
      crateDirectory: path.resolve(__dirname, "."),
    }),
    new CleanWebpackPlugin(),
    new MonacoWebpackPlugin({
      // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
      languages: ["javascript"],
    }),
  ],
  output: {
    path: path.join(__dirname, "/build"),
    filename: "[name].bundle.js",
    libraryTarget: "umd",
    library: "[name]_kuroMi",
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
        test: path.resolve(__dirname, "node_modules/webpack-dev-server/client"),
        loader: "null-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx", ".jsx", "wasm"],
    alias: {
      "@components": path.resolve(__dirname, "src/components/"),
      "@mock": path.resolve(__dirname, "src/mock/"),
      "@store": path.resolve(__dirname, "src/store/"),
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@server": path.resolve(__dirname, "src/server/"),
      "@pkg": path.resolve(__dirname, "pkg/"),
    },
  },
  experiments: {
    asyncWebAssembly: true,
  },
};
const webpackConfig = require("./webpack.config.js");
const compiler = webpack(config);
// const compiler = webpack(webpackConfig);

// 由于手动添加了 `hot` 与 `client` 参数，其将被禁用
const server = new webpackDevServer({ hot: false, client: {} }, compiler);

(async () => {
  await server.start();
  console.log("dev server 正在运行");
})();
