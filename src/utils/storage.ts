import { aesDecode, aesEncode } from './tools';
import { AsyncStorage } from 'react-native';

/**
 *  提前3分钟过期token
 */
const shiftTime = 180000;

/**
 * @description 存储接口 带加密加密
 * @author 驷爺.JC
 * @date 2019-10-14
 * @interface IStorageItem
 */
export interface IStorageItem {
  data: object;
  time: Date;
  expire: number;
}

/**
 * @description 存储
 * @author 驷爺.JC
 * @date 2019-10-14
 * @export
 * @class Storage
 */
export default class Storage {
  /**
   * @description 设置key value expire
   * @key key
   * @value 值
   * @expire 过期时间(毫秒) 0代表用不过期
   * @memberof Storage
   */
  public static setItem = (key: string, value: any, expire?: number) => {
    const obj = {
      data: value,
      time: Date.now(),
      expire: expire || 0,
    };
    // 保存
    return AsyncStorage.setItem(key, aesEncode(JSON.stringify(obj)));
  };

  /**
   * @description 获取value 过期清空
   * @memberof Storage
   */
  public static getItem = (key: string) => {
    return AsyncStorage.getItem(key).then(val =>
      val !== null ? JSON.parse(aesDecode(val)).data : null,
    );
  };

  /**
   * @description 移除
   * @static
   * @memberof Storage
   */
  public static removeItem = (key: string) => {
    return AsyncStorage.removeItem(key);
  };

  public static clear = () => {
    return AsyncStorage.clear();
  };

  /**
   * @description 是否过期
   * @static
   * @memberof Storage
   */
  public static isTokenExpired = (key: string) => {
    return AsyncStorage.getItem(key)
      .then(val => JSON.parse(aesDecode(val)))
      .then(val =>
        val.expire > 0 && Date.now() - val.time + shiftTime > val.expire ? true : false,
      );
  };
}
