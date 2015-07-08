function initialize() {
       var mapCanvas = document.getElementById('map-canvas');
       var mapOptions = {
         center: new google.maps.LatLng(45.5200, -122.6819),
         zoom: 8,
         mapTypeId: google.maps.MapTypeId.ROADMAP
       }
       var map = new google.maps.Map(mapCanvas, mapOptions)
     }
     google.maps.event.addDomListener(window, 'load', initialize);
