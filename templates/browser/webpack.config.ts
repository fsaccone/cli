import type { Configuration } from 'webpack'
import { resolve } from 'path'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'

const config: Configuration = {
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
			favicon: resolve(__dirname, './static/favicon.png'),
		}),
		new MiniCssExtractPlugin({ filename: './[contenthash].min.css' }),
		new CssMinimizerPlugin(),
	],
	target: ['web', 'es5'],
	mode: 'production',
}

// eslint-disable-next-line no-restricted-syntax
export default config
