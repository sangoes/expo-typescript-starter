// @ts-ignore
import { create } from 'dva-core';
// @ts-ignore
import createLoading from 'dva-loading';
// @ts-ignore
import immer from 'dva-immer';
import { createLogger } from 'redux-logger';
import { Action, Dispatch, Reducer, ReducersMapObject } from 'redux';

let app: {
  use: (arg0: { onError(err: any): void }) => void;
  model: (arg0: any) => any;
  start: () => void;
  _store: { dispatch: any };
  getStore: () => { dispatch: any };
  dispatch: any;
};

let store: { dispatch: any };

let dispatch;

let registered: boolean;

function createApp(opt: any) {
  // redux 的日志
  opt.onAction = [createLogger()];
  app = create(opt);
  app.use(immer());
  app.use(createLoading());
  app.use({
    onError(err: any) {
      console.log('dvaError', err);
    },
  });
  if (!registered) {
    opt.models.forEach((model: any) => app.model(model));
  }
  registered = true;
  app.start();
  store = app._store;
  app.getStore = () => store;
  dispatch = store.dispatch;
  app.dispatch = dispatch;
  if (global) {
    global.dva_app = app;
  }
  return app;
}

export default {
  createApp,
  getDispatch() {
    return app.dispatch;
  },
};

export interface EffectsCommandMap {
  put: <A extends Action>(action: A) => any;
  call: Function;
  select: Function;
  take: Function;
  cancel: Function;
  [key: string]: any;
}
export interface EffectsMapObject {
  [key: string]: Effect | EffectWithType;
}
export interface ReducerEnhancer {
  (reducer: Reducer<any>): void;
}
export interface SubscriptionAPI {
  dispatch: Dispatch<any>;
}
export type ActionWithPayload = { action: Action; payload: any };
export type EffectType = 'takeEvery' | 'takeLatest' | 'watcher' | 'throttle';
export type EffectWithType = [Effect, { type: EffectType }];
export type Effect = (action: ActionWithPayload, effects: EffectsCommandMap) => void;
export type ReducersMapObjectWithEnhancer = [ReducersMapObject, ReducerEnhancer];
export type Subscription = (api: SubscriptionAPI, done: Function) => void;
export interface SubscriptionsMapObject {
  [key: string]: Subscription;
}
/**
 * @description Model
 * @author jerry.c
 * @export
 * @interface Model
 */
export interface Model {
  namespace: string;
  state?: any;
  reducers?: ReducersMapObject | ReducersMapObjectWithEnhancer;
  effects?: EffectsMapObject;
  subscriptions?: SubscriptionsMapObject;
}
/**
 * @description Options
 * @author jerry.c
 * @export
 * @interface Options
 */
export interface Options {
  models: Model[];
  extraReducers: any;
  initialState: any;
  onError: (e: any) => void;
  onAction: any[];
}
