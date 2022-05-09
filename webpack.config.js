const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin } = require('webpack')
require('dotenv').config()
const typescriptIsTransformer = require('typescript-is/lib/transform-inline/transformer').default

module.exports = function (env, argv) {
    return {
        name: 'boilerplate',
        entry: './index',
        resolve: {
            extensions: ['.ts', '.js', '.tsx']
        },
        context: resolve(__dirname, 'src'),
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/,
                    options: {
                        getCustomTransformers: program => ({
                            before: [typescriptIsTransformer(program)]
                        })
                    }
                }
            ]
        },
        plugins: [
            new DefinePlugin({
                __DEV__: argv.mode === 'development' ? 'true' : null,
                __API_KEY__: `"${process.env.API_KEY}"`
            }),
            new HtmlWebpackPlugin({
                title: 'Boilerplate'
            })
        ]
    }
}
