const path = require('path');
const webpack = require('webpack');
// const CopyWebpackPlugin=require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const commenConfigFunc = require('./webpack.common.config.js');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
module.exports = (env, argv) => {
    console.log(env, 'env');
    console.log(argv, 'argv');
    const commenConfig = commenConfigFunc(env, argv);
    return {
        ...commenConfig,

        mode: 'production',
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    extractComments: false, //不将注释提取到单独的文件中,不生成license文件
                }),
            ],
            splitChunks: {
                cacheGroups: {
                    vendors: {
                        minChunks: 1,
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10, // 权重
                        minSize: 0,
                    },
                    base: {
                        priority: -20, // 权重
                        chunks: 'initial', //initial表示提取入口文件的公共部分
                        minChunks: 2, //表示提取公共部分最少的文件数
                        minSize: 0, //表示提取公共部分最小的大小
                        name: 'base', //提取出来的文件命名
                    },
                },
            },
        },
    };
};
