const { resolve } = require('path');
constHtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  plugins: [
    newHtmlWebpackPlugin({
      template: './src/index.html',
      //压缩html代码
      minify: {
        //移除空格
        collapseWhitespace: true,
        //移除注释
        removeComments: true
      }
    })
  ],
  mode: 'production'
};