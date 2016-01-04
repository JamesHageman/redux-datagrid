const express = require('express');
const webpack = require('webpack');
const winston = require('winston');
const chalk = require('chalk');

const app = express();
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  const config = require('./webpack.config');
  const compiler = webpack(config);

  winston.info('Bundling webpack... Please wait.');

  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      reasons: true,
    },
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

app.get('*', express.static('dist'));

app.listen(PORT, (err) => {
  if (err) {
    winston.error(err);
    return;
  }

  winston.info(`Listening on port ${ chalk.yellow(PORT) }`);
});
