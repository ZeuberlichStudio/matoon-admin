const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { HotModuleReplacementPlugin } = webpack;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {
    const devMode = env.NODE_ENV !== 'production';

    console.log(`Running ${ devMode ? 'development' : 'production' } mode`);

    return {
        mode: devMode ? 'development' : 'production',
        devServer: {
            contentBase: './dist',
            publicPath: '/',
            historyApiFallback: true,
            compress: true,
            hot: true,
            open: true,
            port: 3000
        },
        target: 'web',
        devtool: devMode ? 'inline-source-map' : 'hidden-source-map',
        resolve: { 
            alias: { '~': path.join(__dirname, 'src')}, 
            mainFiles: ['index']
        },
        entry: './src/index.js',
        output: {
            filename: devMode ? 'js/[name].js' : 'js/[name].[contenthash].js',
            path: path.join(__dirname, 'dist'),
            publicPath: '/'
        },
        // optimization: {
        //     runtimeChunk: 'single',
        //     splitChunks: {
        //         cacheGroups: {
        //             vendor: {
        //                 test: /[\\/]node_modules[\\/]/,
        //                 name: 'vendors',
        //                 chunks: 'all'
        //             }
        //         }
        //     }
        // },
        plugins: [
            new CleanWebpackPlugin(),
            new Dotenv({ path: `./.env${devMode ? '.dev' : ''}` }),
            new MiniCssExtractPlugin({
                filename: devMode ? 'css/[name].css' : 'css/[name].[contenthash].css',
            }),
            devMode && new HotModuleReplacementPlugin(),
            devMode && new ReactRefreshPlugin(),
            new HtmlWebpackPlugin({
                title: 'Matoon Store',
                template: './index.html'
            }),
        ].filter(Boolean),
        module: {
            rules: [
                {   //js
                    test: /\.js?$/,
                    loader: 'babel-loader',
                    options: {
                        presets: [ '@babel/preset-env', '@babel/preset-react' ],
                        plugins: [ '@loadable/babel-plugin' ]
                    }
                },
                {   //styles
                    test: /\.s[ac]ss$/,
                    use: [
                        devMode ? 'style-loader' : {
                            loader: MiniCssExtractPlugin.loader,
                            options: { publicPath: '../' }
                        },
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: { plugins: [require('autoprefixer')]}
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                implementation: require('sass'),
                                sourceMap: true
                            }
                        }
                    ]
                },
                {   //images
                    test: /\.(jpg|png|svg)$/,
                    loader: 'file-loader',
                    options: { outputPath: './images' }
                },
                {   //fonts
                    test: /\.(ttf|eot|woff|woff2)$/,
                    loader: 'file-loader',
                    options: { outputPath: './fonts' }
                }
            ]
        }
    }
}