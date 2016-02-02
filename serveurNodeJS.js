/****************************************/
/***      DECLARATION LIBRAIRIES      ***/
/****************************************/

//import * as data from 'js/database';

var bodyParser = require('body-parser');
var express = require('express');
var crypto = require('crypto');
var log4js = require('log4js');
var helmet = require('helmet');
var util = require('util');
var fs = require('fs');
var ip = require("ip");
var busboy = require('connect-busboy');		//middleware for form/file upload
var path = require('path');					//used for file path
var fs = require('fs-extra');				//File System - for file manipulation
var util = require('util');
var clientSessions = require("client-sessions");
var mongoose = require("mongoose");
var app = express();
var ninetyDaysInMilliseconds = 7776000000;
app.locals.title = "FlarDescriptor";
app.locals.email = "";
app.use(busboy());
app.use(helmet.frameguard());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.xssFilter());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts({maxAge: ninetyDaysInMilliseconds,includeSubdomains: true}));
app.use(helmet.publicKeyPins({maxAge: ninetyDaysInMilliseconds,sha256s: ['AbCdEf123=', 'ZyXwVu456='],includeSubdomains: true }));
app.use(helmet.noCache());

/************************/
/***      LOGGER      ***/
/************************/

//var logger = log4js.getLogger("cheese");//write in log_serveur file
var logger = log4js.getLogger(); //log in  console
log4js.configure({
  appenders: [
    { type: 'console' },
    {
      type: 'file',
      filename: 'logs/log_serveur.log',
      maxLogSize: 20480,
      backups: 3,
      category: 'cheese'
    }
  ]
});
logger.setLevel('DEBUG');


/****************************/
/***      DATA MODEL      ***/
/****************************/

var MONGOHQ_URL;
var DOCKER_DB = process.env.DB_1_PORT;
if ( DOCKER_DB ) {
  MONGOHQ_URL = DOCKER_DB.replace( "tcp", "mongodb" ) + "/flatdescriptor";
} else {
  MONGOHQ_URL = process.env.MONGODB;
}
console.info("DATABASE "+MONGOHQ_URL);
mongoose.connect(MONGOHQ_URL);
var Schema = mongoose.Schema;

