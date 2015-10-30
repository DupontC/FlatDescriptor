#!/usr/bin/env node

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

var MONGOHQ_URL;
var DOCKER_DB = process.env.DB_1_PORT;
if ( DOCKER_DB ) {
  MONGOHQ_URL = DOCKER_DB.replace( "tcp", "mongodb" ) + "/flatdescriptor";
} else {
  MONGOHQ_URL = process.env.MONGODB;
}
console.info("MONGOHQ_URL "+MONGOHQ_URL);
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
  niveauDroit: Number,
  mpd : String
});
// Use the schema to register a model with MongoDb
//mongoose.model('flat', flatSchema);
//var flat = mongoose.model('flat');


mongoose.model('user', userSchema);
var user = mongoose.model('user');

//définition de notre utilisateur générique
var mdp  = _hashPassword("a6818b8188b36c44d17784c5551f63accc5deaf8786f9d0ad1ae3cd8d887cbab4f777286dbb315fb14854c8774dc0d10b5567e4a705536cc2a1d61ec0a16a7a6","ASIN", 3);
var user1 = new user({
  "id" :"admin",
  "nom" :"adminitrateur_name",
  "prenom" :"adminitrateur_fistname",
  "mpd" : mdp
});

user.find({'id':"admin"}, function (err, user) {
  if(err){
    console.info("erreur data");
    console.info("insertion de l'utilisateur générique.");
    user1.save();
    console.info("id : admin");
    console.info("mdp : password");
  }else if(user.length > 0) {
    console.info("insertion de l'utilisateur générique.");
    user1.save();
    console.info("id : admin");
    console.info("mdp : password");
  }
  else{
    logger.info("Utilisateur générique déja présent.");
  }
});

/*
flat.find({'id_annonce':0}, function (err, flats) {
 if(err){
  onErr(err,callback);
 }else{
  console.log(flats);
 }
})
*/
/*
var appart1 = new flat({
    "id_annonce": 1,
    "enLigne" : false,
    "ville" : "Caen",
    "titre1" : "Lemon drops",
    "texte1" : "Fruitcake toffee jujubes. Topping biscuit sesame snaps jelly caramels jujubes tiramisu fruitcake. Marzipan tart lemon drops chocolate sesame snaps jelly beans.",
    "image1": "../images/1.png",
    "titre2" : "Plum caramels",
    "texte2" : "Lollipop powder danish sugar plum caramels liquorice sweet cookie. Gummi bears caramels gummi bears candy canes cheesecake sweet roll icing dragée. Gummies jelly-o tart. Cheesecake unerdwear.com candy canes apple pie halvah chocolate tiramisu.",
    "image2" : "../images/2.png",
    "titre3" : "Marzipan gingerbread",
    "texte3" : "Soufflé bonbon jelly cotton candy liquorice dessert jelly bear claw candy canes. Pudding halvah bonbon marzipan powder. Marzipan gingerbread sweet jelly.",
    "image3" : "../images/3.png",
    "titre4" : "Carrot cake",
    "texte4" : "Sesame snaps sweet wafer danish. Chupa chups carrot cake icing donut halvah bonbon. Chocolate cake candy marshmallow pudding dessert marzipan jujubes sugar plum.",
    "image4" : "../images/4.png",
    "photosphere": "qdsdq"
    "emplacement":"Sesame snaps sweet wafer danish. Chupa chups carrot cake icing donut halvah bonbon. Chocolate cake candy marshmallow pudding dessert marzipan jujubes sugar plum.",
    "latitude" : "45.7593",
    "longitude" : "4.8431",
    "adresse" : "15 rue de la Part-Dieu 69003 LYON",
    "photos":"Cake cotton candy lollipop. Cake croissant cheesecake candy sugar plum icing apple pie wafer. Pie sugar plum tiramisu tiramisu pie fruitcake candy icing. Candy icing gummies gummies cheesecake brownie lemon drops chocolate gingerbread.",
    "albumPhotos" : "https://www.flickr.com/photos/125729062@N07/14522173061/player/3931c36915",
    "contacts":"Cake cotton candy lollipop. Cake croissant cheesecake candy sugar plum icing apple pie wafer. Pie sugar plum tiramisu tiramisu pie fruitcake candy icing. Candy icing gummies gummies cheesecake brownie lemon drops chocolate gingerbread.",
    "color": "ici la couleur"
  });
  */

