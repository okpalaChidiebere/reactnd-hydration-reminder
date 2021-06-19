import { RECEIVE_PREFERENCES, INCREMENT_WATER_COUNT, DECREMENT_WATER_COUNT } from '../actions'

function preferences (state = {}, action) {
  switch (action.type) {
    case RECEIVE_PREFERENCES:
      return {
        ...state,
        ...action.preferences
      }

    case INCREMENT_WATER_COUNT: {
      const { key } = action
      const preference = { [key]: ++state[key] }
      return {
        ...state,
        ...preference,
      }
    }
      
    case DECREMENT_WATER_COUNT: {
      const { key } = action
      const preference = { [key]: state[key] === 0 ? state[key] : --state[key] }
      return {
        ...state,
        ...preference,
      }
    }
    
    default:
      return state
  }
}

export default preferences
