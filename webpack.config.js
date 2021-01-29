const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: '/src/index.js',
  output: {
    filename: 'build.js',
    path: resolve(__dirname, "dist/"),
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
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
        test: /\.(png|jpg|gif)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024
          }
        }
      }
    ],
  },
  plugins: [new HtmlWebpackPlugin({
    alwaysWriteToDisk: true,
    template: resolve(__dirname, 'src/index.html'),
    filename: 'index.html',
  })]
}