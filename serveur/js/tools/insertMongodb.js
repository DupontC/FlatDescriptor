#!/usr/bin/env node

function pausecomp(millis)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}


mongoose = require("mongoose");
crypto = require('crypto');
util = require('util');

console.info("start test script");
console.log("Memory usage "+util.inspect(process.memoryUsage()));
//Fonction qui crypte la chaine passè en parametre et retourne son hash.
function _hashPassword(password, salt, iteration) {
    var saltedpassword = salt + password;
    for(var i = 0; i < iteration-1; i++) {
            sha256 = crypto.createHash('sha256');
            sha256.update(saltedpassword);
            saltedpassword = sha256.digest('hex');
    }
    sha256 = crypto.createHash('sha256');
    sha256.update(saltedpassword);
    return sha256.digest('base64');
}

function sleep(delay) {
   var start = new Date().getTime();
   while (new Date().getTime() < start + delay);
 }

_hashPassword.description = "Fonction qui crypte la chaine passè en parametre et retourne son hash.";

var MONGOHQ_URL
var DOCKER_DB = process.env.DB_CNX;
if ( DOCKER_DB ) {
  MONGOHQ_URL = "mongodb://"+DOCKER_DB+"/flatdescriptor";
} else {
  MONGOHQ_URL = process.env.MONGODB;
}
console.info("DATABASE "+MONGOHQ_URL);
mongoose.connect(MONGOHQ_URL);
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
  nbPiece : Number,
  surface : Number,
  photosphere : String,
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
  status :String,
  mpd : String
});
// Use the schema to register a model with MongoDb
mongoose.model('flat', flatSchema);
var flat = mongoose.model('flat');


var mdp  = _hashPassword("a6818b8188b36c44d17784c5551f63accc5deaf8786f9d0ad1ae3cd8d887cbab4f777286dbb315fb14854c8774dc0d10b5567e4a705536cc2a1d61ec0a16a7a6","ASIN", 3);
mongoose.model('user', userSchema);
var user = mongoose.model('user');
var user1 = new user({
  "id" :"admin",
  "nom" :"Doe",
  "prenom" :"John",
  "status":"adminitrateur",
  "mpd" : mdp
});
console.info("waiting inserting...");
user1.save();
console.info("insertion de l'utilisateur admin");
console.info("id : admin");
console.info("mdp : password");

mongoose.model('flat', flatSchema);
var flat = mongoose.model('flat');
var appart1 = new flat({
  adresse: "White street",
  albumPhotos: "https://www.flickr.com/photos/125729062@N07/14522173061/player/3931c36915",
  color: "#8481e2",
  contacts: "Cake cotton candyq lollipop. Cake croissant cheesecake candy sugar plum icing apple pie wafer. Pie sugar plum tiramisu tiramisu pie fruitcake candy icing. Candy icing gummies gummies cheesecake brownie lemon drops chocolate gingerbread.",
  emplacement: "Sesame snaps sweet wafer danish. Chupa chups carrot cake icing donut halvah bonbon. Chocolate cake candy marshmallow pudding dessert marzipan jujubes sugar plum.",
  enLigne: true,
  id_annonce: 1,
  image1: "../img/appartement_1/presentation/1.png",
  image2: "../img/appartement_1/presentation/2.png",
  image3: "../img/appartement_1/presentation/3.png",
  image4: "../img/appartement_1/presentation/4.png",
  latitude: "49.18364",
  longitude: "-0.3657620",
  nbPiece: 2,
  photos: "Cake cotton candy lollipop. Cake croissant cheesecake candy sugar plum icing apple pie wafer. Pie sugar plum tiramisu tiramisu pie fruitcake candy icing. Candy icing gummies gummies cheesecake brownie lemon drops chocolate gingerbread.",
  photosphere: "../img/photosphere/1.jpg",
  surface: 12,
  texte1: "Fruitcake toffee jujubes. Topping biscuit sesame snaps jelly caramels jujubes tiramisu fruitcake. Marzipan tart lemon drops chocolate sesame snaps jelly beans.",
  texte2: "Lollipop powder danish sugar plum caramels liquorice sweet cookie. Gummi bears caramels gummi bears candy canes cheesecake sweet roll icing dragée. Gummies jelly-o tart. Cheesecake unerdwear.com candy canes apple pie halvah chocolate tiramisu.",
  texte3: "Soufflé bonbon jelly cotton candy liquorice dessert jelly bear claw candy canes. Pudding halvah bonbon marzipan powder. Marzipan gingerbread sweet jelly.",
  texte4: "Sesame snaps sweet wafer danish. Chupa chups carrot cake icing donut halvah bonbon. Chocolate cake candy marshmallow pudding dessert marzipan jujubes sugar plum.",
  titre1: "Lemon drops test",
  titre2: "Plum caramels",
  titre3: "Marzipan gingerbread",
  titre4: "Carrot cake",
  ville: "Black city"
  });
console.info("waiting inserting...");
appart1.save();
console.info("ajout d'une annonce");
// end Team.find

var appart3 = flat.findOne({'id_annonce': 0});
console.log(appart3.collections);


console.info("waiting disconnect...");
//mongoose.disconnect();
console.info("back-office : localhost:3000/listFlats/1");
console.info("fin script test");

pausecomp(1500);

process.exit(0);