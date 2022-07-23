const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const NodemonPlugin = require('nodemon-webpack-plugin')
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
	],
	target: ['node', 'es5'],
	mode: 'production',
}
