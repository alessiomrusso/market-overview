import axios from 'axios';

export const FETCH_ORDERS = 'fetch_orders';
export const CREATE_ORDER = 'create_order';
export const CANCEL_ORDER = 'cancel_order';
export const GET_SUPPORTED_PAIRS = 'get_supported_pairs';

const ROOT_URL = "http://rest.velocorner.com";

/**
 * Retrieves the order list
 */
export function fetchOrders() {
  const request = axios.get(`${ROOT_URL}/retrieveOrders`);

  return {
    type: FETCH_ORDERS,
    payload: request
  };
}

/**
 * Creates an order
 * @param {*} data The order data object
 * @param {*} callback The function to execute after the order is created
 */
export function createOrder(data, callback) {
  const request = axios
    .post(`${ROOT_URL}/createOrder`, JSON.stringify(data))
    .then(() => callback());

  return {
    type: CREATE_ORDER,
    payload: request
  };
}

/**
 * Cancels an order
 * @param {*} id 
 */
export function cancelOrder(id) {
  const request = axios
    .post(`${ROOT_URL}/cancelOrder`, id)

  return {
    type: CANCEL_ORDER,
    payload: id
  };
}

export function getRatesSnapshot() {
  const data = axios.get(`${ROOT_URL}/supportedCurrencyPairs`).then((supportedRates) => {
    return axios.get(`${ROOT_URL}/rateSnapshot`).then((snapshot) => {
      return findSupportedRates(supportedRates.data, snapshot.data);
    });
  });

  return {
    type: GET_SUPPORTED_PAIRS,
    payload: data
  };
}

// Helper functions

/**
 * 
 * @param {Object[]} supportedPairs Array of supported currency pairs
 * @param {Object[]} ratesSnapshot Array of currency exchange rates
 * 
 * @return {Object[]} The array of supported currency exchange rates
 */
function findSupportedRates(supportedPairs, ratesSnapshot) {
  const supportedPairsSnapshot = [];
  ratesSnapshot.forEach(rate => {
    supportedPairs.forEach(pair => {
      if(areEqualShallow(rate.ccyPair, pair)) {
        supportedPairsSnapshot.push(rate);
      }
    })
  })
  return supportedPairsSnapshot;
}

/**
 * 
 * @param {*} a The first object to compare
 * @param {*} b The second object to compare
 * 
 * @return {Boolean} True if the two objects contain the same properties, False otherwise
 */
function areEqualShallow(a, b) {
  for(var key in a) {
      if(a[key] !== b[key]) {
          return false;
      }
  }
  return true;
}