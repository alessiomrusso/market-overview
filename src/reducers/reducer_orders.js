import _ from "lodash";
import { FETCH_ORDERS, CANCEL_ORDER } from "../actions/index";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_ORDERS:
      return _.mapKeys(action.payload.data, "id");
    case CANCEL_ORDER:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}