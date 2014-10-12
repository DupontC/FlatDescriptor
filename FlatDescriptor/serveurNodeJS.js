var express = require('express'),
  app = express();

//on declare un json
var info_user = [];
app.use(express.bodyParser());

app.configure(function () {
  app.use(express.static(__dirname + '/'));
});


app.get('/', function(req, res) {
    res.sendfile('index.html');
});

app.post('/', function(req, res){
  var name = req.body.login;
  var url = req.body.url;
     if(url=="")
     {
      url = "http://fr.opensuse.org/images/0/0b/Icon-user.png";
     }
  res.redirect("geolocation.html?name="+name+"&url="+url);
});


var server = app.listen(8080);
console.log('Server start and listen on http://localhost:8080/');


});
