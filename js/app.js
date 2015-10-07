'use strict';

// List of art galleries
var artGalleries = [
  {id: 1, name: 'Barbican Centre', location: {lat: 51.5202, lng: -0.095}, url: 'http://www.barbican.org.uk/' },
  {id: 2, name: 'British Museum', location: {lat: 51.519459, lng: -0.126931}, url: 'http://www.britishmuseum.org/' },
  {id: 3, name: 'Design Museum', location: {lat: 51.502766, lng: -0.071862}, url: 'http://www.designmuseum.org/' },
  {id: 4, name: 'Hayward Gallery', location: {lat: 51.506111, lng: -0.115556}, url: 'http://www.southbankcentre.co.uk/venues/hayward-gallery' },
  {id: 5, name: 'National Gallery', location: {lat: 51.5086, lng: -0.1283}, url: 'http://www.nationalgallery.org.uk/' },
  {id: 6, name: 'National Portrait Gallery', location: {lat: 51.509369, lng: -0.127733}, url: 'http://www.npg.org.uk/' },
  {id: 7, name: 'Natural History Museum', location: {lat: 51.495983, lng: -0.176372}, url: 'http://www.nhm.ac.uk/' },
  {id: 8, name: 'Photographers\' Gallery', location: {lat: 51.5148, lng: -0.1389}, url: 'http://thephotographersgallery.org.uk/' },
  {id: 9, name: 'Saatchi Gallery', location: {lat: 51.4906, lng: -0.1589}, url: 'http://www.saatchi-gallery.co.uk/' },
  {id: 10, name: 'Science Museum', location: {lat: 51.4975, lng: -0.174722}, url: 'http://www.sciencemuseum.org.uk/' },
  {id: 11, name: 'Somerset House', location: {lat: 51.511028, lng: -0.117194}, url: 'http://www.somersethouse.org.uk/' },
  {id: 12, name: 'Tate Britain', location: {lat: 51.490833, lng: -0.127222}, url: 'http://www.tate.org.uk/britain' },
  {id: 13, name: 'Tate Modern', location: {lat: 51.507625, lng: -0.09897}, url: 'http://www.tate.org.uk/modern' },
  {id: 14, name: 'Victoria and Albert Museum', location: {lat: 51.496667, lng: -0.171944}, url: 'http://www.vam.ac.uk/' },
  {id: 15, name: 'Whitechapel Gallery', location: {lat: 51.515984, lng: -0.070485}, url: 'http://www.whitechapelgallery.org/' }
];

// Map
var map;

// Markers
var galleryMarkers = [];

// InfoWindow
var infowindow;

// Search result
var searchResult;

// KnockoutJS view model
function GalleryViewModel () {
  var self = this;
  searchResult = ko.observableArray(artGalleries.slice());
  self.searchString = ko.observable('');
  self.searchGallery = function() {
    searchResult(artGalleries.slice());
    searchResult.remove(function(gallery){
      return gallery.name.indexOf(self.searchString()) === -1;
    });
    addMarkers(searchResult());
  };
  self.clickMarker = function() {
    var index = searchResult.indexOf(this);
    google.maps.event.trigger(galleryMarkers[index], 'click'); // TODO: find a better to do this
  };
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
  map = new google.maps.Map(document.getElementById('map'), {
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
  infowindow = new google.maps.InfoWindow();

  google.maps.event.addListener(map, 'click', function() {
    infowindow.close();
  });

  addMarkers(searchResult());
}

function addMarkers(galleries) {

  // Remove all the markers
  for (var i = 0, len = galleryMarkers.length; i < len; i++){
    galleryMarkers[i].setMap(null);
  }

  // Clear all the marker array
  galleryMarkers = [];

  // Add markers
  var marker;

  for (var i = 0, len = galleries.length; i < len; i++){
    marker = new google.maps.Marker({
      position: galleries[i].location,
      map: map,
      title: galleries[i].name
    });
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(galleries[i].name);
        infowindow.open(map, marker);
      }
    })(marker, i));
    galleryMarkers.push(marker);
  }
}
