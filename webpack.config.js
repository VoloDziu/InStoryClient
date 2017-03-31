const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV || 'development'

const getPlugins = () => {
  let plugins = []

  if (NODE_ENV === 'development') {
    plugins.push(new CleanWebpackPlugin(['instory'], {
      root: path.resolve('/', 'Users', 'velz', 'webserver'),
      exclude: ['index.html']
    }))
  } else if (NODE_ENV === 'production') {
    plugins.push(new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname),
      exclude: ['index.html']
    }))
  }

  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(NODE_ENV)
    },
    SERVER_URL: NODE_ENV === 'development'
      ? JSON.stringify('https://localhost.com/server')
      : JSON.stringify('https://vdziubak.com/instoryServer')
  }))

  plugins.push(new ExtractTextPlugin('styles.css'))

  return plugins
}

const config = {
  entry: path.resolve(__dirname, 'src', 'index'),
  output: {
    path: NODE_ENV === 'development'
      ? path.resolve('/', 'Users', 'velz', 'webserver', 'instory')
      : path.resolve(__dirname, 'dist'),
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
  devtool: NODE_ENV === 'production' ? false : 'cheap-inline-module-source-map',
  watch: NODE_ENV === 'development'
}

module.exports = config
