const { resolve } = require('path')

module.exports = {
  mode: 'development',
  entry: '/src/index.js',
  output: {
    filename: 'build.js',
    path: resolve(__dirname, "dist/"),
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
    ],

  }
}