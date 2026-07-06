var config = require('../config');
if (!config.tasks.js) return;

var path = require('path');
var pathToUrl = require('./pathToUrl');
var webpack = require('webpack');
var webpackManifest = require('./webpackManifest');

module.exports = function (env) {
  var jsSrc = path.resolve(config.root.src, config.tasks.js.src);
  var jsDest = path.resolve(config.root.dest, config.tasks.js.dest);
  /*var publicPath = config.tasks.browserSync.proxy ?
      config.tasks.browserSync.proxy + '/' + config.tasks.js.publicPath + '/' :
      pathToUrl(config.tasks.js.dest, '/');  */
  var publicPath = pathToUrl('/', config.root.publicPath + config.tasks.js.dest, '/');

  var extensions = config.tasks.js.extensions.map(function (extension) {
    return '.' + extension;
  })

  var rev = config.tasks.production.rev && env === 'production';
  var filenamePattern = rev ? '[name]-[hash].js' : '[name].js';

  var webpackConfig = {
    context: jsSrc,
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        Promise: "core-js/es/promise"
      })
    ],
    resolve: {
      //root: jsSrc,
      //extensions: [''].concat(extensions),

      modules: [
        jsSrc,
        'node_modules'
      ]
    },
    module: {
      rules: [
        {
          test: require.resolve('jquery'),
          use: [{
            loader: 'expose-loader',
            options: 'jQuery'
          },{
            loader: 'expose-loader',
            options: '$'
          }]
        },
        {
          test: /\.js$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
          enforce: 'pre',
          query: config.tasks.js.eslint
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: config.tasks.js.babel
        },
        {
          test:/\.hbs$/,
          loader: 'handlebars-loader'
        }
      ]
    },
    optimization: {}
  }

  if (env === 'development') {
    webpackConfig.devtool = 'inline-source-map';
    webpackConfig.mode = 'development';

    webpackConfig.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            },
            'asset.loc': {
              'CSS': config.tasks.css ? JSON.stringify(path.join(config.root.base.dev,config.tasks.css.dest,'/')) : '',
              'IMAGES': config.tasks.images ? JSON.stringify(path.join(config.root.base.dev,config.tasks.images.dest,'/')) : '',
              'FONTS': config.tasks.fonts ? JSON.stringify(path.join(config.root.base.dev,config.tasks.fonts.dest,'/')) : ''
            }
        })
        // new webpack.optimize.MinChunkSizePlugin({
        //   minChunkSize: 75000
        // })
        //new webpack.optimize.DedupePlugin()
    );
  }

  if (env === 'browser-sync') {
    webpackConfig.devtool = 'inline-source-map';
    webpackConfig.mode = 'development';

    // Create new entries object with webpack-hot-middleware added
    for (var key in config.tasks.js.entries) {
      var entry = config.tasks.js.entries[key]
      config.tasks.js.entries[key] = ['webpack-hot-middleware/client?&reload=true'].concat(entry)
    }

     webpackConfig.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            },
            'asset.loc': {
              'CSS': config.tasks.css ? JSON.stringify(path.join(config.root.base.dev,config.tasks.css.dest,'/')) : '',
              'IMAGES': config.tasks.images ? JSON.stringify(path.join(config.root.base.dev,config.tasks.images.dest,'/')) : '',
              'FONTS': config.tasks.fonts ? JSON.stringify(path.join(config.root.base.dev,config.tasks.fonts.dest,'/')) : ''
            }
        }),
        new webpack.HotModuleReplacementPlugin()
        // new webpack.optimize.MinChunkSizePlugin({
        //   minChunkSize: 5000
        // })
    );
  }

  if (env !== 'test') {
    // Karma doesn't need entry points or output settings
    webpackConfig.entry = config.tasks.js.entries

    webpackConfig.output = {
      path: path.normalize(jsDest),
      filename: filenamePattern,
      publicPath: publicPath
    }

    // if (config.tasks.js.extractSharedJs) {
      // Factor out common dependencies into a shared.js
      // webpackConfig.plugins.push(
      //   new webpack.optimize.CommonsChunkPlugin({
      //     name: 'app',
      //     //filename: filenamePattern,
      //     children: true,
      //     minChunks: 2,
      //     async: true,
      //   })
      // );
      // webpackConfig.optimization.splitChunks = {
      //   name: 'app',
      //   minChunks: 2,
      //   chunks: 'async',
      // };
    // }
  }

  if (env === 'production') {
    webpackConfig.mode = 'production';

    if (rev) {
      webpackConfig.plugins.push(new webpackManifest(publicPath, config.root.dest))
    }

    webpackConfig.plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        },
        'asset.loc': {
          'CSS': config.tasks.css ? JSON.stringify(path.join(config.root.base.prod,config.tasks.css.dest,'/')) : '',
          'IMAGES': config.tasks.images ? JSON.stringify(path.join(config.root.base.prod,config.tasks.images.dest,'/')) : '',
          'FONTS': config.tasks.fonts ? JSON.stringify(path.join(config.root.base.prod,config.tasks.fonts.dest,'/')) : ''
        }
      }),
      // new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.MinChunkSizePlugin({
        minChunkSize: config.tasks.js.webpack.minChunkSize,
      }),
      // new webpack.NoEmitOnErrorsPlugin()
    );

    webpackConfig.optimization.noEmitOnErrors = true;
    webpackConfig.optimization.minimize = config.tasks.js.webpack.enableProdMinification;
  }

  return webpackConfig;
}
