const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const styleLoader = {
  loader: 'style-loader',
  options: {
    sourceMap: true
  }
}

const cssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: true
  }
}

const sassLoader = {
  loader: 'sass-loader',
  options: {
    sourceMap: true
  }
}

const resolveUrlLoader = {
  loader: 'resolve-url-loader',
  options: {
    sourceMap: true
  }
};

const useDevServer = true;
const publicPath = useDevServer ? 'http://localhost:8080/build/' : '/build/';

module.exports = {
  entry: {
    rep_log: './assets/js/rep_log.js',
    login: './assets/js/login.js',
    layout: './assets/js/layout.js'
  },
  output: {
    path: path.resolve(__dirname, 'web', 'build'),
    filename: '[name].js',
    publicPath: publicPath 
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            cssLoader
          ],
          //use this if CSS isn't extracted
          fallback: styleLoader
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            cssLoader,
            resolveUrlLoader,
            sassLoader
          ],
          fallback: styleLoader
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]-[hash:6].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]-[hash:6].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new CopyWebpackPlugin([
      //copies to {output}/static
      {from: './assets/static', to: 'static'}
    ]),
    new webpack.optimize.CommonsChunkPlugin({
      name: [
        //layout is an entry file
        //anything including in layout, is not included in another output files
       'layout',
       //dumps the manifest in a separate file
       'manifest'
      ],
      minChunk: Infinity,
    }),
    new ExtractTextPlugin('[name].css')
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './web',
    headers: { 'Access-Control-Allow-Origin': '*' }
  }
}