var BarGraph = function(data) {
  this.existingData = [];
  this.existingData.push(data);

  var container = document.getElementById('bar-graph');

  Highcharts.setOptions({
   colors: ['#856367']
 });

  var chart = new Highcharts.Chart({

    chart: {
      type: 'column',
      renderTo: container,
      style: {
        fontFamily: 'Arvo'
      },
      backgroundColor: '#efd3ae',
      colors: ['#856367']
    },

    title: {
      text: 'Temperatures of Selected Locations',
      style: {
        color: '#856367',
        fontWeight: 'bold'
      }
    },

    plotOptions: {
      series: {
        borderColor: '#856367'
      }
    },

    series: [{
      name: 'Temperature',
      data: data
    }],

    yAxis: {
     title: {
       text: 'Temperature (°C)'
     }
   },

   xAxis: {
    title: {
      text: 'Location',
      categories: data
    }
  }

});
  
}