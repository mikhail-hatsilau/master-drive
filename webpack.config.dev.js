const merge = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./webpack.config');

module.exports = merge(commonConfig, {
    module: {
        rules: [
            {
                test: /.scss$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            },
        }),
    ],
});
