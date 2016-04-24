
var mongoose = require("mongoose");
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
