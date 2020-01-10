import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from '../../saga/store';
import CardList from './CardList';

export default () => (
  <Provider store={store}>
    <CardList />
  </Provider>
);
