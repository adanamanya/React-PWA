import {
  call,
  put,
  takeLatest,
  select,
  fork,
  takeEvery,
  cancel,
  race,
} from 'redux-saga/effects';
import { delay } from 'redux-saga';

import {
  SEARCH_FURNITURE,
  REQUEST_FURNITURE_LIST,
  receiveFurnitureList,
  FILTER_BY_STYLE,
  FILTER_BY_DELIVERY,
  RECEIVE_FURNITURE_LIST,
} from './actions';
import { fetchData } from '../constants/api';
const _ = require('lodash');

function* getFurnitureData(action) {
  try {
    const getdata = yield call(fetchData);
    let data = [];
    let dataproducts = _.map(getdata.products, function(element) {
      if (element.delivery_time < 7) {
        return _.extend({}, element, { delivtime: '1 Week' });
      }
      if (element.delivery_time <= 14 && element.delivery_time > 7) {
        return _.extend({}, element, { delivtime: '2 Week' });
      } else {
        return _.extend({}, element, { delivtime: '1 Month' });
      }
    });
    data.push({
      products: dataproducts,
      furniture_styles: getdata.furniture_styles,
    });
    yield put(receiveFurnitureList(data[0]));
  } catch (e) {
    console.log(e);
  }
}

function* searchFurniture({ payload }) {
  const data = [];
  const datatohandle = yield select(state => state.data);
  if (datatohandle !== null || datatohandle !== undefined) {
    const search_string = payload.text.toLowerCase();
    let result = datatohandle.products.filter(o =>
      o.name
        .trim()
        .toLowerCase()
        .includes(search_string),
    );
    data.push({
      products: result,
      furniture_styles: datatohandle.furniture_styles,
    });
    console.log(data[0]);
    yield put(receiveFurnitureList(data[0]));
  } else {
    console.log('nodata to process');
  }
}

function* filterbyStyle({ payload }) {
  yield delay(500);
  let data = [];
  const contains = (a, b) => new Set([...a, ...b]).size === a.length;
  const filters = payload.filterstyle;
  const datatohandle = yield select(state => state.data);
  if (filters !== null || filters !== undefined) {
    let filteredData = datatohandle.products.filter(
      o =>
        // _.includes(o.furniture_style, filters),
        contains(o.furniture_style, filters) ||
        contains(filters, o.furniture_style),
    );
    console.log(filteredData, 'filtered');
    data.push({
      products: filteredData,
      furniture_styles: datatohandle.furniture_styles,
    });
    yield put(receiveFurnitureList(data[0]));
  } else {
    console.log('nodata to process');
  }
}

function* filterbyDelivery({ payload }) {
  let data = [];
  const filters = payload.deliverytime;
  const datatohandle = yield select(state => state.data);
  console.log(filters, 'filternya');
  console.log(datatohandle.products, 'datanya');
  // var posts = [
  //   { term: { name: 'A', process: '123A' } },
  //   { term: { name: 'B', process: '123B' } },
  //   { term: { name: 'C', process: '123C' } },
  // ];

  // var result = _.filterByValues(posts, 'term.process', ['123A', '123C']);
  if (filters !== null || filters !== undefined) {
    let filteredData = _.filter(datatohandle.products, g =>
      _.includes(filters, g.delivtime),
    );
    console.log(filteredData, 'hasilnya');

    data.push({
      products: filteredData,
      furniture_styles: datatohandle.furniture_styles,
    });
    yield put(receiveFurnitureList(data[0]));
  } else {
    console.log('nodata to process');
  }
}

export default function* mySaga() {
  yield takeLatest(REQUEST_FURNITURE_LIST, getFurnitureData);
  yield takeLatest(SEARCH_FURNITURE, searchFurniture);
  yield takeLatest(FILTER_BY_STYLE, filterbyStyle);
  yield takeLatest(RECEIVE_FURNITURE_LIST, receiveFurnitureList);
  yield takeLatest(FILTER_BY_DELIVERY, filterbyDelivery);
}
