import { useEffect, useRef, useState, useReducer,useContext } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import FiltersModal from "./FiltersModal";
import {MapContext} from './MapContextProvider'
import filtersReducer, {filtersInitialState} from './provider-filters-reducer'
import PaginationBox from './PaginationBox'

import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css"


function createMapIcon(LeafletRef) {
  return LeafletRef.icon({
      iconUrl: './map_pin.svg',
      iconSize: [38, 95],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
      shadowSize: [68, 95],
      shadowAnchor: [22, 94]
  });
}
export default function Map() {
  const mapRef = useRef(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [leafletMap, setLeafletMap] = useState(null);
  const LeafletRef = useRef(null);
  const hasInitMap = useRef(false);
  const {providers} = useContext(MapContext)
  const [filtersState] = useReducer(
    filtersReducer,
    filtersInitialState,
  )

  useEffect(async () => {
    if (window === undefined || !mapRef.current || hasInitMap.current) {
      return;
    }
    hasInitMap.current = true
    LeafletRef.current = (await import("leaflet")).default;
    (await import("leaflet.markercluster/dist/leaflet.markercluster.js")).default

    const osmLayer = LeafletRef.current.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    setLeafletMap(LeafletRef.current.map(mapRef.current, {
      center: [51.505, -0.09],
      zoom: 13,
    }).addLayer(osmLayer));
  });

  useEffect(() => {
    if (!LeafletRef.current || !providers) {
      return
    }

    const mapPin = createMapIcon(LeafletRef.current)

    const latLngMarkerLatLngs = []
    const markers = LeafletRef.current.markerClusterGroup();

    providers.map((provider, index) => {
      const {lat, lng} = provider.locations[0].latLng
      const leafleftLatLng = LeafletRef.current.latLng(lat, lng)
      latLngMarkerLatLngs.push([lat,lng])
      const marker = LeafletRef.current.marker(leafleftLatLng, {icon: mapPin}).bindPopup(provider.name)
      markers.addLayer(marker);
      // LeafletRef.current.marker(leafleftLatLng, {icon: mapPin}).addTo(leafletMap).bindPopup(provider.name)
    })
    leafletMap.addLayer(markers)

    leafletMap.fitBounds(latLngMarkerLatLngs)
  }, [providers, leafletMap])

  return (
    <Box ref={mapRef} h="100%" w="100vw">
      <FiltersModal />
      <PaginationBox />
    </Box>
  );
}
