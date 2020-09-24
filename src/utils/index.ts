import { wp, hp } from './dimension';

/**
 * 设计宽
 */
export const screenWidth = 960;

/**
 * 设计高
 */
export const screenHeight = 540;

/**
 * 相对宽
 * @param width 设计宽度
 */
export const widthRate = (width: number) => {
  return wp((width / screenWidth) * 100);
};

/**
 * 相对高
 * @param height 设计宽度
 */
export const heightRate = (height: number) => {
  return hp((height / screenHeight) * 100);
};

export { default as _ } from 'lodash';
/**
 * 统一处理action
 * @param {*} type
 */
export const createAction = (type: any) => (payload?: any) => ({
  type,
  payload,
});
/**
 * 统一处理action
 * @param {*} type
 */
export const createActions = (type: any) => (payload?: any) => (callback?: any) => ({
  type,
  payload,
  callback,
});

/**
 * 统一处理action
 * @param {*} type
 */
export const createActioned = (type: any) => (payload?: any) => (callback?: any) => (
  failCallback?: any,
) => ({
  type,
  payload,
  callback,
  failCallback,
});

/**
 * 网络检查
 * @param {*} response
 */
export const check = (response: { code: number }) => response && response.code == 200;

/**
 * MaterialCommunityIcons
 */
export { MaterialCommunityIcons as McIcons } from '@expo/vector-icons';
