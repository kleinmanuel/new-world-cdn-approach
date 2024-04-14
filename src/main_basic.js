import OSM from "https://cdnjs.cloudflare.com/ajax/libs/openlayers/2.11/lib/OpenLayers/source/OSM.js";
import TileLayer from "https://cdnjs.cloudflare.com/ajax/libs/openlayers/2.11/lib/OpenLayers/layer/Tile.js";
import {
  Map,
  View,
} from "https://cdnjs.cloudflare.com/ajax/libs/openlayers/2.11/lib/OpenLayers.js";
import { fromLonLat } from "https://cdnjs.cloudflare.com/ajax/libs/openlayers/2.11/lib/OpenLayers/proj.js";

new Map({
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
