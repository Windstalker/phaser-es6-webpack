const path = require('path')
const webpack = require('webpack')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

const outputDir = 'dist'

module.exports = {
  entry: {
    app: [path.resolve(__dirname, 'src/main.js')],
    vendor: ['phaser']
  },
  mode: 'development',
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, outputDir),
    publicPath: path.resolve('.', outputDir),
    filename: 'bundle.js'
  },
  watch: true,
  plugins: [
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true)
    }),
    new BrowserSyncPlugin({
      host: process.env.IP || 'localhost',
      port: process.env.PORT || 3000,
      server: {
        baseDir: ['./', './build']
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: path.join(__dirname, 'src')
      }
    ]
  },
  // TODO: Add HtmlWebpackPlugin for generation of index.html
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  }
}
