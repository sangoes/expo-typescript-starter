import { TOKEN_SESSION } from '@/constants/app';
import errorCode from '@/constants/errorCode';
import { Toast } from '@ant-design/react-native';
import axios from 'axios';
import Storage from './storage';

export const IS_DEV = process.env.NODE_ENV === 'development';

axios.defaults.baseURL = IS_DEV ? 'http://127.0.0.1' : 'http://www.sangoes.com';

axios.defaults.timeout = 30000;
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true;
// 返回其他状态吗
axios.defaults.validateStatus = (status) => {
  // 默认的
  return status >= 200 && status <= 500;
};

// Add a request interceptor
axios.interceptors.request.use(
  async (config) => {
    // store token
    const storeToken = await Storage.getItem(TOKEN_SESSION);
    if (storeToken) {
      config.headers['Token'] = storeToken;
    }

    // 其他操作
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add a response interceptor
axios.interceptors.response.use(
  async (response) => {
    // 返回码
    const status: any = response.data.status || response.data.code || response.status;
    const message = response.data.msg || response.data.message || errorCode[status];
    // 登录
    if (status === -401) {
      Toast.info(message, Toast.SHORT);
      // 登录页
      // NavigationService.navigate('Login');
      // 清除token
      Storage.removeItem(TOKEN_SESSION);
      return;
    }
    if (status !== 200) {
      Toast.info(message);
      return Promise.reject(new Error(message));
    }
    return response.data;
  },
  (error) => {
    return Promise.reject(new Error(error));
  },
);
export default axios;
