
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
