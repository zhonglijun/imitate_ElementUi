// build/webpack.common.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
      // 处理 .vue 文件
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      }
    ]
  },
  plugins: [
      new HtmlWebpackPlugin({
        template: './examples/demo.html', 
        filename: './index.html', 
     }),
     new VueLoaderPlugin(), // vue-loader的15版本之后, 都要求伴生使用 Plugin ：https://vue-loader.vuejs.org/migrating.html#a-plugin-is-now-required
  ]
};