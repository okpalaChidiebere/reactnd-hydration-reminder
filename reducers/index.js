import { RECEIVE_PREFERENCES, INCREMENT_PERF_COUNT, DECREMENT_PERF_COUNT } from '../actions'

function preferences (state = {}, action) {
  switch (action.type) {
    case RECEIVE_PREFERENCES:
      return {
        ...state,
        ...action.preferences
      }

    case INCREMENT_PERF_COUNT: {
      const { key } = action
      const preference = { [key]: ++state[key] }
      return {
        ...state,
        ...preference,
      }
    }
      
    case DECREMENT_PERF_COUNT: {
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
