
function initialize() {
 //on initialise directionsDisplay afin de pourvoir utiliser l'affichage d'itineraire
 directionsDisplay = new google.maps.DirectionsRenderer();

 //on creer la Google MAP
  map = new google.maps.Map(document.getElementById("maps"), {
        zoom: 17,
        center: new google.maps.LatLng(45.7593, 4.8431),
        mapTypeId: google.maps.MapTypeId.HYBRID
      });
      directionsDisplay.setMap(map);
    alert(map);
}


 //on teste le service de geolocation du navigateur
if (navigator.geolocation)
{
  var watchId = navigator.geolocation.watchPosition(successCallback, null, {enableHighAccuracy:true});
}
else
{
  alert('Votre navigateur ne prend pas en compte la géolocalisation HTML5');
}
//a la fin du chargement de la page html on lance la fonction initialize()
google.maps.event.addDomListener(window, 'load', initialize);
