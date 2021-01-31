const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// process.env.NODE_ENV = 'development'

module.exports = {
  mode: 'development',
  // mode: 'production',   // 生产模式下自动压缩HTML和JS
  entry: ['./src/index.js', './src/index.html'],
  output: {
    filename: 'build.js',
    path: resolve(__dirname, "dist"),
    publicPath: './',
    assetModuleFilename: 'images/[name]-[hash][ext][query]',
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
              }
            }]]
          }
        }
      }
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      template: resolve(__dirname, 'src/index.html'),
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
  ],

  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      // new ESLintPlugin(),
    ],
  },
  target: 'web',    //TODO: 解决浏览器不刷新的bug
  devServer: {
    contentBase: resolve(__dirname, 'dist'), //打包后监听的目录，
    compress: true,
    port: 9000,
    open: true,
    hot: true,
    // inline: true
  },
  devtool: 'eval-source-map'
}