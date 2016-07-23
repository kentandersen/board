var path = require('path');
var express = require('express');
var proxy = require('./src/proxy');

var app = express();
const port = Number(process.env.PORT) || Number(process.argv[2]) || 8080;

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/json-proxy', (req, res) => {
  const {url} = req.query;
  if(url) {
    proxy(url)
      .then(data => res.json(data))
      .catch(error => res.status(500).json({ error: error }));
  } else {
    res.status(404).json({error: 'url is not defined'})
  }
});

app.listen(port, () => console.log(`listening on port ${port}`));
