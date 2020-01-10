import { RECEIVE_FURNITURE_LIST } from '../saga/actions';

export default (state = {}, { type, data }) => {
  switch (type) {
    case RECEIVE_FURNITURE_LIST:
      return data;
    default:
      return state;
  }
};
