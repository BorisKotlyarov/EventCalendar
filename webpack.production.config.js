const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
    mode: 'production',

    entry: path.resolve('./frontend/src/scripts/index.js'),

    output: {
        filename: 'js/app.js',
        path: path.resolve('./frontend/dist')
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
                loader: 'vue-loader'
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'vue-style-loader',
                    use: [{ loader: 'css-loader', options: { minimize: true } }, 'sass-loader']
                })
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin({
            allChunks: true,
            filename: 'style/style.css'
        }),
        new HtmlWebpackPlugin({
            template: './frontend/src/markup/index.html'
        }),
        new VueLoaderPlugin()
    ]
};