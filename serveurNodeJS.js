//declaration des librairies
var express = require('express');
var app = express();



//utile pour permettre à nos page HTML de
//charger des ressources (JavaScript, CSS,...)
app.use(express.static(__dirname + '/'));


//route pas défaut qui redirige vers l'annonce
app.get('/:id', function (req, res) {
  res.sendFile(__dirname+'/html/index.html');
})


//web service qui retourne les informations lors des appels ajax
app.get('/data/:id', function (req, res) {
  //on recupére l'id de l'annonce rechercher
  var idAnnonce = req.params.id
  //on redirige vers page avec les infos
  req.query.id = idAnnonce;


  data = [
  {
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
      "emplacement":"Sesame snaps sweet wafer danish. Chupa chups carrot cake icing donut halvah bonbon. Chocolate cake candy marshmallow pudding dessert marzipan jujubes sugar plum.",
      "latitude" : "45.7593",
      "longitude" : "4.8431",
      "adresse" : "15 rue de la Part-Dieu 69003 LYON",
      "photos":"Cake cotton candy lollipop. Cake croissant cheesecake candy sugar plum icing apple pie wafer. Pie sugar plum tiramisu tiramisu pie fruitcake candy icing. Candy icing gummies gummies cheesecake brownie lemon drops chocolate gingerbread.",
      "albumPhotos" : "https://www.flickr.com/photos/125729062@N07/14522173061/player/3931c36915",
      "contacts":"Cake cotton candy lollipop. Cake croissant cheesecake candy sugar plum icing apple pie wafer. Pie sugar plum tiramisu tiramisu pie fruitcake candy icing. Candy icing gummies gummies cheesecake brownie lemon drops chocolate gingerbread."
    },
    {
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
      "contacts":"Cake cotton candy lollipop. Cake croissant cheesecake candy sugar plum icing apple pie wafer. Pie sugar plum tiramisu tiramisu pie fruitcake candy icing. Candy icing gummies gummies cheesecake brownie lemon drops chocolate gingerbread."
    }

    ]
  console.log("search add number "+idAnnonce);
  //on retourne les données trouvé au clients
  res.send(data);
})


//on mettre notre serveur en ecoute
var server = app.listen(3000, function () {
  console.log("start");
  var host = server.address().address;
  var port = server.address().port;

  console.log('Server is starting and listen on http://%s:%s', host, port);

})
