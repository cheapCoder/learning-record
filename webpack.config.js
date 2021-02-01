const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

process.env.NODE_ENV = 'production'

module.exports = {
  // entry: './src/index.js',
  // entry: { main: './src/js/index.js', test: './src/js/test.js' },// 多入口代码分割
  entry: './src/js/index.js',
  output: {
    filename: '[name].[contenthash].js',
    path: resolve(__dirname, "dist"),
    publicPath: './',
    assetModuleFilename: 'images/[name]-[contenthash:10][ext][query]',
  },

  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/i,
            use: [
              MiniCssExtractPlugin.loader,
              // "style-loader",
              "css-loader", {
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
        ]
      },
      {
        // test: /\.(png|jpg|gif)$/i,          // 打包图片
        exclude: /\.(js|html|css|less)$/i,     // 打包其他资源，包括图片
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024
          }
        },
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        enforce: 'pre',
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {
              // 按需加载
              useBuiltIns: 'usage',
              // 指定core-js版本
              corejs: {
                version: 3
              },
              // 指定兼容性做到哪个版本浏览器
              targets: {
                chrome: '60',
                firefox: '60',
                ie: '9',
                safari: '10',
                edge: '17'
              },
              modules: false,
            }]],
            cacheDirectory: true,
          }
        }
      }
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      // alwaysWriteToDisk: true,
      template: resolve(__dirname, 'src/index.html'),
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
      // filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/built.[contenthash:10].css'
    }),
    new CleanWebpackPlugin(),
  ],

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    // usedExports: true,
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      // new ESLintPlugin(),
      new TerserPlugin()
    ],
  },
  target: 'web',    //NOTE: 解决浏览器不刷新的bug
  devServer: {
    contentBase: resolve(__dirname, 'dist'), //打包后监听的目录，
    compress: true,
    port: 9000,
    open: true,
    hot: true,
    // inline: true
  },
  // devtool: 'source-map',
  mode: "production",   // 生产模式下自动压缩HTML和JS， TODO:打不开tree shaking
}