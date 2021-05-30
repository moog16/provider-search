import {useReducer, useContext, useState, useRef} from 'react'
import { Box,Text, Input, Select, Checkbox, VStack } from "@chakra-ui/react";
import axios from 'axios'

import {MapContext} from './MapContextProvider'
import specialtiesOptions from "../public/specialties.json";
import debounce from '../utils/debounce'

export default function ProviderFilters() {
  const {filtersState, filtersDispatch} = useContext(MapContext)
  const {specialties, location} = filtersState
  const [locationValue, setLocationValue] = useState('')

  const handleLocationInputBlur = async (e) => {
    const {value} = e.target
    if (!value) {
      return 
    }
    const data = await axios.get(`https://nominatim.openstreetmap.org/search?q=${value} noe st&format=json&limit=1`)
    const location = data?.data[0]
    if (!location) {
      return
    }
    filtersDispatch({
      type: 'SET_LOCATION',
      latitude: location.lat,
      longitude: location.lon,
      title: location.display_name
    })
    if (location.display_name) {
      setLocationValue(location.display_name)
    }
  }

  return (
    <>
      <Text
        fontFamily='heading'
        as='h2'fontSize='xl'
        pb={4}
        color='whatsapp.700'
        fontWeight='bold'
      >
        Search near location
      </Text>
      <Input
        onBlur={handleLocationInputBlur}
        placeholder={location?.title || 'Enter address'}
        value={locationValue}
        onChange={(e) => {
          const {value} = e.target
          setLocationValue(value)
        }}
      />
    </>
  );
}
