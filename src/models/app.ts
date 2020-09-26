import { IAppState } from '@/interface/app';
import { Model } from './dva';

/**
 * app
 */
const NAMESPACE = 'app';
export default {
  namespace: NAMESPACE,
  state: {
    loading: false,
  } as IAppState,
  effects: {},
  reducers: {
    save(state, payload) {
      return {
        ...state,
        ...payload,
      };
    },
    error(state, payload) {
      return {
        ...state,
        error: payload,
      };
    },
  },
  subscriptions: {},
} as Model;
