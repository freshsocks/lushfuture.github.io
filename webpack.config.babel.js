const path = require('path')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const merge = require('webpack-merge')
const validate = require('webpack-validator')

const parts = require('config/webpack-parts')
const package = require('./package.json')

const EXCLUDE_DEPS = ['font-awesome']

const DEPS = Object.keys(PKG.dependencies).filter(dep => EXCLUDE_DEPS.indexOf(dep) < 0)

const TARGET = process.env.npm_lifecycle_event

const PATHS = {
  app: path.join(__dirname, 'app'),
  style: [
    path.join(__dirname, 'app', 'main.css')
  ],
  excludeStyle: [
    path.join(__dirname, 'node_modules', 'font-awesome')
  ],
  build: path.join(__dirname, 'dist'),
  test: path.join(__dirname, 'test'),
  alias: {
    app: path.join(__dirname, 'app'),
    store: path.join(__dirname, 'app', 'store'),
    components: path.join(__dirname, 'app', 'views', 'components'),
    containers: path.join(__dirname, 'app', 'views', 'containers'),
    routes: path.join(__dirname, 'app', 'routes')
  },
  favicon: path.join(__dirname, 'static', 'favicon', 'book-text-icon.svg')
}

const common = {
  entry: {
    ['font-awesome']: 'font-awesome-webpack!./config/font-awesome.config.js',
    style: PATHS.style,
    app: PATHS.app,
    vendor: DEPS
  },
  output: {
    path: PATHS.build,
    filename: '[name]'
  },
  module: {
    loaders: [
      {
        test: /\.js/,
        // Enable caching for improved performance during development
        // It uses default OS directory by default. If you need
        // something more custom, pass a path to it.
        // I.e., babel?cacheDirectory=<path>
        loaders: ['babel?cacheDirectory'],
        // Parse only app files! Without this it will go through
        // the entire project. In addition to being slow,
        // that will most likely result in an error.
        include: PATHS.app
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.css'],
    alias: PATHS.alias
  },
  plugins: [
    new FaviconsWebpackPlugin(PATHS.favicon),
    new HtmlWebpackPlugin({
      title: "merkpad"
    }),
  ]
}

let config

switch (TARGET) {

  /**
   *  npm run build
   */

  case 'build':
    config = merge(
      common,
      {
        devtool: 'source-map',
        output: {
          path: PATHS.build,
          filename: '[name].[chunkhash]',
          chunkFilename: '[chunkhash]'
        }
      },
      parts.clean(PATHS.build),
      parts.setFreeVariable(
        'process.env.NODE_ENV',
        'production'
      ),
      parts.extractBundle({
        name: 'vendor',
        entries: ['inferno', 'inferno-dom']
      }),
      parts.minify(),
      parts.extractCSS(PATHS.style),
      parts.loadCSSAssets(),
      parts.purifyCSS([PATHS.app])
    )
    break

  /**
   *  npm test
   */

  case 'test':
  case 'test:tdd':
    config = merge(
      common,
      {
        devtool: 'inline-source-map'
      },
      parts.loadIsparta(PATHS.app),
      parts.loadJSX(PATHS.test)
    )
  default:
    config = merge(
      common,
      {
        devtool: 'eval-source-map'
      },
      parts.setFreeVariable(
        'process.env.NODE_ENV',
        'development'
      ),
      parts.minify(),
      parts.setupCSS(PATHS.style, PATHS.excludeStyle),
      parts.loadCSSAssets(),
      parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT,
        poll: ENABLE_POLLING
      }),
      parts.devDashboard()
    )
}

module.exports = validate(config, {
  quiet: false
})
