import { RECEIVE_PREFERENCES } from '../actions'

function preferences (state = {}, action) {
  switch (action.type) {
    case RECEIVE_PREFERENCES:
      return {
        ...state,
        ...action.preferences
      }
    default:
      return state
  }
}

export default preferences
