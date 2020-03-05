import CryptoJS from 'crypto-js';
import { AES_PRIVATE_KEY } from '@/constants/app';
import _ from 'lodash';

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
 * base64图片转文件
 * @param base64Image base64图片
 * @param filename 文件名
 */
export const base64ToFile = (base64Image: string, filename) => {
  const imageSplit: any = base64Image.split(',');
  const mime = imageSplit[0].match(/:(.*?);/)[1];
  const blobImage = atob(imageSplit[1]);
  let size = blobImage.length;
  const u8arr = new Uint8Array(size);
  while (size--) {
    u8arr[size] = blobImage.charCodeAt(size);
  }
  return new File([u8arr], filename, { type: mime });
};

/**
 * AES 加密内容 和 服务端加密结果相同
 * @param message 明文
 */
export const aesEncode = (message: string) => {
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
export const aesDecode = (cipherMessage: string) => {
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
 * 判断是否为空
 * @param value
 */
export const isEmpty = value => {
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
 * 将树形变为list
 * @param {数据} menus
 */
export const flatMenuTree = (menus: Array<any>) => {
  let values: any[] = [];
  menus &&
    menus.forEach((item: any) => {
      values.push(item);
      if (item.children) {
        values = values.concat(flatMenuTree(item.children));
      }
    });
  return values;
};

/**
 * 将树形变和路径相同
 * @param {menus} 菜单数组
 * @param {pathname} 路径
 */
export const menuKeysPathName = (menus: Array<any>, pathname: string) => {
  const menuData = flatMenuTree(menus);
  return menuData.filter((item: any) => item.path === pathname).map((item: any) => item.key);
};

/**
 * 获取对应的数组集合
 * @param menus 菜单数组
 * @param pathname 路径
 */
export const menuItemPathname = (menus: Array<any>, pathname: string) => {
  const menuData = flatMenuTree(menus);
  return menuData.filter((item: any) => item.path === pathname);
};

/**
 * 获取对应的菜单
 * @param menus 菜单数组
 * @param key 主键
 */
export const menuItemKey = (menus: Array<any>, key: string) => {
  const menuData = flatMenuTree(menus);
  return _.first(menuData.filter((item: any) => item.key === key));
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
