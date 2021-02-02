const path = require('path');

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: './js/index.js'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.less$/,
        loader: ['style-loader', 'css-loader', 'less-loader'], // 将 Less 文件编译为 CSS 文件
      },
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   enforce: 'pre',
      //   loader: 'eslint-loader',
      //   options: {
      //     // eslint options (if necessary)
      //   },
      // },
      // {
      //     test: /\.m?js$/,
      //     exclude: /(node_modules|bower_components)/,
      //     use: {
      //       loader: 'babel-loader',
      //       options: {
      //         presets: ['@babel/preset-env']
      //       }
      //     }
      // }
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[hash:4].[ext]',
              publicPath: './dist/images',    // 决定图片的url路径
              outputPath: 'images',           // 决定文件本地输出路径
            },
          },
        ],
      },
      // {
      //   test: /\.(png|jpe?g|gif)$/i,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         outputPath: 'images'
      //       }
      //     },
      //   ],
      // },
    ],
  },
};