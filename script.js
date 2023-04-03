
//Define access token
mapboxgl.accessToken = 'pk.eyJ1IjoibXJpbm1heWVlZSIsImEiOiJjbGRtMHNobWkwMnRhM25teTJ6Y3poYWY3In0.7jz_b3HAoeEVcCmXB3qCKA'; //****ADD YOUR PUBLIC ACCESS TOKEN*****

//Initialize map and edit to your preference
const NDVIMap = new mapboxgl.Map({
    container: 'before', //container id in HTML
    style: 'mapbox://styles/mapbox/light-v11',  //****ADD MAP STYLE HERE *****
    center: [-79.39, 43.65],  // starting point, longitude/latitude
    zoom: 9 // starting zoom level
});

const TempMap = new mapboxgl.Map({
    container: 'after',
    style: 'mapbox://styles/mapbox/light-v11',
    center: [-79.39, 43.65],  // starting point, longitude/latitude
    zoom: 9 // starting zoom level
});


NDVIMap.on('load', () => {

    NDVIMap.addSource('NDVI', {
        type: 'vector',
        url: 'mapbox://mrinmayeee.38k15lm3'
    });

    NDVIMap.addLayer(
        {
            'id': 'NDVI1',
            'type': 'fill',
            'source': 'NDVI',
            'source-layer': 'NDVI_neighb_TO_2019_v3-bpfsic',
            'paint': { //adding expressions to modify the circle radius and colour options
                'fill-color':
                    [
                        'step', // expression to get a graduated colours for the location markers 
                        ['get', 'mean_ndvi_'], // GET expression retrieves the value from 'Distance' in the original geojson file (later turned into a tileset)
                        '#58D68D', // colour for NDVI less than 0.2
                        0.3, '#27AE60', // colour for NDVI more than 0.3
                        0.4, '#229954', // colour for NDVI more than 0.4
                        0.5, '#196F3D' // colour for  NDVI more than 0.5
                    ],
                'fill-outline-color': 'white',
                'fill-opacity': 0.9,
            },
        });
});

TempMap.on('load', () => {

    TempMap.addSource('Temp', {
        type: 'vector',
        url: 'mapbox://mrinmayeee.963y2he1'
    });

    TempMap.addLayer(
        {
            'id': 'Temp1',
            'type': 'fill',
            'source': 'Temp',
            'source-layer': 'LST_neighb_TO_3Y_2019_v3-dsv2kz',
            'paint': { //adding expressions to modify the circle radius and colour options
                'fill-color':
                    [
                        'step', // expression to get a graduated colours for the location markers 
                        ['get', 'mean_lst_3'], // GET expression retrieves the value from 'Distance' in the original geojson file (later turned into a tileset)
                        '#F5B041', // colour for LST less than 28 degrees
                        28, '#F39C12', // colour for LST more than 28 degrees
                        29, '#CA6F1E', // colour for LST more than 29 degrees
                        30, '#AF601A', // colour for LST more than 30 degrees
                        31, '#6E2C00' // colour for LST more than 31 degrees
                    ],
                'fill-outline-color': 'white',
                'fill-opacity': 0.9,
            },
        });
});
// //POP-UP ON CLICK EVENT
// afterMap.on('mouseenter', 'NDVI_1', () => {
//     afterMap.getCanvas().style.cursor = 'pointer'; //Switch cursor to pointer when mouse is over a green place marker
// });

// afterMap.on('mouseleave', 'NDVI_1', () => {
//     afterMap.getCanvas().style.cursor = ''; //Switch cursor back when mouse leaves the green place marker
// });




// afterMap.on('click', 'NDVI_1', (e) => {
//     new mapboxgl.Popup() //Create a new popup box on each click
//         .setLngLat(e.lngLat) //Use method to set the coordinates of popup based on where the user clicks
//         .setHTML("<b>Neighbourhood:</b> " + e.features[0].properties.FIELD_7 + "<br>" +
//             "<b>NDVI:</b> " + e.features[0].properties.grlan19_12) // add the popup text 
//         .addTo(afterMap); //Show popup on map
// })


const container = '#comparison-container';

const comparemap = new mapboxgl.Compare(NDVIMap, TempMap, container, {
   
});
let comparecheck = document.getElementById('comparecheck');

comparecheck.addEventListener('click', () => {
    if (comparecheck.checked) {
        comparecheck.checked = true;
        comparemap.style.display = "block";
    }
    else {
        comparemap.style.display = "none";
        comparecheck.checked = false;
    }
});



//Adding a search box - create geocoder variable
const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    countries: "ca"
});

//Use geocoder div to position geocoder on page
document.getElementById('geocoder').appendChild(geocoder.onAdd(NDVIMap));

document.getElementById('returnbutton').addEventListener('click', () => {
    comparemap.flyTo({
        center: [-79.39, 43.65],
        zoom: 9,
        essential: true
    });
});

//Add zoom and rotation controls to the map.
TempMap.addControl(new mapboxgl.NavigationControl());

//Add fullscreen option to the map
TempMap.addControl(new mapboxgl.FullscreenControl());