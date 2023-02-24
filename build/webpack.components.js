// webpack.components.js
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const Components = require('../components.json'); // 引入组件的配置文件

const webpackConfig = {
  mode: 'production',
  entry: Components, // {'button': './packages/button/index.js'}
  output: {
    path: path.resolve(process.cwd(), './lib'),
    filename: '[name].js', // 组件名
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};

module.exports = webpackConfig;