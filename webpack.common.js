const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin('[name].fonts.css');
const extractSCSS = new ExtractTextPlugin('[name].styles.css');

const SPLIT_STYLE = false;

module.exports = {
  entry: {
    app: './src/index.js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html',
        path: path.resolve(__dirname, 'dist')
    }),
    new ExtractTextPlugin( "bundle.css" )
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
              loader: 'babel-loader',
              options: {
              presets: ['env', 'react', 'es2015']
              }
          }
        },
        {
          test: /\.html$/,
          loader: 'html-loader'
        },
        {
          test: /\.css$/,
          use:  SPLIT_STYLE
            ? ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [
                {loader: 'css-loader', options: { importLoaders: 1 }},
                'postcss-loader'
              ]
            })
            : [
                'style-loader',
                {loader: 'css-loader', options: { importLoaders: 1 }},
                'postcss-loader'
            ]
        },
        {
          test: /\.(scss)$/,
          use: [{
            loader: 'style-loader', // inject CSS to page
          }, {
            loader: 'css-loader', // translates CSS into CommonJS modules
          }, {
            loader: 'postcss-loader', // Run post css actions
            options: {
              plugins: function () { // post css plugins, can be exported to postcss.config.js
                return [
                  require('precss'),
                  require('autoprefixer')
                ];
              }
            }
          }, {
            loader: 'sass-loader' // compiles SASS to CSS
          }]
        },
        {
          test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
          use: [
            {
              loader:  'url-loader',
              options: {
                limit: 100000,
                name: '[name].[ext]'
              }
            }
          ]
        }
    ]
  }
};