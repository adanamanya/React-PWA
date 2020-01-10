import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from '../../saga/store';
import HomePages from './HomePages';

export default () => (
  <Provider store={store}>
    <HomePages />
  </Provider>
);
