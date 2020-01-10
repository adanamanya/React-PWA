import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from '../../saga/store';
import DeliveryTime from './DeliveryTime';
export default () => (
  <Provider store={store}>
    <DeliveryTime />
  </Provider>
);
