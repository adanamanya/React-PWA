import { call, put, takeLatest, select } from 'redux-saga/effects';

import {
  SEARCH_FURNITURE,
  REQUEST_FURNITURE_LIST,
  receiveFurnitureList,
  FILTER_BY_STYLE,
  FILTER_BY_DELIVERY,
} from './actions';
import { fetchData } from '../constants/api';

function* getFurnitureData(action) {
  try {
    const data = yield call(fetchData);
    yield put(receiveFurnitureList(data));
  } catch (e) {
    console.log(e);
  }
}

function* searchFurniture({ payload }) {
  const data = [];
  console.log('jalandong filter nya', payload);
  const datatohandle = yield select(state => state.data);
  if (datatohandle !== null || datatohandle !== undefined) {
    // console.log(datatohandle, 'nyoba duls ada isi apa ngga');
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
    console.log(data, 'filterresults');
    yield put(receiveFurnitureList(data[0]));
  } else {
    console.log('nodata to process');
  }
}

function* filterbyStyle({ payload }) {
  const data = [];
  const filters = payload.filterstyle;
  console.log(filters, 'detekpayload');
  const datatohandle = yield select(state => state.data);
  if (filters !== null || filters !== undefined) {
    let filteredData = datatohandle.products.filter(o =>
      _.isMatch(o.furniture_style, filters),
    );
    console.log(filteredData, 'result');
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
  console.log('jalandong filterbyDelivery nya', payload);
}

export default function* mySaga() {
  yield takeLatest(REQUEST_FURNITURE_LIST, getFurnitureData);
  yield takeLatest(SEARCH_FURNITURE, searchFurniture);
  yield takeLatest(FILTER_BY_STYLE, filterbyStyle);
  yield takeLatest(FILTER_BY_DELIVERY, filterbyDelivery);
}
