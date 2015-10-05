'use strict';

// List of art galleries
var artGalleries = [
  {name: 'The Barbican Centre', location: {lat: 51.5202, lng: -0.095}, url: 'http://www.barbican.org.uk/' },
  {name: 'The British Museum', location: {lat: 51.519459, lng: -0.126931}, url: 'http://www.britishmuseum.org/' },
  {name: 'Design Museum', location: {lat: 51.502766, lng: -0.071862}, url: 'http://www.designmuseum.org/' },
  {name: 'The Hayward Gallery', location: {lat: 51.506111, lng: -0.115556}, url: 'http://www.southbankcentre.co.uk/venues/hayward-gallery' },
  {name: 'The National Gallery', location: {lat: 51.5086, lng: -0.1283}, url: 'http://www.nationalgallery.org.uk/' },
  {name: 'The National Portrait Gallery', location: {lat: 51.509369, lng: -0.127733}, url: 'http://www.npg.org.uk/' },
  {name: 'The Natural History Museum', location: {lat: 51.495983, lng: -0.176372}, url: 'http://www.nhm.ac.uk/' },
  {name: 'The Photographers\' Gallery', location: {lat: 51.5148, lng: -0.1389}, url: 'http://thephotographersgallery.org.uk/' },
  {name: 'The Saatchi Gallery', location: {lat: 51.4906, lng: -0.1589}, url: 'http://www.saatchi-gallery.co.uk/' },
  {name: 'The Science Museum', location: {lat: 51.4975, lng: -0.174722}, url: 'http://www.sciencemuseum.org.uk/' },
  {name: 'Somerset House', location: {lat: 51.511028, lng: -0.117194}, url: 'http://www.somersethouse.org.uk/' },
  {name: 'Tate Britain', location: {lat: 51.490833, lng: -0.127222}, url: 'http://www.tate.org.uk/britain' },
  {name: 'Tate Modern', location: {lat: 51.507625, lng: -0.09897}, url: 'http://www.tate.org.uk/modern' },
  {name: 'The Victoria and Albert Museum', location: {lat: 51.496667, lng: -0.171944}, url: 'http://www.vam.ac.uk/' },
  {name: 'The Whitechapel Gallery', location: {lat: 51.515984, lng: -0.070485}, url: 'http://www.whitechapelgallery.org/' }
];

// KnockoutJS view model
function GalleryViewModel () {
  var self = this;
  self.artGalleries = artGalleries;
}
ko.applyBindings(new GalleryViewModel());


// Draw the map
function initMap() {

  // Location of the central london
  var centralLondon = { lat: 51.507222, lng: -0.1275 };

  // Custom map style
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

  // Create a map
  var map = new google.maps.Map(document.getElementById('map'), {
    center: centralLondon,
    scrollwheel: false,
    zoom: 14,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
    }
  });

  map.mapTypes.set(customMapTypeId, customMapType);
  map.setMapTypeId(customMapTypeId);

  // Add an infoWindow
  var infowindow = new google.maps.InfoWindow();

  google.maps.event.addListener(map, 'click', function() {
    infowindow.close();
  });

  // Add markers
  var marker;

  for (var i = 0, len = artGalleries.length; i < len; i++){
    marker = new google.maps.Marker({
      position: artGalleries[i].location,
      map: map,
      title: artGalleries[i].name
    });
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(artGalleries[i].name);
        infowindow.open(map, marker);
      }
    })(marker, i));
  }

}