/*
appart1.save();

var appart2 = new flat({
    "id_annonce": 0,
    "enLigne" : true,
    "ville" : "Caen",
    "localisation" : "15 rue de la Part-Dieu",
    "titre1" : "Lemon drops",
    "texte1" : "Fruitcake toffee jujubes. Topping biscuit sesame snaps jelly caramels jujubes tiramisu fruitcake. Marzipan tart lemon drops chocolate sesame snaps jelly beans.",
    "image1": "../images/1.png",
    "titre2" : "Plum caramels",
    "texte2" : "Lollipop powder danish sugar plum caramels liquorice sweet cookie. Gummi bears caramels gummi bears candy canes cheesecake sweet roll icing dragée. Gummies jelly-o tart. Cheesecake unerdwear.com candy canes apple pie halvah chocolate tiramisu.",
    "image2" : "../images/2.png",
    "titre3" : "Marzipan gingerbread",
    "texte3" : "Soufflé bonbon jelly cotton candy liquorice dessert jelly bear claw candy canes. Pudding halvah bonbon marzipan powder. Marzipan gingerbread sweet jelly.",
    "image3" : "../images/3.png",
    "titre4" : "Carrot cake",
    "texte4" : "Sesame snaps sweet wafer danish. Chupa chups carrot cake icing donut halvah bonbon. Chocolate cake candy marshmallow pudding dessert marzipan jujubes sugar plum.",
    "image4" : "../images/4.png",
    "titre5" : "Pudding lollipop",
    "texte5" : "Chupa chups pudding lollipop gummi bears gummies cupcake pie. Cookie cotton candy caramels. Oat cake dessert applicake. Sweet roll tiramisu sweet roll sweet roll.",
    "image5" : "../images/5.png",
    "titre6" : "Soufflé bonbon",
    "texte6" : "Cake cotton candy lollipop. Cake croissant cheesecake candy sugar plum icing apple pie wafer. Pie sugar plum tiramisu tiramisu pie fruitcake candy icing. Candy icing gummies gummies cheesecake brownie lemon drops chocolate gingerbread.",
    "image6" : "../images/6.png",
    "emplacement":"Sesame snaps sweet wafer danish. Chupa chups carrot cake icing donut halvah bonbon. Chocolate cake candy marshmallow pudding dessert marzipan jujubes sugar plum.",
    "latitude" : "45.7593",
    "longitude" : "4.8431",
    "photos":"Cake cotton candy lollipop. Cake croissant cheesecake candy sugar plum icing apple pie wafer. Pie sugar plum tiramisu tiramisu pie fruitcake candy icing. Candy icing gummies gummies cheesecake brownie lemon drops chocolate gingerbread.",
    "albumPhotos" : "https://www.flickr.com/photos/125729062@N07/14522173061/player/3931c36915",
    "contacts":"Cake cotton candy lollipop. Cake croissant cheesecake candy sugar plum icing apple pie wafer. Pie sugar plum tiramisu tiramisu pie fruitcake candy icing. Candy icing gummies gummies cheesecake brownie lemon drops chocolate gingerbread.",
    "color": "couleur "
});

appart2.save();
*/

// end Team.find
/*
var appart3 = flat.findOne({'id_annonce': 0} ,function(err,docs){
  console.log("erreur");
});
console.log(appart3.collections);
*/
console.info("waiting disconnect...");
mongoose.disconnect();

console.info("back-office : localhost:3000/listFlats/1");
console.info("fin script test");
