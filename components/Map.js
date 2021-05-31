import { useEffect, useRef, useState, useReducer, useContext } from 'react'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import FiltersModal from './FiltersModal'
import { MapContext } from './MapContextProvider'
import filtersReducer, { filtersInitialState } from './provider-filters-reducer'
import PaginationBox from './PaginationBox'
import SearchIcon from './SearchIcon'
import getDistanceFromLatLonInMi from '../utils/distance'

// import "leaflet/dist/leaflet.css";
// import "leaflet.markercluster/dist/MarkerCluster.css"

function createMapIcon(LeafletRef) {
  return LeafletRef.icon({
    iconUrl: './map_pin.svg',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94],
  })
}

export default function Map() {
  const mapRef = useRef(null)
  const [showSearchInAreaButton, setShowSearchInAreaButton] = useState(false)
  const [leafletMap, setLeafletMap] = useState(null)
  const LeafletRef = useRef(null)
  const hasInitMap = useRef(false)

  const markerLayerGroupRef = useRef(null)
  const {
    setIsShowingFilters,
    providers,
    filtersDispatch,
    filtersState,
    hasFiltersSet,
  } = useContext(MapContext)
  const { location } = filtersState

  useEffect(async () => {
    // init map
    if (window === undefined || !mapRef.current || hasInitMap.current) {
      return
    }
    hasInitMap.current = true
    LeafletRef.current = window.L
    const osmLayer = LeafletRef.current.tileLayer(
      'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        attribution:
          '© <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
    )

    const map = LeafletRef.current
      .map(mapRef.current, {
        center: [51.505, -0.09],
        zoom: 13,
      })
      ?.addLayer(osmLayer)
    setLeafletMap(map)

    map.on('zoomend', () => {
      if (location?.latitude && location?.longitude) {
        return
      }
      setShowSearchInAreaButton(true)
    })
  })

  const handleShowSearchInAreaClick = () => {
    const { _northEast, _southWest } = leafletMap.getBounds()
    const distance = getDistanceFromLatLonInMi(
      _northEast.lat,
      _northEast.lng,
      _southWest.lat,
      _southWest.lng,
    )
    const radius = distance / 2
    filtersDispatch({
      type: 'SET_LOCATION',
      radius,
    })
  }

  const iconCreateFunction = (cluster) => {
    return LeafletRef.current.divIcon({
      html: cluster.getChildCount(),
      className: 'cluster-icon',
      iconSize: LeafletRef.current.point(40, 40),
    })
  }

  useEffect(() => {
    // add markers
    if (!LeafletRef.current || !providers) {
      return
    }

    const mapPin = createMapIcon(LeafletRef.current)
    if (!markerLayerGroupRef.current && leafletMap) {
      markerLayerGroupRef.current = LeafletRef.current
        .layerGroup()
        .addTo(leafletMap)
    }

    // remove all the markers in one go
    markerLayerGroupRef.current?.clearLayers()

    const latLngMarkerLatLngs = []
    const markers = LeafletRef.current.markerClusterGroup({
      iconCreateFunction,
    })

    providers.map((provider) => {
      const { lat, lng } = provider.location.latLng
      const leafleftLatLng = LeafletRef.current.latLng(lat, lng)
      latLngMarkerLatLngs.push([lat, lng])
      const { name, location } = provider
      const { address } = location ?? {}
      const marker = LeafletRef.current
        .marker(leafleftLatLng, { icon: mapPin })
        .bindPopup(
          '<div>' +
            '<div>' +
            name +
            '</div>' +
            '<div>' +
            address?.line?.[0] +
            '</div>' +
            '<div>' +
            address?.city +
            address?.state +
            ',' +
            address?.postalCode +
            '</div>' +
            '</div>',
        )
      markers?.addLayer(marker)
    })
    markerLayerGroupRef.current?.addLayer(markers)
    if (leafletMap && latLngMarkerLatLngs.length) {
      leafletMap.fitBounds(latLngMarkerLatLngs)
    }
  }, [providers, leafletMap])

  return (
    <Box ref={mapRef} h="100%" w="100vw">
      <Button
        leftIcon={<SearchIcon />}
        colorScheme="whatsapp"
        onClick={() => setIsShowingFilters(true)}
        position="absolute"
        top={5}
        right={5}
        zIndex={500}
      >
        Search
      </Button>

      <FiltersModal />
      <PaginationBox />
      {hasFiltersSet && (
        <Flex position="absolute" bottom={[44]} left={4} zIndex={500}>
          <Button
            colorScheme="whatsapp"
            onClick={() => {
              const center = LeafletRef.current.latLng(
                location.latitude,
                location.longitude,
              )
              leafletMap?.panTo(center)
            }}
          >
            Center Map
          </Button>

          {showSearchInAreaButton && (
            <Button
              colorScheme="orange"
              ml={4}
              onClick={handleShowSearchInAreaClick}
            >
              Search in area
            </Button>
          )}
        </Flex>
      )}
    </Box>
  )
}
