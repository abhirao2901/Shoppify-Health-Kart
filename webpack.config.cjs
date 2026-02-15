const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  target: 'web',
  entry: './src/main.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProd ? 'assets/js/[name].[contenthash].js' : 'assets/js/[name].js',
    assetModuleFilename: 'assets/media/[hash][ext][query]',
    publicPath: '/',
    clean: true,
    chunkFormat: 'array-push'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: path.resolve(__dirname, 'babel.config.cjs'),
            cacheDirectory: true,
            cacheCompression: false
          }
        }
      },
      {
        test: /\.module\.css$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: isProd ? '[hash:base64:6]' : '[path][name]__[local]'
              },
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('autoprefixer')]
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: { plugins: [require('autoprefixer')] }
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset',
        parser: { dataUrlCondition: { maxSize: 10 * 1024 } } // inline <10KB
      },
      {
        test: /\.json$/,
        type: 'json'
      }
    ]
  },
  devtool: isProd ? 'source-map' : 'eval-cheap-module-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
      watch: true
    },
    port: 8080,
    historyApiFallback: {
      // Handle React Router routes properly
      rewrites: [
        { from: /^\/product\/[^/]+$/, to: '/index.html' },
        { from: /^\/products\/[^/]+$/, to: '/index.html' },
        { from: /./, to: '/index.html' }
      ]
    },
    hot: true,
    open: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    ...(isProd ? [new MiniCssExtractPlugin({ filename: 'assets/css/[name].[contenthash].css' })] : [])
  ],
  optimization: {
    splitChunks: { chunks: 'all' },
    runtimeChunk: 'single'
  }
};
