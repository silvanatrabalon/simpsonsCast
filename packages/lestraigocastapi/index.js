const express = require('express');
const app = express();
app.use(express.static('public'));
const jsonSimpsons = require('./example.json');
const jsonGenerator = require('./jsonGenerator');

app.listen(3000, () => {
  app.get('/', async function (req, res) {
    res.json(await jsonGenerator());
  });
  app.get('/example', function (req, res) {
    res.json(jsonSimpsons);
  });
});
