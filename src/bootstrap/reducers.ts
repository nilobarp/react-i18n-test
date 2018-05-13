import { LOCATION_CHANGE } from "react-router-redux";
import { combineReducers } from "redux";

const routeInitialState = {
  location: null
};

function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return {
        ...state,
        location: action.payload
      };

    default:
      return state;
  }
}

/**
 * Remember the last dispatched action
 */
function lastAction(state = null, action) {
  return action;
}

export default function createReducer(injectedReducers) {
  return combineReducers({
    route: routeReducer,
    ...injectedReducers,
    lastAction
  });
}
