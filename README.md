FlatDescriptor
==========

Immobilier
--------------

Projet qui a pour but de présenter des biens immobiliers à travers un site web qui se veut simple de configuration.
Le site dispose :

 - D'une partie Front-Office, qui montre les biens immobiliers avec leur configuration, leurs avantages.
 - D'une partie Backend, qui permet aux utilisateurs de configurer et administrer les annonces.

Technologies mises en avant :

 - HTML/CSS/JavaScript
 - AngularJS
 - NodeJs: Express, Mongoose, Log4JS, Helmet
 - Mongodb


DEPLOYEMENT
-------------

1) [Installer NodeJS](https://nodejs.org/)

2) Fixer la variable MONGOHQ_URL pour faire le lien avec BDD, dans les fichiers insertMongodb.js &  serveurNodeJS.js

3) Dans un terminal

```shell
$ sudo npm install

$ npm test

$ npm start
```


POUR DOCKER
--------------

1. Lancer le serveur avec la base de donnée


```shell
$ docker-compose build
$ docker-compose up
```

Puis depuis un conteneur Node lancer la commande :
```shell
node /usr/src/app/js/tools/insertMongodb.js
```


2. Lancer juste le serveur node


```
$ boot2docker start //lancement de la VM docker

$ export ...;export ...;export //on fixe les variables d'environnment

$ docker build -t flatdescriptor .  //on build notre applciation sous le nom de  'flatdescriptor'

$ docker run -it -p 8888:3000 -P --rm --name conteneurDockerFlatDescriptor flatdescriptor // on demande a docker de lancer l'application dans le conteneurdockerflatdescriptor et d'executer flatdescriptor

$ boot2docker ip //on recupere l'ip du conteneurs

$ docker ps -a //liste les informations sur les conteneurs

Ensuite dans le navigateur se rendre a l'adresse du conteneur  et prendre le port indique par la cmd docker ps -a

$ docker stop conteneurdockerflatdescriptor //arrete le conteneur

$ docker rm conteneurdockerflatdescriptor //supprime le conteneur

$ boot2docker stop //arrete la VM
```
