import { BannerPlugin, type Configuration } from 'webpack'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import NodemonPlugin from 'nodemon-webpack-plugin'
import { resolve } from 'path'

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
			'.png',
			'.jpg',
			'.jpeg',
			'.svg',
			'.gif',
		],
	},
	output: {
		filename: 'index.min.js',
		path: resolve(__dirname, './build'),
	},
	plugins: [
		new CleanWebpackPlugin(),
		new NodemonPlugin({
			cwd: resolve(__dirname, 'build'),
			script: 'index.min.js',
		}),
		new BannerPlugin({
			banner: '#!/usr/bin/env node',
			raw: true,
		}),
	],
	target: ['node', 'es5'],
	mode: 'production',
}

// eslint-disable-next-line no-restricted-syntax
export default config
