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
    // init map
    if (window === undefined || !mapRef.current || hasInitMap.current) {
      return;
    }
    hasInitMap.current = true
    // requires window - need dynamic import
    LeafletRef.current = (await import("leaflet")).default;
    (await import("leaflet.markercluster/dist/leaflet.markercluster.js")).default

    const osmLayer = LeafletRef.current.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    setLeafletMap(LeafletRef.current.map(mapRef.current, {
      center: [51.505, -0.09],
      zoom: 13,
    })?.addLayer(osmLayer));
  });

  const iconCreateFunction = (cluster) => {
    return LeafletRef.current.divIcon({
      html: cluster.getChildCount(),
      className: 'cluster-icon',
      iconSize: LeafletRef.current.point(40, 40)
    });
  }

  useEffect(() => {
    // add markers
    if (!LeafletRef.current || !providers) {
      return
    }

    const mapPin = createMapIcon(LeafletRef.current)

    const latLngMarkerLatLngs = []
    const markers = LeafletRef.current.markerClusterGroup({
      iconCreateFunction
    });

  console.log(providers)
  debugger
    providers.map((provider, index) => {
      const {lat, lng} = provider.location.latLng
      const leafleftLatLng = LeafletRef.current.latLng(lat, lng)
      latLngMarkerLatLngs.push([lat,lng])
      const {name, location} = provider
      const {address} = location ?? {}
      const marker = LeafletRef.current.marker(leafleftLatLng, {icon: mapPin}).bindPopup(
        '<div>' + 
          '<div>' + 
            name +
          '</div>' + 
          '<div>' + 
            address?.line?.[0] +
          '</div>' + 
          '<div>' + 
            address?.city +
            address?.state + ',' +
            address?.postalCode +
          '</div>'+ 
        '</div>'
      )
      markers?.addLayer(marker);
    })
    leafletMap?.addLayer(markers)

    leafletMap.fitBounds(latLngMarkerLatLngs)
  }, [providers, leafletMap])

  return (
    <Box ref={mapRef} h="100%" w="100vw">
      <FiltersModal />
      <PaginationBox />
    </Box>
  );
}