// Create a schema for our database
flatSchema = new Schema({
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

var userSchema = new Schema({
  id :String,
  nom :String,
  prenom :String,
  niveauDroit: Number,
  mpd : String
});

// Use the schema to register a model with MongoDb
mongoose.model('flat', flatSchema);
var flat = mongoose.model('flat');
mongoose.model('user', userSchema);
var user = mongoose.model('user');


/***********************************/
/***      CONFIGURE SESSION      ***/
/***********************************/

//cle des variables de session
app.use(clientSessions({
  secret: '224c4a16a42716e410fcd78b5564bbc8d7e9c7eea3733a342c4bc100f5ed3b0518f4a0dd132e567af10043281e437bba0acdd792a6c4e45ac319d13999c6b019' // set this to a long random string!
}));
//utile pour permettre à nos page HTML de
//charger des ressources (JavaScript, CSS,...)
app.use(express.static(__dirname + '/'));
// utiliser pour recuperer les parametres POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/****************************/
/***      POST ROUTE      ***/
/****************************/


//on teste la connexion au BackOffice
app.post('/listFlats/:id', function (req, res) {
  _testingLogin("listFlats.html", req, res);
});

//web service qui maj les informations lors des appels ajax
app.post('/data/:id', function (req, res) {
  var flatMAJ =  JSON.parse(req.body.majData);
  var indice = flatMAJ._id;
  delete flatMAJ._id;
  delete flatMAJ.__v;
  if(req.session_state.username && null !== flatMAJ){
    logger.debug(JSON.stringify(flatMAJ));
    logger.debug(indice);
    flat.update({_id:indice}, flatMAJ, {upsert: true}, function(err){
      if(err){
        logger.error("erreur lors de la m-a-j de l'annonce "+indice);
        res.status(424).send("Erreur : mise à jour ");
      }else{
        logger.debug("mise a jour de l'annonce "+indice);
        res.status(200).send("mise à jour");
      }
    });
  }else{
    logger.debug("m-a-j annonce non permise");
    res.status(401).send("Erreur : mise à jour non permise");
  }
});

//web service qui ajoute les informations lors des appels ajax
app.post('/AddData/:id', function (req, res) {

  var flatAdd =  JSON.parse(req.body.majData);
  if(req.session_state.username && null !== flatAdd){
    logger.debug(JSON.stringify(flatAdd));

    // Use the schema to register a model with MongoDb
    mongoose.model('flat', flatSchema);
    var flat = mongoose.model('flat');
    var newAppart = new flat(flatAdd);
    newAppart.save(function(err){
      if(err){
        logger.error("erreur lors de la m-a-j de l'annonce "+indice);
        res.status(424).send("Erreur : add annonce ");
      }else{
        logger.debug("ajout d'une annonce ");
        res.status(200).send("add annonce");
      }
    });

  }else{
    logger.debug("add annonce non permise");
    res.status(401).send("Erreur : add non permise");
  }
});

//service qui gére l'upload des document sur le serveur node
app.post('/ImmoConfig/upload',function (req, res, next) {
  _saveFiles(req, res, next);
});//END UPLOAD ROUTE

//service qui gére l'upload des document sur le serveur node
app.post('/addAnnonce/upload',function (req, res, next) {
  _saveFiles(req, res, next);
});//END UPLOAD ROUTE

/****************************/
/***      GET ROUTE       ***/
/****************************/

//route pas défaut qui redirige vers l'annonce
app.get('/:id', function (req, res) {
  res.sendFile(__dirname+'/html/index.html');
});

//route pas défaut qui redirige vers l'annonce si user logger
app.get('/ImmoConfig/:id', function (req, res) {
  if(req.session_state.username){
    logger.info("GET immobilierConfiguration");
    res.sendFile(__dirname+'/html/immobilierConfiguration.html');
  }else{
    logger.info("GET login");
    res.sendFile(__dirname+'/html/login.html');
  }
});

//route pas défaut qui redirige vers la page de gestion d'un user
app.get('/UserConfig/:id', function (req, res) {
  if(req.session_state.username){
    logger.info("GET user page");
    res.sendFile(__dirname+'/html/user.html');
  }else{
    logger.info("GET login");
    res.sendFile(__dirname+'/html/login.html');
  }
});

//on teste la connexion au BackOffice
app.post('/ImmoConfig/:id', function (req, res) {
  _testingLogin("immobilierConfiguration.html", req, res);
});

//route pas défaut qui redirige vers les annonces si user logger
app.get('/listFlats/:id', function (req, res) {
  if(req.session_state.username){
    logger.info("GET listeFlats");
    res.sendFile(__dirname+'/html/listFlats.html');
  }else{
    logger.info("GET login");
    res.sendFile(__dirname+'/html/login.html');
  }
});

//route pas défaut qui redirige vers les users si user logger
app.get('/users/:id', function (req, res) {
  if(req.session_state.username){
    logger.info("GET listeUsers");
    res.sendFile(__dirname+'/html/users.html');
  }else{
    logger.info("GET login");
    res.sendFile(__dirname+'/html/login.html');
  }
});

//route pas défaut qui redirige la page
//d'ajout des annonces
app.get('/addAnnonce/:id', function (req, res) {
  if(req.session_state.username){
    logger.info("GET ADD ANNONCE");
    res.sendFile(__dirname+'/html/addAnnonce.html');
  }else{
    logger.info("GET login");
    res.sendFile(__dirname+'/html/login.html');
  }
});

//route pas défaut qui redirige vers l'annonce si user logger
app.get('/logout/:id', function (req, res) {
  logger.info("déconnexion");
  req.session_state.reset();
  res.sendFile(__dirname+'/html/login.html');
});

/**
*web service qui retourne les informations
*d'un appartement lors des appels ajax
**/
app.get('/data/:id', function (req, res) {
  //on recupére l'id de l'annonce rechercher
  var idAnnonce = req.params.id;

  //on recherche l'annonce demander par le client
  flat.find({'id_annonce':idAnnonce}, function (err, flats) {
    if(err){
      onErr(err,"erreur data");
    }else{
      //on envoie les données aux clients
      //console.info(flats);
      res.send(flats);
    }
  });
});

/**
* web service qui retourne les informations
*de tout les appartements lors des appels ajax
**/
app.get('/Alldata/:id', function (req, res) {
  //on vérifie si l'utilisateur a un droit
  //d'accée sur ces fonctions
  if(req.session_state.username){
    logger.info("Demande de recherche des logements ");
    //on recherche l'annonce demander par le client
    flat.find({"_id":{$ne:null}}, function (err, flats) {
      if(err){
        logger.error("erreur lors de la recherche des annonces");
        onErr(err,"erreur data");
      }else{
        logger.debug("Envoi des données sur les annonces");
        //on envoie les données aux clients
        res.status(200).send(flats);
      }
    });
  }else{
    logger.debug("Recherche annonce non permise (pas d'identification)");
    res.status(401).send('Hého !! :@');
  }
});

/**
* web service qui retourne les informations
*de tout les utilisateurs lors des appels ajax
**/
app.get('/AllUsers/:id', function (req, res) {
  //on vérifie si l'utilisateur a un droit
  //d'accée sur ces fonctions
  if(req.session_state.username){
    logger.info("Demande de recherche des utilisateurs ");
    //on recherche l'annonce demander par le client
    user.find({"_id":{$ne:null}}, function (err, users) {
      if(err){
        logger.error("erreur lors de la recherche des utilisateurs");
        onErr(err,"erreur data");
      }else{
        logger.debug("Envoi des données sur les utilisateurs");
        //on envoie les données aux clients
        res.status(200).send(users);
      }
    });
  }else{
    logger.debug("Recherche utilisateurs non permise (pas d'identification)");
    res.status(401).send('Hého !! :@');
  }
});

/**
* web service qui retourne les informations
* un utilisateur lors des appels ajax
**/
app.get('/user/:id', function (req, res) {
  //on vérifie si l'utilisateur a un droit
  //d'accée sur ces fonctions
  var idUser = req.params.id;

  if(req.session_state.username){
    logger.info("Demande de recherche d'un utilisateur ");
    //on recherche l'annonce demander par le client
    user.find({'id':idUser}, function (err, users) {
      if(err){
        logger.error("erreur lors de la recherche des utilisateurs");
        onErr(err,"erreur data");
      }else{
        logger.debug("Envoi des données sur les utilisateurs");
        //on envoie les données aux clients
        res.status(200).send(users);
      }
    });
  }else{
    logger.debug("Recherche utilisateurs non permise (pas d'identification)");
    res.status(401).send('Hého !! :@');
  }
});


//web service qui maj un user lors des appels ajax
app.post('/user/:id', function (req, res) {

  var userAdd =  JSON.parse(req.body.majData);
  if(req.session_state.username && null !== userAdd){
    logger.debug(JSON.stringify(userAdd));

    // Use the schema to register a model with MongoDb
    mongoose.model('flat', flatSchema);
    var flat = mongoose.model('flat');
    var newAppart = new flat(flatAdd);
    newAppart.save(function(err){
      if(err){
        logger.error("erreur lors de la m-a-j de l'annonce "+indice);
        res.status(424).send("Erreur : add annonce ");
      }else{
        logger.debug("ajout d'une annonce ");
        res.status(200).send("add annonce");
      }
    });

  }else{
    logger.debug("add annonce non permise");
    res.status(401).send("Erreur : add non permise");
  }
});

/**
* web service qui retourne les informations
*de tout les appartements en ligne lors des appels ajax
**/
app.get('/AllDataOnLigne/:id', function (req, res) {
  logger.info("Memory usage "+util.inspect(process.memoryUsage()));
  logger.info("Demande de recherche des logements en ligne");
  //on recherche l'annonce en ligne
  flat.find({"_id":{$ne:null},"enLigne":true},function (err, flats) {
    if(err){
      logger.error("erreur lors de la recherche des annonces en ligne");
      onErr(err,"erreur data");
    }else{
      logger.debug("Envoi des données sur les annonces en ligne");
      //on envoie les données aux clients
      res.send(flats);
    }
  });
});


//route vers la page d'accueil
app.get('/', function(req, res){
  res.sendFile(__dirname+'/html/accueil.html');
});

//route vers la page 404 not found (toujours placer cette routea la fin)
app.get('*', function(req, res){
  res.status(404).sendFile(__dirname+'/html/404.html');
});


/*********************************/
/***      STRATING SERVER      ***/
/*********************************/

app.set('port', (process.env.PORT || 3000));
//on mettre notre serveur en ecoute
var server = app.listen(app.get('port'), function () {
  logger.info("Starting NodeJS serveur "+ip.address());
  logger.info("Liens DataBase "+MONGOHQ_URL);

  var hostInformation = JSON.stringify(server.address());
  logger.info('Information for connexion on : '+ hostInformation);

});
/**********************************/
/***      FONCTIONS UTILES      ***/
/**********************************/

//Fonction qui vérifie si les informations de connexion
// données par l'utilisateur son valide
_testingLogin = function(goToInSucess, req, res){
  ///console.info('POST id %s mdp %s',req.body.login, req.body.password);
  var id = req.body.login;
  var mdp = req.body.password;
  mdp = _hashPassword(mdp,"ASIN", 3);
  if(id && mdp){
    user.find({'id':id,'mpd':mdp}, function (err, user) {
      if(err){
        onErr(err,"erreur data");
      }else if(user.length > 0) {
        req.session_state.username = user[0].id;
        logger.info("Connexion BackOffice");
        res.sendFile(__dirname+'/html/'+goToInSucess);
      }
      else{
        logger.error("Erreur de tentative de connexion au BackOffice");
        res.sendFile(__dirname+'/html/login.html');
      }
    });
  }
};

_saveFiles = function(req, res, next){
  //verification de l'utilisateur est bien connecté
  if(req.session_state.username){
    var arr;
    var fstream;
    var filesize = 0;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
      //uploaded file name, encoding, MIME type
      console.info('File [' + fieldname +']: filename:' + filename + ', encoding:' + encoding + ', MIME type:'+ mimetype);
      //uploaded file size
      file.on('data', function(data) {
        console.info('File [' + fieldname + '] got ' + data.length + ' bytes');
        fileSize = data.length;
        console.info("fileSize= " + fileSize);
      });
      file.on('end', function() {
        console.info('File [' + fieldname + '] ENDed');
      });
      arr= [{fieldname: fieldname, filename: filename, encoding: encoding, MIMEtype: mimetype}];
      //chemin ou seront deposé les fichiers
      fstream = fs.createWriteStream(__dirname + '/img/upload/' + filename);	//create a writable stream
      file.pipe(fstream);		//pipe the post data to the file
      //stream Ended - (data written) send the post response
      req.on('end', function () {
        res.writeHead(200, {"content-type":"text/html"});		//http response header
      });
      //Finished writing to stream
      fstream.on('finish', function () {
        console.info('Finished writing!');
        //Get file stats (including size) for file saved to server
        fs.stat(__dirname + '/img/upload/' + filename, function(err, stats) {
          if(err)
          throw err;
          //if a file
          if (stats.isFile()) {
            console.error("File size saved to server: " + stats.size);
          }
        });
      });
      // error de lecture du stream
      fstream.on('error', function (err) {
        console.debug(err);
      });
    });  //	@END/ .req.busboy
  }else{
    logger.info("GET login");
    res.sendFile(__dirname+'/html/login.html');
  }
};

//Fonction qui crypte la chaine passè en parametre et retourne son hash.
_hashPassword = function(password, salt, iteration) {
  var saltedpassword = salt + password;
  var sha256;
  for(var i = 0; i < iteration-1; i++) {
    sha256 = crypto.createHash('sha256');
    sha256.update(saltedpassword);
    saltedpassword = sha256.digest('hex');
  }
  sha256 = crypto.createHash('sha256');
  sha256.update(saltedpassword);
  return sha256.digest('base64');
};
