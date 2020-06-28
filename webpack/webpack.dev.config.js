// ./webpack/webpack.dev.config.js

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


//定一个通用的路径转换方法
const resolvePath = (pathstr) => path.resolve(__dirname, pathstr);

module.exports = {
    mode: 'development',
    entry: resolvePath('../src/client/app/index.js'),//入口文件
    output: {
        filename: 'index.js', //设置打包后的文件名
        path: resolvePath('../dist/static'),//设置构建结果的输出目录
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader' }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        //配置图片的输出路径和名称
                        options: { name: 'img/[name].[ext]'}
                    }
                ]
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            '__CLIENT__': true
        }),
        new MiniCssExtractPlugin({filename: '[name].css'})
    ],
    devServer: {
        contentBase: path.join(__dirname, '../src/client/app/index.js'),
        compress: true,
        port: 3001, // 启动端口为 3001 的服务
        hot: true,
        open: true // 自动打开浏览器
    }
}