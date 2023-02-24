// build/webpack.common.js
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(process.cwd(), './lib'),
    filename: 'element-ui.common.js',
    libraryTarget: 'commonjs2', // 将库的返回值分配给module.exports
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false // 打包后清除多余的空格
          }
        }
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};