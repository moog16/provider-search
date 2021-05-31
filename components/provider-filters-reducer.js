import produce from 'immer'
import specialtiesOptions from '../public/specialties.json'

// specialty, location, page
export const filtersInitialState = {
  specialties: Object.keys(specialtiesOptions),
  location: null,
  name: '',
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
    case 'SET_NAME':
      state.name = action.name
      break
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
      const didLatLngChange =
        (action.latitude && state.location?.latitude !== action.latitude) ||
        (action.longitude && state.location?.longitude !== action.longitude)
      if (action.title) {
        state.location.title = action.title
      }
      if (action.latitude && action.longitude) {
        state.location.latitude = action.latitude
        state.location.longitude = action.longitude
      }
      const defaultRadius = 100
      if (didLatLngChange) {
        state.location.radius = defaultRadius
      } else if (action.radius) {
        state.location.radius = Math.max(
          action.radius || defaultRadius,
          state.location?.radius || defaultRadius,
        )
      }
      break
    case 'RESET_FILTERS':
      state.name = ''
      state.location = null
      state.specialties = Object.keys(specialtiesOptions)
      break
  }
})
