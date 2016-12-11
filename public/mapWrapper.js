var MapWrapper = function(container, coordinates, zoom){
  this.map = new google.maps.Map(container, {
    center: coordinates,
    zoom: zoom,
    mapTypeId: 'hybrid'
  });
}

window.alldata = [];

MapWrapper.prototype = {

  addMarker: function(coordinates){
    var marker = new google.maps.Marker({
      position: coordinates,
      map: this.map
    });
  },

  addClickEvent: function(){
    google.maps.event.addListener(this.map, 'click', function(event){
      var latitude = event.latLng.lat();
      var longitude = event.latLng.lng();
      this.addMarker({lat: latitude, lng: longitude});
      var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&units=metric&APPID=3d2471499416eeb3c9e83ea93ddf739c';
      this.makeRequest(url, this.requestComplete);
    }.bind(this));
  },

  makeRequest: function(url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = callback;
    request.send();
  },

  requestComplete: function() {
    if (this.status != 200) return;
    var jsonString = this.responseText;
    weatherData = JSON.parse(jsonString);
    MapWrapper.prototype.addDataToList(weatherData);

    locationData = {name: weatherData.name, y: weatherData.main.temp};
    alldata.push(locationData);
    MapWrapper.prototype.createBarGraph(window.alldata)
  },

  addDataToList: function(weatherData) {
    var ul = document.getElementById('ul');
    var li = document.createElement('li');
    li.innerText = weatherData.name + ', ' + weatherData.sys.country  + '\nCurrent weather conditions: ' + weatherData.weather[0].description + '\nCurrent temperature: ' + weatherData.main.temp + '\nMinimum temperature: ' + weatherData.main.temp_min + '\nMaximum temperature: ' + weatherData.main.temp_max + '\nWind speed (metres per second): ' + weatherData.wind.speed +'\n \n';
    ul.appendChild(li)
  },

  createBarGraph: function(weatherData) {
    new BarGraph(weatherData)
  }

}