var map = L.map('map').setView([32.7767, -96.7970], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

$('#map').fadeIn(2000);

let domestic = [
    {
        'id': 0,
        'title': 'New York, New York',
        'lat': 40.730610,
        'lon': -73.935242,
        'text': 'I have been to NYC a few times and each visit never disappoints! There are so many things to do and the vibe of the city has got to be one of my favorites. I would love to live here someday!'
    },
    {
        'id': 1,
        'title': 'Chicago, Illinois',
        'lat': 41.881832,
        'lon': -87.623177,
        'text': 'I visited Chicago with my friend last year and we planned our trip a week before we went. It was just so fun because it was such a spontaneous thing and I cannot wait to go back someday.'
    },
];

let foreign = [
    {
        'id': 0,
        'title': 'Seoul, South Korea',
        'lat': 37.532600,
        'lon': 127.024612,
        'text': 'I have visted Seoul many times with my family and usually go in the summertime. Each visit is always super fun because the city is so vibrant and there is so much good food, shopping, and attractions!'
    },
    {
        'id': 1,
        'title': 'Tokyo, Japan',
        'lat': 35.652832,
        'lon': 139.839478,
        'text': 'I really enjoyed Tokyo because the food was amazing and there is so much to see and do both during the day and at night.'
    },
    {
        'id': 2,
        'title': 'London, England',
        'lat': 51.509865,
        'lon': -0.118092,
        'text': 'I have been to London twice with my family and once with my two best friends in high school. I had such a blast each visit; London is such a fun city!'
    },
    {
        'id': 3,
        'title': 'Rome, Italy',
        'lat': 41.902782,
        'lon': 12.496366,
        'text': 'Rome was such a great experience because the architecture is so incredible and the food was so yummy! Getting Italian gelato was one of my favorite parts of each day.'
    },
    {
        'id': 4,
        'title': 'Budapest, Hungary',
        'lat': 47.497913,
        'lon': 19.040236,
        'text': 'Budapest is one of my favorite places I have ever been to. It is truly one of the most beautiful cities and I definitely think that everyone needs to visit at least once in their lifetime.'
    },
];


// function to fly to a location by a given id number
function flyToIndex(location2){
	map.flyTo([domestic[location2].lat,domestic[location2].lon],15)
    
    // open the popup
	myMarkers.getLayers()[location2].openPopup()
}

function homeflyToIndex(location2){
	map.flyTo([foreign[location2].lat,foreign[location2].lon],15)
    
    // open the popup
	myMarkers2.getLayers()[location2].openPopup()
}

// before looping the data, create an empty FeatureGroup
let myMarkers = L.featureGroup();
let myMarkers2 = L.layerGroup();

// loop through data

domestic.forEach(function(item){
    let marker = L.marker([item.lat,item.lon], {
        title: item.title
    })
    
    .bindPopup(`<div><strong>${item.title}</strong><br><img class = 'center' style='height:200px;width:auto;horizontal-align:middle' src = ${item.picture}><br>${item.text}</div>`)

    myMarkers.addLayer(marker)
    
    $('.sidebar').append(`<div class="sidebar-item" onclick="flyToIndex(${item.id})">${item.title}</div>`)
});

foreign.forEach(function(item){
    let marker = L.marker([item.lat,item.lon], {
        title: item.title
    })
    
    .bindPopup(`<div><strong>${item.title}</strong><br>${item.text}</div>`)

    myMarkers2.addLayer(marker)
    
    $('.sidebar').append(`<div class="sidebar-item2" onclick="homeflyToIndex(${item.id})">${item.title}</div>`)
});

// after loop, add the FeatureGroup to map
myMarkers.addTo(map)
myMarkers2.addTo(map)

// define layers
let layers = {
	"Domestic": myMarkers,
    "Foreign": myMarkers2
}

// add layer control box
L.control.layers(null,layers).addTo(map)