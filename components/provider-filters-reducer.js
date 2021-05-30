import produce from 'immer'
import specialtiesOptions from "../public/specialties.json";

// specialty, location, page
export const filtersInitialState = {
  specialties: Object.keys(specialtiesOptions),  
  location: null,
  limit: 100,
  offset: 0,
}

export default produce((state, action) => {
  state.offset = 0

  switch (action.type) {
    case 'ADD_SPECIALTY':
      state.specialties.push(action.specialtyId)
      break
    case 'REMOVE_SPECIALTY': {
      state.specialties = state.specialties.filter(
        (specialtyId) => specialtyId !== action.specialtyId,
      )
      break
    }
    case 'SET_ALL_SPECIALTIES': {
      state.specialties = Object.keys(specialtiesOptions)
      break
    }
    case 'CLEAR_SPECIALTIES': {
      state.specialties = []
      break
    }
    case 'SET_PAGE_OFFSET':
      state.offset = action.offset
      break
    case 'SET_LOCATION':
      state.location = state.location || {}
      // state.location.radius = action.radius || state.location?.radius || 25
      if (action.title) {
        state.location.title = action.title
      }
      if (action.latitude && action.longitude) {
        state.location.latitude = action.latitude
        state.location.longitude = action.longitude
      }
      break
  }
})
