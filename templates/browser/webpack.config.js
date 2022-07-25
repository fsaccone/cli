const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { resolve } = require('path')

module.exports = {
    entry: { app: './src/index.ts' },
    module: {
        rules: [
            {
                test: /\.ts$/u,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-typescript',
                        ],
                    },
                },
                include: [resolve(__dirname, './src')],
            },
            {
                test: /\.css$/u,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/u,
                type: 'asset/resource',
                generator: { filename: './assets/[hash][ext]' },
            },
        ],
    },
    resolve: {
        modules: [
            resolve(__dirname, 'src'),
            'node_modules',
        ],
        extensions: [
            '.ts',
            '.js',
            '.json',
            '.css',
            '.png',
            '.jpg',
            '.jpeg',
            '.svg',
            '.gif',
        ],
    },
    output: {
        filename: '[contenthash].min.js',
        path: resolve(__dirname, './build'),
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: true,
            template: resolve(__dirname, './static/index.html'),
        }),
        new MiniCssExtractPlugin({ filename: './[contenthash].min.css' }),
        new CssMinimizerPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: resolve(__dirname, './static/favicon.ico'),
                    to: './favicon.ico',
                },
                {
                    from: resolve(__dirname, './static/apple-touch-icon.png'),
                    to: './apple-touch-icon.png',
                },
            ],
        }),
    ],
    target: ['web', 'es5'],
    mode: 'production',
}
