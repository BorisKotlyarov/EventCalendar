const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');


module.exports = {
    mode: 'development',

    watch: true,

    entry: path.resolve('./frontend/src/scripts/index.js'),

    output: {
        filename: 'app.js',
        path: path.resolve('./frontend/dist')
    },

    devServer: {
        contentBase: path.resolve('./frontend/dist'),
        port: 3003
    },

    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                loader: 'vue-loader',
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './frontend/src/markup/index.html'
        }),
        new VueLoaderPlugin(),


    ]
};