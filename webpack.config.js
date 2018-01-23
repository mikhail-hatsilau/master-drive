const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: [
        'babel-polyfill',
        './base.scss',
        './index',
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        new CleanWebpackPlugin('dist'),
        new webpack.optimize.ModuleConcatenationPlugin(),
    ],
};
