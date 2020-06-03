const express = require('express')
const path = require('path');

const app = express();

app.use(function(req, res, next) {
  next();
  console.log(`${req.method} ${req.url}\n=> status: ${res.statusCode}`);
})

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html')

app.get('/', function(req, res) {
  res.render('index');
})

app.get('/files/:name', function (req, res, next) {
  var options = {
    root: path.join(__dirname, 'public'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }

  var fileName = req.params.name
  res.sendFile(fileName, options, function (err) {
    if (err) next(err)
  })
})

app.listen(3000)