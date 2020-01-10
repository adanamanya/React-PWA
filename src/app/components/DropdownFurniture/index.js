import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from '../../saga/store';
import FurnitureStyle from './FurnitureStyle';
export default () => (
  <Provider store={store}>
    <FurnitureStyle />
  </Provider>
);
