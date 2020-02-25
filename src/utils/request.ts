import { TOKEN_SESSION } from '@/constants/app';
import NavigationService from '@/utils/navigationService';
import Storage from '@/utils/storage';
import { createAction } from '@/utils';

export const IS_DEV = process.env.NODE_ENV === 'development';

export const BASE_URL = IS_DEV ? 'http://server.nickms.com' : 'http://server.nickms.com';

/**
 * code 对应
 */
const codeMessage = [
  { 200: '服务器成功返回请求的数据。' },
  { 201: '新建或修改数据成功。' },
  { 202: '一个请求已经进入后台排队（异步任务）。' },
  { 204: '删除数据成功。' },
  { 400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。' },
  { 401: '用户没有权限（令牌、用户名、密码错误）。' },
  { 403: '用户得到授权，但是访问是被禁止的。' },
  { 404: '发出的请求针对的是不存在的记录，服务器没有进行操作。' },
  { 406: '请求的格式不可得。' },
  { 410: '请求的资源被永久删除，且不会再得到的。' },
  { 422: '当创建一个对象时，发生一个验证错误。' },
  { 500: '服务器发生错误，请检查服务器。' },
  { 502: '网关错误。' },
  { 503: '服务不可用，服务器暂时过载或维护。' },
  { 504: '网关超时。' },
];

/**
 * 检查状态码
 * @param response
 */
const checkStatus = (response: any) => {
  // 不拦截
  if (response.code >= 200 && response.code < 300) {
    return response;
  }
  // 格式化text
  const msg = response.msg || response.message || codeMessage[response.code];
  // 错误
  const error = new Error(msg);
  error.name = response.code;
  error.message = msg;
  throw error;
};
/**
 * @description 请求主体
 * @author jerrychir
 * @export
 * @param {*} url
 * @param {*} option
 */
export default async function request(url: any, option?: any) {
  // 参数
  const options = { ...option };
  const defaultOptions = { credentials: 'include' };
  const newOptions = { ...defaultOptions, ...options };
  // Authorization 授权
  const storeToken = await Storage.getItem(TOKEN_SESSION);
  // header是否有Authorization
  const hasAuthorization = option && option.headers && option.headers.Authorization;
  if (!hasAuthorization && storeToken) {
    // 判断验证码是否过期 刷新token
    if (Storage.isTokenExpired(TOKEN_SESSION)) {
      // 调用刷新接口刷新token TODO: 后期利用 async await 方法解决不用在 model layout中判断
      // window.g_app._store.dispatch(createActions(REFRESH_TOKEN)(storeToken.refreshToken)(() => {}));
      // NavigationService.dispatch(createAction(REFRESH_TOKEN)(storeToken.refreshToken));
    }
    // 加入Authorization
    newOptions.headers = { Authorization: `Bearer ${storeToken.token}` };
  }
  // 请求方法判断
  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'DELETE'
  ) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }
  // console.log(`${BASE_URL}${url}`);

  return fetch(`${BASE_URL}${url}`, newOptions)
    .then(response => {
      return response.json();
    })
    .then(checkStatus)
    .catch(e => {
      const status = e.name;
      const msg = e.message;
      // 401请登录或token为空
      if (status === 401 || msg === 'token_empty') {
        // 登录页
        NavigationService.navigate('LoginPage');
        return;
      }
      // token_expired TODO: token过期展示不展示
      if (msg === 'token_expired') {
        return;
      }
      // 显示
      // ToastAndroid.show(msg, ToastAndroid.SHORT);
    });
}
