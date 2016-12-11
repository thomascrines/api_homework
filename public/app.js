var initialize = function(){
  var mainMap = new MapWrapper(document.getElementById('main-map'), {lat: 35.845541, lng: -83.016659}, 15);
  mainMap.addClickEvent();
}

window.onload = initialize;