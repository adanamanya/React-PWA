/* eslint-disable linebreak-style */
import React from 'react';
import { Provider } from 'react-redux';

import store from '../../saga/store';
import CardList from './CardList';

export default () => (
  // eslint-disable-next-line react/jsx-filename-extension
  <Provider store={store}>
    <CardList />
  </Provider>
);
