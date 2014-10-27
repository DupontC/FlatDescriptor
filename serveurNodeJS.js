//declaration des librairies
var bodyParser = require('body-parser');
var express = require('express');
var app = express();


// configure app to use bodyParser()
// this will let us get the data from a POST
// utiliser pour recuperer les parametres POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var mongoose = require("mongoose");
var MONGOHQ_URL="mongodb://heroku:qx1L3V6QpV8Xtt1BDdn_CcHMFGkF3iMUhUXUm3x_7S37DqK7HjZVfTRB4rjiTXdehHdWeuBlNym5oMmHG2VKEg@linus.mongohq.com:10085/app30838243";

db = mongoose.connect(MONGOHQ_URL);
Schema = mongoose.Schema;

const clientSessions = require("client-sessions");




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

var userSchema = new Schema({
  id :String,
  nom :String,
  prenom :String,
  mpd : String
});

// Use the schema to register a model with MongoDb
mongoose.model('flat', flatSchema);
var flat = mongoose.model('flat');
mongoose.model('user', userSchema);
var user = mongoose.model('user');

//cle des variables de session
app.use(clientSessions({
  secret: '224c4a16a42716e410fcd78b5564bbc8d7e9c7eea3733a342c4bc100f5ed3b0518f4a0dd132e567af10043281e437bba0acdd792a6c4e45ac319d13999c6b019' // set this to a long random string!
}));


app.set('port', (process.env.PORT || 3000))

//utile pour permettre à nos page HTML de
//charger des ressources (JavaScript, CSS,...)
app.use(express.static(__dirname + '/'));


//route pas défaut qui redirige vers l'annonce
app.get('/:id', function (req, res) {
  res.sendFile(__dirname+'/html/index.html');
})

//route pas défaut qui redirige vers l'annonce si user logger
app.get('/ImmoConfig/:id', function (req, res) {
  if(req.session_state.username){
    res.sendFile(__dirname+'/html/immobilierConfiguration.html');
  }else{
    res.sendFile(__dirname+'/html/login.html');
  }
})


//on teste la connexion au BackOffice
app.post('/ImmoConfig/:id', function (req, res) {
  ///console.info('POST id %s mdp %s',req.body.login, req.body.password);
  var id = req.body.login
  var mdp = req.body.password
  if(id && mdp){
    user.find({'id':id,'mpd':mdp}, function (err, user) {
     if(err){
       onErr(err,"erreur data");
     }else if(user.length > 0) {
      req.session_state.username = user[0].id;
      console.info("Connexion BackOffice");
      res.sendFile(__dirname+'/html/immobilierConfiguration.html');
    }
     else{
       console.error("Erreur de tentative de connexion au BackOffice");
       res.sendFile(__dirname+'/html/login.html');
     }
    })
  }
})

//route pas défaut qui redirige vers l'annonce si user logger
app.get('/logout/:id', function (req, res) {
  console.log("déconnexion");
  req.session_state.reset();
  res.sendFile(__dirname+'/html/login.html');
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
