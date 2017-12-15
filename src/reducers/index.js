import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import OrdersReducer from './reducer_orders';
import SupportedPairsReducer from './reducer_supported_pairs';


const rootReducer = combineReducers({
  orders: OrdersReducer,
  supportedRates: SupportedPairsReducer,
  form: formReducer
});

export default rootReducer;