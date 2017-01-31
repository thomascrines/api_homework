(function(){

  var map;
  var alldata = [];

var initialize = function(){
  map = new MapWrapper(document.getElementById('main-map'), {lat: 35.845541, lng: -83.016659}, 15);
  map.addClickEvent( mapClicked );
}

var mapClicked = function( event ) {
  var latitude = event.latLng.lat();
  var longitude = event.latLng.lng();
  map.addMarker({lat: latitude, lng: longitude});
  var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&units=metric&APPID=3d2471499416eeb3c9e83ea93ddf739c';
  makeRequest(url, this.requestComplete);
}

var makeRequest = function(url) {
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.onload = requestComplete;
  request.send();
}

var requestComplete = function() {
  if (this.status != 200) return;
  var jsonString = this.responseText;
  weatherData = JSON.parse(jsonString);
  addDataToList(weatherData);
  locationData = {name: weatherData.name, y: weatherData.main.temp};
  alldata.push(locationData);
  createBarGraph(alldata)
}

var addDataToList = function(weatherData) {
  var ul = document.getElementById('ul');
  var li = document.createElement('li');
  li.innerText = weatherData.name + ', ' + weatherData.sys.country  + '\nCurrent weather conditions: ' + weatherData.weather[0].description + '\nCurrent temperature: ' + weatherData.main.temp + '\nMinimum temperature: ' + weatherData.main.temp_min + '\nMaximum temperature: ' + weatherData.main.temp_max + '\nWind speed (metres per second): ' + weatherData.wind.speed +'\n \n';
  ul.appendChild(li)
};

var createBarGraph = function(weatherData) {
  new BarGraph(weatherData)
};

window.onload = initialize;

})();