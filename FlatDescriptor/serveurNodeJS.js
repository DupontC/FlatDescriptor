var express = require('express');
var app = express();


//utile pour permettre à nos page HTML de
//charger des ressources (JavaScript, CSS,...)
app.use(express.static(__dirname + '/'));


//route pas défaut qui redirige vers l'annonce
app.get('/:id', function (req, res) {

  //on recupére l'id de l'annonce rechercher
  var idAnnonce = req.params.id

  //on redirige vers page avec les infos
  req.query.id = idAnnonce;
  //console.log(req.route);
  res.sendFile(__dirname+'/html/index.html?id=1');
})


var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Server is starting and listen on http://%s:%s', host, port);

})
