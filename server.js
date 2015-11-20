const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/dist', express.static('dist'));

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
