const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV || 'development'

const getPlugins = () => {
  let plugins = []

  plugins.push(new CleanWebpackPlugin(['instory'], {
    root: path.resolve('/', 'Users', 'velz', 'webserver'),
    exclude: ['index.html']
  }))

  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(NODE_ENV)
    },
    SERVER_URL: JSON.stringify('https://localhost.com/server')
  }))

  plugins.push(new ExtractTextPlugin('styles.css'))

  return plugins
}

const config = {
  entry: path.resolve(__dirname, 'src', 'index'),
  output: {
    path: path.resolve('/', 'Users', 'velz', 'webserver', 'instory'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: function () {
                  return [
                    require('postcss-import'),
                    require('postcss-cssnext')
                  ]
                }
              }
            }
          ]
        })
      },
      {
        test: /\.(png|jpg|svg)/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[hash].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: getPlugins(),
  devtool: NODE_ENV === 'production' ? null : 'cheap-inline-module-source-map',
  watch: NODE_ENV === 'development'
}

module.exports = config
