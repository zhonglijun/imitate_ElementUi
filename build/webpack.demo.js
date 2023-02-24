const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: 'development',
    entry: './examples/entry.js',
    output: {
        path: path.resolve(process.cwd(), './examples/element-ui/'),
        publicPath: '',
        filename: '[name].[hash:7].js',
        chunkFilename: '[name].js'
    },
    // 启动一个服务
    devServer: {
        host: 'localhost',
        port: 8082,
        publicPath: '/',
        hot: true,
        stats: 'minimal'
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
            },
            // 处理 scss 
            {
                test: /\.(scss|css)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.md$/,
                use: [
                    // 处理 .vue  文件
                    {
                        loader: 'vue-loader',
                        options: {
                            compilerOptions: {
                                preserveWhitespace: false
                            }
                        }
                    },
                    // 自定义一个 loader, 通过 loader 先把 .md 文件转成 .vue 文件形式
                    {
                        loader: path.resolve(__dirname, './md-loader/index.js')
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './examples/demo.html', // 模板文件
            filename: './index.html', // 将生成的 HTML 写入到文件中, 默认写入在当前项目的 index.html 中。webpack-dev-server 启动一个服务, 默认会读取项目根目录下的 index.html, 所以 filename 最好是 index.html, 当然你要改也是可以的
        }),
        new VueLoaderPlugin(),
    ]
}