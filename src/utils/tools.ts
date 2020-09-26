import { AES_PRIVATE_KEY } from '@/constants/app';
import _ from 'lodash';
import CryptoJS from 'crypto-js';

/**
 * 判断对象是否为空
 * null或{} 返回false
 * @param obj 对象
 */
export const isEmptyObject = (obj: any) => {
  for (var key in obj) {
    return false;
  }
  return true;
};

/**
 * 判断是否为空
 * @param value
 */
export const isEmpty = (value: any) => {
  if (
    value == null ||
    value == '' ||
    value == 'undefined' ||
    value == undefined ||
    value == 'null'
  ) {
    return true;
  } else {
    value = value.replace(/\s/g, '');
    if (value == '') {
      return true;
    }
    return false;
  }
};

/**
 * AES 加密内容 和 服务端加密结果相同
 * @param message 明文
 */
export const aesEncode = (message: any) => {
  const msg = CryptoJS.enc.Utf8.parse(message);
  const key = CryptoJS.enc.Utf8.parse(AES_PRIVATE_KEY);
  const encode = CryptoJS.AES.encrypt(msg, key, {
    iv: key,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });

  return encode.ciphertext.toString();
};

/**
 * Aes解密
 * @param cipherMessage 密文
 */
export const aesDecode = (cipherMessage?: any) => {
  let msg = CryptoJS.enc.Hex.parse(cipherMessage);
  const key = CryptoJS.enc.Utf8.parse(AES_PRIVATE_KEY);
  msg = CryptoJS.enc.Base64.stringify(msg);
  const decode = CryptoJS.AES.decrypt(msg, key, {
    iv: key,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decode.toString(CryptoJS.enc.Utf8);
};

/**
 * sha256加密
 * @param message 明文
 */
export const SHA1 = (message: string) => {
  return CryptoJS.SHA1(message).toString();
};

/**
 * base64 加密
 * @param message  明文
 */
export const Base64Encode = (message: string) => {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(message));
};

/**
 * base64解密
 * @param encodedMessage 密文
 */
export const Base64Decode = (encodedMessage: string) => {
  return CryptoJS.enc.Base64.parse(encodedMessage).toString(CryptoJS.enc.Utf8);
};

/**
 * 网站表达式
 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

/**
 * 是否为网址
 * @param path 路径
 */
export const isUrl = (path: string): boolean => reg.test(path);

/**
 * 转换大小
 * @param limit
 */
export const convertSize = (limit: number) => {
  let size = '';
  if (limit < 0.1 * 1024) {
    //如果小于0.1KB转化成B
    size = limit.toFixed(2) + 'B';
  } else if (limit < 0.1 * 1024 * 1024) {
    //如果小于0.1MB转化成KB
    size = (limit / 1024).toFixed(2) + 'KB';
  } else if (limit < 0.1 * 1024 * 1024 * 1024) {
    //如果小于0.1GB转化成MB
    size = (limit / (1024 * 1024)).toFixed(2) + 'MB';
  } else {
    //其他转化成GB
    size = (limit / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
  }

  var sizestr = size + '';
  var len = sizestr.indexOf('.');
  var dec = sizestr.substr(len + 1, 2);
  if (dec == '00') {
    //当小数点后为00时 去掉小数部分
    return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
  }
  return sizestr;
};

/**
 * ellipsis
 * @param text
 * @param limit
 */
export const ellipsisString = (text: string, limit = 8) => {
  if (text.length > limit) {
    return text.substring(0, limit) + '....';
  }
  return text;
};
