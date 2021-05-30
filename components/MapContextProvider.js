import React, {useEffect, createContext, useState, useReducer} from 'react'
import filtersReducer,{filtersInitialState} from './provider-filters-reducer'
import providersResponse from "../public/providers_with_specialties.json";
import getDistanceFromLatLonInMi from '../utils/distance'

export const MapContext = createContext({
  isShowingFilters: false,
  setIsShowingFilters: () => {},
  filterState: filtersInitialState,
  filtersDispatch: () => {},
  providers: [],
  totalResults: 0,
})

export default function MapContextProvider({
  children
}) {
  const [isShowingFilters, setIsShowingFilters] = useState(false)
  const [providers, setProviders] = useState(providersResponse)
  const [totalResults, setTotalResults] = useState(providersResponse.length)

  const [filtersState, filtersDispatch] = useReducer(
    filtersReducer,
    filtersInitialState,
  )

  useEffect(() => {
    const updatedProviders = providersResponse.filter((provider) => {
      const {specialties} = filtersState
      const hasMatchingSpecialty = !specialties.length || provider.specialties.some((specialty) => specialties.includes(specialty))
      if (!hasMatchingSpecialty) {
        return false
      }
      const locationLat = filtersState.location?.latitude
      const locationLng = filtersState.location?.longitude
      if (locationLat && locationLng) {
        const providerLatLng = provider.location.latLng
        const distance = getDistanceFromLatLonInMi(locationLat, locationLng, providerLatLng.lat, providerLatLng.lng) 
        const isNearLocation = distance <= 25
        if (!isNearLocation) {
          return false
        }
      }

      return true
    })

    setTotalResults(updatedProviders.length)
    setProviders(updatedProviders)
  }, [filtersState])


  return <MapContext.Provider value={{
    isShowingFilters,
    setIsShowingFilters,
    filtersState, 
    filtersDispatch,
    providers,
    totalResults
  }}>
    {children}
  </MapContext.Provider>
}
// "id": 11580,
// "name": "Archana Srivastava MD PA Dallas TX",
// "resource_url": "https://fhir.healow.com/FHIRServer/fhir/FJIJAD",
// "logo": "https://1uphealth-assets.s3-us-west-2.amazonaws.com/systems/health-system-default.png",
// "api_version": "FHIR STU3 3.0.1",
// "status": "connection_working",
// "ehr": "eClinicalWorks",
// "location": 
//     {
//         "name": "Archana Srivastava MD PA Dallas TX",
//         "address": {
//             "line": [
//                 "4305 W Wheatland Rd",
//                 "Suite No 130"
//             ],
//             "city": "Dallas",
//             "postalCode": "75237",
//             "state": "TX"
//         },
//         "latLng": {"lat":30.191096,"lng":-97.818873}
//     }
// 
// 4305 W Wheatland Rd Dallas TX 75237