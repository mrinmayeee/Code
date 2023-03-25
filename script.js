
//Define access token
mapboxgl.accessToken = 'pk.eyJ1IjoibXJpbm1heWVlZSIsImEiOiJjbGRtMHNobWkwMnRhM25teTJ6Y3poYWY3In0.7jz_b3HAoeEVcCmXB3qCKA'; //****ADD YOUR PUBLIC ACCESS TOKEN*****

//Initialize map and edit to your preference
const beforeMap = new mapboxgl.Map({
    container: 'before', //container id in HTML
    style: 'mapbox://styles/mrinmayeee/clfjtrdwe000101lisv97cdwj',  //****ADD MAP STYLE HERE *****
    center: [-79.39, 43.65],  // starting point, longitude/latitude
    zoom: 9 // starting zoom level
});


const afterMap = new mapboxgl.Map({
    container: 'after',
    style: 'mapbox://styles/mrinmayeee/clfjtrdwe000101lisv97cdwj',
    center: [-79.39, 43.65],  // starting point, longitude/latitude
    zoom: 9 // starting zoom level
});
     
// Add zoom and rotation controls to the map.
// map.addControl(new mapboxgl.NavigationControl());

// Add fullscreen option to the map
// map.addControl(new mapboxgl.FullscreenControl());

// Adding a search box - create geocoder variable
// const geocoder = new MapboxGeocoder({
//     accessToken: mapboxgl.accessToken,
//     mapboxgl: mapboxgl,
//     countries: "ca"
// });

// Use geocoder div to position geocoder on page
// document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

beforeMap.on('load', () => {

    beforeMap.addSource('NDVI', {
        type: 'vector',
        url: 'mapbox://mrinmayeee.1qo1nqv5'
    });

    beforeMap.addLayer(
        {
            'id': 'NDVI_1',
            'type': 'fill',
            'source': 'NDVI',
            'source-layer': 'NDVI_byNeighb_TO_2019-124co0',
            'paint': { //adding expressions to modify the circle radius and colour options
                'fill-color':                
                [
                    'step', // expression to get a graduated colours for the location markers 
                    ['get', 'grlan19_12'], // GET expression retrieves the value from 'Distance' in the original geojson file (later turned into a tileset)
                    '#58D68D', // colour for NDVI less than 0.2
                    0.3, '#27AE60', // colour for NDVI more than 0.3
                    0.4, '#229954', // colour for NDVI more than 0.4
                    0.5, '#196F3D' // colour for  NDVI more than 0.5
                ],
                'fill-outline-color': 'white',
                'fill-opacity': 0.6,
            },
        });
});

afterMap.on('load', () => {

    afterMap.addSource('NDVI', {
        type: 'vector',
        url: 'mapbox://mrinmayeee.1qo1nqv5'
    });

    afterMap.addLayer(
        {
            'id': 'NDVI_1',
            'type': 'fill',
            'source': 'NDVI',
            'source-layer': 'NDVI_byNeighb_TO_2019-124co0',
            'paint': { //adding expressions to modify the circle radius and colour options
                'fill-color':                
                [
                    'step', // expression to get a graduated colours for the location markers 
                    ['get', 'grlan19_12'], // GET expression retrieves the value from 'Distance' in the original geojson file (later turned into a tileset)
                    '#EB9313', // colour for NDVI less than 0.2m
                    0.3, '#EA9D2E', // colour for NDVI less than 0.2m
                    0.4, '#00b4d8', // colour for NDVI less than 0.2m
                    0.5, '#90e0ef' // colour for  NDVI less than 0.2m
                ],
                'fill-outline-color': 'white',
                'fill-opacity': 0.6,
            },
        });
});
// POP-UP ON CLICK EVENT
// map.on('mouseenter', 'NDVI_1', () => {
//     map.getCanvas().style.cursor = 'pointer'; //Switch cursor to pointer when mouse is over a green place marker
// });

// map.on('mouseleave', 'NDVI_1', () => {
//     map.getCanvas().style.cursor = ''; //Switch cursor back when mouse leaves the green place marker
// });




// map.on('click', 'NDVI_1', (e) => {
//     new mapboxgl.Popup() //Create a new popup box on each click
//         .setLngLat(e.lngLat) //Use method to set the coordinates of popup based on where the user clicks
//         .setHTML("<b>Neighbourhood:</b> " + e.features[0].properties.FIELD_7 + "<br>" +
//             "<b>NDVI:</b> " + e.features[0].properties.grlan19_12) // add the popup text 
//         .addTo(map); //Show popup on map
// })

const container = '#comparison-container';
 
const map = new mapboxgl.Compare(beforeMap, afterMap, container, {
//Set this to enable comparing two maps by mouse movement:
mousemove: true,
orientation: 'vertical'
});
