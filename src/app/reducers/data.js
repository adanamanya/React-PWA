import {
  RECEIVE_FURNITURE_LIST,
  SEARCH_FURNITURE,
  FILTER_BY_STYLE,
  FILTER_BY_DELIVERY,
} from '../saga/actions';

export default (state = {}, { payload, type, data }) => {
  switch (type) {
    case RECEIVE_FURNITURE_LIST:
      return data;
    case SEARCH_FURNITURE:
      const { text } = payload;
      return {
        ...state,
        data: text,
      };
    case FILTER_BY_STYLE:
      const { filterstyle } = payload;
      return {
        ...state,
        data: filterstyle,
      };
    case FILTER_BY_DELIVERY:
      const { deliverytime } = payload;
      return {
        ...state,
        data: deliverytime,
      };
    default:
      return state;
  }
};
