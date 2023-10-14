import axios from 'axios'
import {Toast} from 'antd-mobile'

const instance = axios.create({
  baseURL: '/api/v1',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})


const isRepeat = {}

const promiseFun = async (method, url, params, needCode, resolve, reject) => {

  if (isRepeat[url]) {
    return
  }
  isRepeat[url] = true

  instance[method](url, method === 'get' ? {params} : params)
    .then(res => {
      delete isRepeat[url]
      const {status, data, msg} = res.data;
      if (needCode) {
        resolve(res.data);
      } else if (parseInt(status, 10) === 200) {
        resolve(data);
      } else if (parseInt(status, 10) === 401) {
        // removeItem(TOKEN)
        Toast.show({
          icon: 'fail',
          content: '登录已过期，请重新登录！'
        });
        resolve(data);
      } else {
        Toast.show({
          icon: 'fail',
          content: msg
        });
        console.log('error:', JSON.stringify(res.data));
        resolve(data);
      }
    })
    .catch(err => {
      delete isRepeat[url]
      Toast.show({
        content: '网络出现异常，请退出App重新进入。',
      });
      reject({err});
      console.log('err==>', JSON.stringify(err));
      return [];
    });
};

export default class Https {
  static get(url, params = {}, needCode?) {
    return new Promise((resolve, reject) => {
      promiseFun('get', url, params, needCode, resolve, reject);
    });
  }

  static post(url, params = {}, needCode?) {
    return new Promise((resolve, reject) => {
      promiseFun('post', url, params, needCode, resolve, reject);
    });
  }

  static put(url, params = {}, needCode?) {
    return new Promise((resolve, reject) => {
      promiseFun('put', url, params, needCode, resolve, reject);
    });
  }
}
