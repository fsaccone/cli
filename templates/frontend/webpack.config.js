const { resolve } = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

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
							'@babel/preset-typescript'
						]
					}
				},
				include: [
					resolve(__dirname, './src')
				]
			},
			{
				test: /\.css$/u,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			},
			{
				test: /\.(?!(ts|js|json|css)$).*$/u,
				type: 'asset/resource',
				generator: { filename: './assets/[hash][ext]' }
			}
		]
	},
	resolve: {
		modules: [
			resolve(__dirname, 'src'),
			'node_modules'
		],
		extensions: [
			'.ts',
			'.js',
			'.json',
			'.css'
		]
	},
	output: {
		filename: '[contenthash].js',
		path: resolve(__dirname, './build')
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			inject: true,
			template: resolve(__dirname, './static/index.html'),
			favicon: resolve(__dirname, './static/favicon.png')
		}),
		new MiniCssExtractPlugin({ filename: '[contenthash].css' }),
		new CssMinimizerPlugin()
	],
	target: ['web', 'es5'],
	mode: 'production'
};
