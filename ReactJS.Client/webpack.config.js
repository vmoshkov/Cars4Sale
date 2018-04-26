const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');



/*
 * We've enabled commonsChunkPlugin for you. This allows your app to
 * load faster and it splits the modules you provided as entries across
 * different bundles!
 *
 * https://webpack.js.org/plugins/commons-chunk-plugin/
 *
 */

module.exports = {
   // mode: 'development',
    entry: {
        index: "./src/index.tsx",
        header: "./src/components/Header.tsx",
        mainpage: "./src/components/MainPage.tsx",
        dataProvider: "./src/components/DataProvider.tsx",
        DeletionAlert: "./src/components/DeletionAlert.tsx",
        ManufacturerEditor: "./src/components/ManufacturerEditor.tsx",
        CarsEditor: "./src/components/CarsEditor.tsx",
        ManufacturerList: "./src/components/ManufacturerList.tsx",
        CarsList: "./src/components/CarsList.tsx",
    },

    output: {
        filename: 'scripts/[name].bundle.js',
        //chunkFilename: 'scripts/[name].[chunkhash].js',
        path: path.resolve(__dirname, './build/dist')
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            {
                test: /\.ts|\.tsx$/,
                loader: "awesome-typescript-loader"
            },
            {
                test: /\.css$/,
                use: [{
                    loader: 'style-loader',
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: 'css-loader'
                }]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(ttf|eot|svg)$/,
                use: {
                  loader: 'file-loader',
                  options: {
                    name: 'fonts/[hash].[ext]'
                  }
                }
              },
              {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: 'fonts/[hash].[ext]',
                        limit: 5000,
                        mimetype: 'application/font-woff'
                    }
                }
              },
        ]
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "react",
                    chunks: "all"
                }
            }
        }
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public', 'index.html'),
        }),
        new CopyWebpackPlugin([
            { from: 'src/img/', to: 'img/', force: true }
          ]),
        new CleanWebpackPlugin(['build'])
       
    ],
 
}