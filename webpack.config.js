const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin } = require('webpack')

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
                    exclude: /node_modules/
                }
            ]
        },
        plugins: [
            new DefinePlugin({
                __DEV__: argv.mode === 'development' ? 'true' : null
            }),
            new HtmlWebpackPlugin({
                title: 'Boilerplate'
            })
        ]
    }
}
