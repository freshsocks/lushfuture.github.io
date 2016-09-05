const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const PurifyCSSPlugin = require('purifycss-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')

exports.devServer = options => ({
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: 'errors-only',
    host: options.host,
    port: options.port,
    quiet: true,
    open: true,
    contentBase: 'http://localhost:8080/static'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({
      multiStep: true
    })
  ]
})

exports.devDashboard = (port = 3000) => ({
  plugins: [
    new DashboardPlugin(port)
  ]
})

exports.minify = () => ({
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false
      }
    })
  ]
})

exports.setFreeVariable = (key, value) => {
  const env = {}
  env[key] = JSON.stringify(value)

  return {
    plugins: [
      new webpack.DefinePlugin(env)
    ]
  }
}

exports.extractBundle = options => {
  const entry = {}
  entry[options.name] = options.entries

  return {
    entry: entry,
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        names: [options.name, 'manifest']
      })
    ]
  }
}

exports.clean = path => ({
  plugins: [
    new CleanWebpackPlugin([path], {
      root: process.cwd()
    })
  ]
})

exports.dedupe = () => ({
  plugins: [
    new webpack.optimize.DedupePlugin()
  ]
})

exports.removeConsole = paths => ({
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: paths,
        query: {
          plugins: ['transform-remove-console']
        }
      }
    ]
  }
})

// What information should be printed to the console
exports.logStats = (isDebug = true, isVerbose = false) => ({
  stats: {
    colors: true,
    reasons: isDebug,
    hash: isVerbose,
    version: isVerbose,
    timings: true,
    chunks: isVerbose,
    chunkModules: isVerbose,
    cached: isVerbose,
    cachedAssets: isVerbose,
  }
})

exports.htmlTemplate = opts => ({
  plugins: [
    new HtmlWebpackPlugin(Object.assign(
      {
        // Required
        inject: false,
        template: require('html-webpack-template'),
        //template: 'node_modules/html-webpack-template/index.ejs',

        // Optional
        appMountId: 'app',
        googleAnalytics: {
          trackingId: 'UA-37360536-3',
          pageViewOnLoad: true
        },
        meta: {
          description: "view and edit markdown notes"
        },
        mobile: true

        // and any other config options from html-webpack-plugin
        // https://github.com/ampedandwired/html-webpack-plugin#configuration
      },
      opts
    ))
  ]
})

/*  =============== *
 *     CSS Parts    *
 *  =============== */

exports.setupCSS = (exclude = '') => ({
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css?modules'],
        exclude
      }
    ]
  }
})

exports.extractCSS = (paths, opts) => {

  const cssLoaderOpts = `css?${JSON.stringify(opts ||
    {
      sourceMap: process.env.NODE_ENV !== 'production',
      // CSS Modules https://github.com/css-modules/css-modules
      modules: true,
      localIdentName: process.env.NODE_ENV !== 'production' ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',
      // CSS Nano http://cssnano.co/options/
      minimize: process.env.NODE_ENV === 'production'
    }
  )}`

  return {
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css'),
          include: paths
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('[name].[chunkhash].css')
    ]
  }
}

exports.purifyCSS = paths => ({
  plugins: [
    new PurifyCSSPlugin({
      basePath: process.cwd(),
      paths: paths
    })
  ]
})

exports.loadCSSAssets = () => ({
  module: {
    loaders: [{
      test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=application/font-woff"
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=application/octet-stream"
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: "file"
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=image/svg+xml"
    }]
  }
})
