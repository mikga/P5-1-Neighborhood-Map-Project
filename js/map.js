function initMap() {
  // Create a map object and specify the DOM element for display.
  var pos = { lat: 51.507222, lng: -0.1275 };


  var customMapType = new google.maps.StyledMapType(
    [
      // {
      //   stylers: [
      //     {visibility: 'simplified'},
      //     {weight: 0.8}
      //   ]
      // },
      {
        featureType: 'poi',
        stylers: [{visibility: 'off'}]
      },
      {
        featureType: 'poi.park',
        stylers: [{visibility: 'on'}]
      },
      {
        elementType: 'labels.text',
        stylers: [{visibility: 'off'}]
      },
    ],
    {
      name: 'Custom Style'
    }
  );
  var customMapTypeId = 'custom_style';

  var map = new google.maps.Map(document.getElementById('map'), {
    center: pos,
    scrollwheel: false,
    zoom: 14,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
    }
  });

  map.mapTypes.set(customMapTypeId, customMapType);
  map.setMapTypeId(customMapTypeId);
}