
var mongoose = require("mongoose");


/****************************/
/***      DATA MODEL      ***/
/****************************/

var MONGOHQ_URL
var DOCKER_DB = process.env.DB_1_PORT;
if ( DOCKER_DB ) {
  MONGOHQ_URL = DOCKER_DB.replace( "tcp", "mongodb" ) + "/flatdescriptor";
} else {
  MONGOHQ_URL = process.env.MONGODB;
}
//console.info("DATABASE "+MONGOHQ_URL);
mongoose.connect(MONGOHQ_URL);
var Schema = mongoose.Schema;

// Create a schema for our database
exports.flatSchema = new Schema({
  id_annonce : Number,
  enLigne : Boolean,
  surface : Number,
  nbPiece : Number,
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
  photosphere  : String,
  emplacement :String,
  latitude : String,
  longitude : String,
  adresse : String,
  photos: String,
  albumPhotos : String,
  contacts :String,
  niveauDroit: Number,
  color : String
});

exports.userSchema = new Schema({
  id :String,
  nom :String,
  prenom :String,
  niveauDroit: Number,
  mpd : String
});

// Use the schema to register a model with MongoDb
mongoose.model('flat', exports.flatSchema);
exports.flat = mongoose.model('flat');
mongoose.model('user', exports.userSchema);
exports.user = mongoose.model('user');


exports.MONGOHQ_URL="mongodb://cdupont:cdupontlab@ds127958.mlab.com:27958/heroku_7s5j2g26"