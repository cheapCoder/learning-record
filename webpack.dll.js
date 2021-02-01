const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    library: ['jquery'],
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dll'),
    library: "[name]_[hash]"
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_[hash]',
      path: resolve(__dirname, 'dll/manifest.json')
    })
  ],
  mode: 'production'
};