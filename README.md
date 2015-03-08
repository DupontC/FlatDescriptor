FlatDescriptor
==========

Immobilier
--------------

Projet qui a pour but de présenter des biens immobiliers à travers un site web qui se veut simple de configuration.
Le site dispose :

 • D'une partie Front-Office, qui montre les biens immobiliers avec leur configuration, leurs avantages.
 • D'une partie Backend, qui permet aux utilisateurs de configurer et administrer les annonces.

Technologies mises en avant :

 • HTML/CSS/JavaScript
 • Angular Js
 • Node Js: express, passeport, log4js
 • Mongodb


DEPLOYEMENT
--------------

1) Installer NodeJS

2) Dans un terminal

```
$ npm install

$ node serveurNodeJS.js
```

POUR DOCKER
--------------

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
