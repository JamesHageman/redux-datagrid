const path = require('path');
const express = require('express');
const webpack = require('webpack');

const app = express();
const PORT = process.env.PORT || 3000;

const config = require('./webpack.config');
const compiler = webpack(config);

if (process.env.NODE_ENV !== 'production') {
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

app.use('/static', express.static('static'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${ PORT }`);
});
