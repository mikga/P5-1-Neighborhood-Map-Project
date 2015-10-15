/**
 * The array of the pre-defined Art gallery locations
 * @type {Array}
 */
var ART_GALLERIES = [
  {id: 1, name: 'Barbican Centre', location: {lat: 51.5202, lng: -0.095}, url: 'http://www.barbican.org.uk/', twitter: 'BarbicanCentre', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Barbican-arts-centre-large.jpg/125px-Barbican-arts-centre-large.jpg' },
  {id: 2, name: 'British Museum', location: {lat: 51.519459, lng: -0.126931}, url: 'http://www.britishmuseum.org/', twitter: 'britishmuseum', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/British_Museum_from_NE_2.JPG/125px-British_Museum_from_NE_2.JPG' },
  {id: 3, name: 'Design Museum', location: {lat: 51.502766, lng: -0.071862}, url: 'http://www.designmuseum.org/', twitter: 'DesignMuseum', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Design_Museum.jpg/125px-Design_Museum.jpg' },
  {id: 4, name: 'Hayward Gallery', location: {lat: 51.506111, lng: -0.115556}, url: 'http://www.southbankcentre.co.uk/venues/hayward-gallery', twitter: 'HaywardGallery', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Hayward-gallery-london_I.jpg/125px-Hayward-gallery-london_I.jpg' },
  {id: 5, name: 'National Gallery', location: {lat: 51.5086, lng: -0.1283}, url: 'http://www.nationalgallery.org.uk/', twitter: 'NationalGallery', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/National_Gallery_in_September_2011.jpg/125px-National_Gallery_in_September_2011.jpg' },
  {id: 6, name: 'National Portrait Gallery', location: {lat: 51.509369, lng: -0.127733}, url: 'http://www.npg.org.uk/', twitter: 'NPGLondon', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/London_NPG.JPG/125px-London_NPG.JPG' },
  {id: 7, name: 'Natural History Museum', location: {lat: 51.495983, lng: -0.176372}, url: 'http://www.nhm.ac.uk/', twitter: 'NHM_London', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Natural_History_Museum_London_Jan_2006.jpg/125px-Natural_History_Museum_London_Jan_2006.jpg' },
  {id: 8, name: 'Photographers\' Gallery', location: {lat: 51.5148, lng: -0.1389}, url: 'http://thephotographersgallery.org.uk/', twitter: 'TPGallery', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/The_Photographers%27_Gallery%2C_London.jpg/125px-The_Photographers%27_Gallery%2C_London.jpg' },
  {id: 9, name: 'Saatchi Gallery', location: {lat: 51.4906, lng: -0.1589}, url: 'http://www.saatchi-gallery.co.uk/', twitter: 'saatchi_gallery', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/SaatchiGallery.jpg/125px-SaatchiGallery.jpg' },
  {id: 10, name: 'Science Museum', location: {lat: 51.4975, lng: -0.174722}, url: 'http://www.sciencemuseum.org.uk/', twitter: 'sciencemuseum', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Science_Museum%2C_Exhibition_Road%2C_London_SW7_-_geograph.org.uk_-_1125595.jpg/125px-Science_Museum%2C_Exhibition_Road%2C_London_SW7_-_geograph.org.uk_-_1125595.jpg' },
  {id: 11, name: 'Somerset House', location: {lat: 51.511028, lng: -0.117194}, url: 'http://www.somersethouse.org.uk/', twitter: 'SomersetHouse', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Somerset_House.jpg/125px-Somerset_House.jpg' },
  {id: 12, name: 'Tate Britain', location: {lat: 51.490833, lng: -0.127222}, url: 'http://www.tate.org.uk/britain', twitter: 'Tate', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Tate_Britain_%285822081512%29_%282%29.jpg/125px-Tate_Britain_%285822081512%29_%282%29.jpg' },
  {id: 13, name: 'Tate Modern', location: {lat: 51.507625, lng: -0.09897}, url: 'http://www.tate.org.uk/modern', twitter: 'Tate', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Tate_Modern_viewed_from_Thames_Pleasure_Boat_-_geograph.org.uk_-_307445.jpg/125px-Tate_Modern_viewed_from_Thames_Pleasure_Boat_-_geograph.org.uk_-_307445.jpg' },
  {id: 14, name: 'Victoria and Albert Museum', location: {lat: 51.496667, lng: -0.171944}, url: 'http://www.vam.ac.uk/', twitter: 'V_and_A', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Victoria_%26_Albert_Museum_Entrance%2C_London%2C_UK_-_Diliff.jpg/125px-Victoria_%26_Albert_Museum_Entrance%2C_London%2C_UK_-_Diliff.jpg' },
  {id: 15, name: 'Whitechapel Gallery', location: {lat: 51.515984, lng: -0.070485}, url: 'http://www.whitechapelgallery.org/', twitter: '_TheWhitechapel', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Whitechapel_Gallery_in_August_2014.JPG/125px-Whitechapel_Gallery_in_August_2014.JPG' }
];

// Map
var map;

// Markers
var galleryMarkers = [];

// InfoWindow
var infowindow;

// filter result
var filterResult;


/**
 * KnockoutJS view model
 */
function GalleryViewModel () {
  'use strict';

  var self = this;

  // Setting the initial gallery data
  filterResult = ko.observableArray(ART_GALLERIES.slice());

  // Initialise the filter string
  self.filterString = ko.observable('');

  // Side bar status - initially hidden
  self.showSidebar = ko.observable(false);

  // Function to filter the list
  self.filterGallery = function() {
    filterResult(ART_GALLERIES.slice());
    filterResult.remove(function(gallery){
      return gallery.name.toLowerCase().indexOf(self.filterString().toLowerCase()) === -1;
    });
    addMarkers(filterResult());
  };

  // Function to click a marker
  self.clickMarker = function() {
    var index = filterResult.indexOf(this);
    google.maps.event.trigger(galleryMarkers[index], 'click');
  };

  // Togle side bar status
  self.toggleSidebar = function() {
    self.showSidebar(!self.showSidebar());
  };

}
ko.applyBindings(new GalleryViewModel());


/**
 * Initialise the Google Map
 */
function initMap() {
  'use strict';

  // Location of the central london
  var centralLondon = { lat: 51.507222, lng: -0.1275 };

  // Custom map style
  var customMapType = new google.maps.StyledMapType(
    [
      {
        featureType: 'poi',
        stylers: [{saturation: -100, visibility: 'off'}]
      },
      {
        featureType: 'poi.park',
        stylers: [{saturation: -100, visibility: 'on'}]
      },
      {
        featureType: 'water',
        stylers: [{saturation: -80}]
      },
      {
        featureType: 'road',
        stylers: [{saturation: -100}]
      },
      {
        elementType: 'labels.text',
        stylers: [{visibility: 'off'}]
      },
    ],
    {
      name: 'No labels'
    }
  );
  var customMapTypeId = 'custom_style';

  // Create a map
  map = new google.maps.Map(document.getElementById('map'), {
    center: centralLondon,
    scrollwheel: false,
    zoom: 14,
    mapTypeControl: false,
    streetViewControl: false,
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

  // Add markers
  addMarkers(filterResult());

}

/**
 * Add markers to the map
 * @param {Array} galleries - The array of galleries
 */
function addMarkers(galleries) {
  'use strict';

  var marker,
      i,
      len;

  // Remove all markers
  for (i = 0, len = galleryMarkers.length; i < len; i++){
    galleryMarkers[i].setMap(null);
  }
  galleryMarkers = [];

  // Add markers
  for (i = 0, len = galleries.length; i < len; i++){

    marker = new google.maps.Marker({
      position: galleries[i].location,
      map: map,
      title: galleries[i].name,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        strokeColor: '#C2185B',
        fillColor: '#C2185B',
        fillOpacity: 100,
        scale: 7
      },
    });

    // Click event handler for the marker
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {

        // Content of the infowindow
        var s = '<div id="infowindow" class="infowindow">' +
                '<h3 class="iw-gallery-name">' + galleries[i].name + '</h3>' +
                '<img class="iw-gallery-image" src="' + galleries[i].photo + '" alt="' + galleries[i].name + '">' +
                '<a class="iw-gallery-url" href="' + galleries[i].url + '">' + galleries[i].url + '</a>' +
                '<div id="twitter-timeline"></div>' +
                // '<span class="twitter-loading">Loading </span><a class="twitter-timeline" href="https://twitter.com/' + galleries[i].twitter + '" data-widget-id="653667256036159489" data-screen-name="' + galleries[i].twitter + '">Tweets by @' + galleries[i].twitter + '</a>' +
                '</div>';
        infowindow.setContent(s);
        infowindow.open(map, marker);

        // Render twitter feed
        makeTwitterWidget(galleries[i].twitter, 'twitter-timeline');

        //Animate the marker
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
          marker.setAnimation(null);
        }, 1400);

      };
    })(marker, i));
    galleryMarkers.push(marker);
  }

}

/**
 * Make twitter widget on the specified element
 *
 * This function uses the Twitter JavaScript API, which internally
 * obtains the twitter widget using AJAX, hence eliminates the explicit
 * use of jQuery ajax call.
 * When the AJAX call fails, it just doesn't add the twitter feed
 * to the DOM, which is intended.
 *
 * @param {String} twitterScreenName - The Twitter screen name
 * @param {String} elementId         - The element ID
 * @see {@link https://dev.twitter.com/web/javascript/creating-widgets|Twitter JavaScript}
 */
function makeTwitterWidget(twitterScreenName, elementId) {
  'use strict';

  twttr.widgets.createTimeline(
    '653667256036159489',
    // '653667256036159488',
    document.getElementById(elementId),
    {
      tweetLimit: 1,
      screenName: twitterScreenName
    }
  );
}


