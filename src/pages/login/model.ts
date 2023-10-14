import {loginByPasswordReq} from './service'

export default {
  namespace: 'login',
  state: {
    init: false,
    data: {
      username: 'xxx'
    },
  },
  effects: {
    *loginByPsd({params}, {call, put}) {
      const res = yield call(loginByPasswordReq, params)
      if(res) {

      }
      console.log(res)
      // yield put({
      //   type: 'save',
      //   payload: {
      //     ...res
      //   }
      // })
    }
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
}
