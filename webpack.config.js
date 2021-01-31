const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

process.env.NODE_ENV = 'development'
console.log(process.env.NODE_ENV);

module.exports = {
  // mode: 'development',
  mode: 'production',
  entry: '/src/index.js',
  output: {
    filename: 'build.js',
    path: resolve(__dirname, "dist/"),
    publicPath: '',
    assetModuleFilename: 'images/[name]-[hash][ext][query]',
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", {
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              plugins: [
                [
                  "postcss-preset-env",
                ]
              ],
            },
          },
        }],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          //将less文件编译成css文件
          //需要下载less-loader和less
          'less-loader'
        ]
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        // test: /\.(png|jpg|gif)$/i,     // 打包图片
        exclude: /\.(js|html|css)$/i,     // 打包其他资源，包括图片
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024
          }
        },
      },
    ],
  },

  plugins: [new HtmlWebpackPlugin({
    alwaysWriteToDisk: true,
    template: resolve(__dirname, 'src/index.html'),
    filename: 'index.html',
  }), new MiniCssExtractPlugin(), new ESLintPlugin({
    // fix: true
  })],

  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },

  devServer: {
    contentBase: resolve(__dirname, '/dist'), //打包后监听的目录，
    compress: true,
    port: 9000,
    open: true,
  }
}