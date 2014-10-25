//declaration des librairies
var express = require('express');
var mongoose = require("mongoose");
var app = express();
var MONGOHQ_URL="mongodb://heroku:qx1L3V6QpV8Xtt1BDdn_CcHMFGkF3iMUhUXUm3x_7S37DqK7HjZVfTRB4rjiTXdehHdWeuBlNym5oMmHG2VKEg@linus.mongohq.com:10085/app30838243";

db = mongoose.connect(MONGOHQ_URL);
Schema = mongoose.Schema;

// Create a schema for our data
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
  res.sendFile(__dirname+'/html/immobilierConfiguration.html');
})

//route pas défaut qui redirige vers l'annonce
app.post('/ImmoConfig/:id', function (req, res) {
  res.sendFile(__dirname+'/html/immobilierConfiguration.html');
})


//web service qui retourne les informations lors des appels ajax
app.get('/data/:id', function (req, res) {
  //on recupére l'id de l'annonce rechercher
  var data = null;
  var idAnnonce = req.params.id

  //on recherche l'annonce demander par le client
  flat.find({'id_annonce':idAnnonce}, function (err, flats) {
   if(err){
    onErr(err,"erreur data");
   }else{
    //on envoie les données aux clients
    res.send(flats);
   }
  })
})


//on mettre notre serveur en ecoute
var server = app.listen(app.get('port'), function () {
  console.log("start");
  var host = server.address().address;
  var port = server.address().port;

  console.log('Server is starting and listen on http://%s:%s', host, port);

})
