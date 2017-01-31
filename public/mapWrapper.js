var MapWrapper = function(container, coordinates, zoom){
  this.map = new google.maps.Map(container, {
    center: coordinates,
    zoom: zoom,
    mapTypeId: 'hybrid'
  });
}

MapWrapper.prototype = {

  addMarker: function(coordinates){
    var marker = new google.maps.Marker({
      position: coordinates,
      map: this.map
    });
  },

  addClickEvent: function( onclick ){
    google.maps.event.addListener(this.map, 'click', onclick );
  }
}