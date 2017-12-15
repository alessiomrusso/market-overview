import { GET_SUPPORTED_PAIRS } from "../actions/index";

export default function(state = {}, action) {
  switch (action.type) {
    case GET_SUPPORTED_PAIRS:
      return action.payload
    default:
      return state;
  }
}