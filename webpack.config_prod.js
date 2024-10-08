const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'build');
// const SRC_DIR = path.resolve(__dirname, 'src');

module.exports = {
	mode: 'production',
	output: {
		path: BUILD_DIR,
		filename: './app_static/[name].bundle.js',
		publicPath: "/", 
		clean: true,
	},
	watch: true,
	devServer: {
		contentBase: BUILD_DIR,
		//   port: 9001,
		compress: true,
		hot: true,
		open: true,
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [['@babel/preset-env', { targets: 'defaults' }]],
					},
				},
			},
			{
				test: /\.html$/,
				loader: 'html-loader',
			},
			{
				test: /\.(scss)$/,
				loader: 'css-loader',
			},
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.svg$/i,
				issuer: /\.[jt]sx?$/,
				use: ['@svgr/webpack', 'url-loader'],
			},
			{
				test: /\.(png|jpg|jpeg|gif|ico)$/,
				use: [
					{
						// loader: 'url-loader'
						loader: 'file-loader',
						options: {
							name: './img/[name].[hash].[ext]',
							publicPath: "/", 
						},
					},
				],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin({
			cleanAfterEveryBuildPatterns: ['*.LICENSE.txt'],
		}),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			inject: true,
			filename: 'index.html',
			template: './public/index.html',
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: "./public", to: "app_static" },
				{ from: "./src/icons/svg/provider", to: "app_static/icons/provider" },
				{ from: "./src/icons/svg", to: "app_static/icons" },
			],
		}),
		new MiniCssExtractPlugin({
			filename: './app_static/[name].styles.css',
			attributes: {},
		}),
		new webpack.DefinePlugin({}),
		{
			apply: (compiler) => {
				compiler.hooks.done.tap('DonePlugin', (stats) => {
					console.log('Compile is done !');
					setTimeout(() => {
						process.exit(0);
					});
				});
			},
		},
	],
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					format: {
						comments: false,
					},	
				},
				extractComments: false,
				parallel: true,
			}),
		],
	},
};
