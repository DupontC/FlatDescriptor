//declaration des librairies
var app = express();
var express = require('express');
mongoose = require("mongoose");

// Create a schema for our flats data
Schema = mongoose.Schema;
var flatSchema = new Schema({
  id_annonce : Number,
  enLigne : Boolean,
  ville   : String,
  titre1  : String,
  texte1  : String,
  image1  : String,
  titre2  : String,
  texte2  : String,
  image2  : String,
  titre3  : String,
  texte3  : String,
  image3  : String,
  titre4  : String,
  texte4  : String,
  image4  : String,
  emplacement :String,
  latitude : String,
  longitude : String,
  adresse : String,
  photos: String,
  albumPhotos : String,
  contacts :String,
  color : String
});

// Use the schema to register a model with MongoDb
mongoose.model('flat', flatSchema);
var flat = mongoose.model('flat');


app.set('port', (process.env.PORT || 3000))

//utile pour permettre à nos page HTML de
//charger des ressources (JavaScript, CSS,...)
app.use(express.static(__dirname + '/'));


//route pas défaut qui redirige vers l'annonce
app.get('/:id', function (req, res) {
  res.sendFile(__dirname+'/html/index.html');
})

//route pas défaut qui redirige vers l'annonce
app.get('/ImmoConfig/:id', function (req, res) {
  res.sendFile(__dirname+'/html/index.html');
})


//web service qui retourne les informations lors des appels ajax
app.get('/data/:id', function (req, res) {
  //on recupére l'id de l'annonce rechercher
  var data = null;
  var idAnnonce = req.params.id
  //on redirige vers page avec les infos
  req.query.id = idAnnonce;

  db = mongoose.connect(MONGOHQ_URL);
  flat.find({'id_annonce':id_annonce}, function (err, flats) {
   if(err){
    onErr(err,callback);
   }else{
    data = flats;
   }
  })
  mongoose.connection.close();
  console.log("search add number "+idAnnonce);
  //on retourne les données trouvé au clients
  res.send(data);
})


//on mettre notre serveur en ecoute
var server = app.listen(app.get('port'), function () {
  console.log("start");
  var host = server.address().address;
  var port = server.address().port;

  console.log('Server is starting and listen on http://%s:%s', host, port);

})
