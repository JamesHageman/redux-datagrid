var webpack = require('webpack');

function getEntrySources(sources) {
  if (process.env.NODE_ENV !== 'production') {
    sources.push('webpack-dev-server/client?http://localhost:8080');
    sources.push('webpack/hot/only-dev-server');
  }
  return sources;
}

module.exports = {
  devtool: process.env.NODE_ENV !== 'production' ? 'eval-source-map' : '',
  entry: {
    bundle: getEntrySources(['./src/index.js'])
  },
  output: {
    publicPath: 'http://localhost:8080/',
    filename: "dist/[name].js"
  },
  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'source-map-loader'
    }],
    loaders: [{
      test: /\.css$/,
      loader: "style!css"
    }, {
      test: /\.js$/,
      loaders: ['react-hot', 'babel-loader?stage=0', 'eslint-loader'],
      exclude: /node_modules/
    }, {
      /*
      test: /\.js$/,
      loader: 'react-hot',
      exclude: /node_modules/
    }, {
      test: /\.js$/,
      loader: 'babel',
      query: {
        // https://github.com/label/label-loader#options
        cacheDirectory: true,
        presets: ['react', 'stage-0', 'es2015'],
        plugins: ['transform-class-properties']
      },
      exclude: /node_modules/
    }, {
      test: /\.js$/,
      loader: 'eslint-loader',
      exclude: /node_modules/
    }, {*/
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.png$/,
      loader: 'url-loader?prefix=img/&limit=5000'
    }, {
      test: /\.jpg$/,
      loader: 'url-loader?prefix=img/&limit=5000'
    }, {
      test: /\.gif$/,
      loader: 'url-loader?prefix=img/&limit=5000'
    }, {
      test: /\.woff$/,
      loader: 'url-loader?prefix=font/&limit=5000'
    }, {
      test: /\.eot$/,
      loader: 'file-loader?prefix=font/'
    }, {
      test: /\.ttf$/,
      loader: 'file-loader?prefix=font/'
    }, {
      test: /\.svg$/,
      loader: 'file-loader?prefix=font/'
    }]
  }
};
