import OSM from "https://cdnjs.cloudflare.com/ajax/libs/openlayers/2.11/lib/OpenLayers/source/OSM.js";
import TileLayer from "https://cdnjs.cloudflare.com/ajax/libs/openlayers/2.11/lib/OpenLayers/layer/Tile.js";
import {
  Map,
  View,
} from "https://cdnjs.cloudflare.com/ajax/libs/openlayers/2.11/lib/OpenLayers.js";
import { fromLonLat } from "https://cdnjs.cloudflare.com/ajax/libs/openlayers/2.11/lib/OpenLayers/proj.js";
import VectorLayer from "https://cdnjs.cloudflare.com/ajax/libs/openlayers/2.11/lib/OpenLayers/layer/Vector.js";
import VectorSource from "https://cdnjs.cloudflare.com/ajax/libs/openlayers/2.11/lib/OpenLayers/source/Vector.js";
import Feature from "https://cdnjs.cloudflare.com/ajax/libs/openlayers/2.11/lib/OpenLayers/Feature.js";
import Point from "https://cdnjs.cloudflare.com/ajax/libs/openlayers/2.11/lib/OpenLayers/geom/Point.js";
import { circular } from "https://cdnjs.cloudflare.com/ajax/libs/openlayers/2.11/lib/OpenLayers/geom/Polygon.js";
import Control from "https://cdnjs.cloudflare.com/ajax/libs/openlayers/2.11/lib/OpenLayers/control/Control.js";

//test
document.getElementById("h1id").innerHTML = "yourTextHere";

// create map
const map = new Map({
  target: "map-container",
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  view: new View({
    center: fromLonLat([0, 0]),
    zoom: 2,
  }),
});

// create layer with vector source
const source = new VectorSource();
const layer = new VectorLayer({
  source: source,
});
map.addLayer(layer);

// post positions
// source.addFeatures([new Feature(new Point(fromLonLat([0, 0]),))]);

// user position
navigator.geolocation.watchPosition(
  function (pos) {
    const coords = [pos.coords.longitude, pos.coords.latitude];
    const accuracy = circular(coords, pos.coords.accuracy);
    source.clear(true);
    source.addFeatures([
      new Feature(
        accuracy.transform("EPSG:4326", map.getView().getProjection())
      ),
      new Feature(new Point(fromLonLat(coords))),
    ]);
  },
  function (error) {
    alert(`ERROR: ${error.message}`);
  },
  {
    enableHighAccuracy: true,
  }
);

// control to zoom on user position
const locate = document.createElement("div");
locate.className = "ol-control ol-unselectable locate";
locate.innerHTML = '<button title="Locate me">◎</button>';
locate.addEventListener("click", function () {
  if (!source.isEmpty()) {
    map.getView().fit(source.getExtent(), {
      maxZoom: 18,
      duration: 500,
    });
  }
});
map.addControl(
  new Control({
    element: locate,
  })
);
