var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.sendfile('index.html');
})


var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Server start and listen on http://%s:%s', host, port)

})
