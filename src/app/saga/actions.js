export const REQUEST_FURNITURE_LIST = 'REQUEST_FURNITURE_LIST';
export const RECEIVE_FURNITURE_LIST = 'RECEIVE_FURNITURE_LIST';
export const SEARCH_FURNITURE = 'SEARCH_FURNITURE';
export const FILTER_BY_STYLE = 'FILTER_BY_STYLE';
export const FILTER_BY_DELIVERY = 'FILTER_BY_DELIVERY';

export const requestFurnitureList = () => ({ type: REQUEST_FURNITURE_LIST });
export const receiveFurnitureList = data => ({
  type: RECEIVE_FURNITURE_LIST,
  data,
});
export const searchFurniture = text => ({
  type: SEARCH_FURNITURE,
  payload: {
    text,
  },
});
export const filterbyStyle = filterstyle => ({
  type: FILTER_BY_STYLE,
  payload: {
    filterstyle,
  },
});
export const filterbyDelivery = deliverytime => ({
  type: FILTER_BY_DELIVERY,
  payload: {
    deliverytime,
  },
});
