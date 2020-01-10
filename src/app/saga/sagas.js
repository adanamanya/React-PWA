import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { REQUEST_FURNITURE_LIST, receiveFurnitureList } from './actions';
import { fetchData } from '../constants/api';

function* getFurnitureData(action) {
  try {
    const data = yield call(fetchData);
    yield put(receiveFurnitureList(data));
  } catch (e) {
    console.log(e);
  }
}
export default function* mySaga() {
  yield takeLatest(REQUEST_FURNITURE_LIST, getFurnitureData);
}
