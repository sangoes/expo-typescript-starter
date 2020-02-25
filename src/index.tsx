import React from 'react';
import { dva } from './utils/dva';
import Router from './router';
import * as models from '@/models';

/**
 * dva
 */
const dvaApp = dva({
  initialState: {},
  models: Object.values(models),
  extraReducers: {},
  onError(e: any) {
    console.error('onError', e);
  },
  onAction: [],
});

const App = dvaApp.start(<Router />);

export default App;
