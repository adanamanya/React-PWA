export const REQUEST_FURNITURE_LIST = 'REQUEST_FURNITURE_LIST';
export const RECEIVE_FURNITURE_LIST = 'RECEIVE_FURNITURE_LIST';

export const requestFurnitureList = () => ({ type: REQUEST_FURNITURE_LIST });
export const receiveFurnitureList = data => ({
  type: RECEIVE_FURNITURE_LIST,
  data,
});
