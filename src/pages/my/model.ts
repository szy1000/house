import {getInfoReq, logoutReq} from './service'

export default {
  namespace: 'my',
  state: {
    init: false,
    data: {},
  },
  effects: {
    * getInfo({params, callback}, {call, put}) {
      const res = yield call(getInfoReq, params)
      if (res) {
        yield put({
          type: 'save',
          payload: {
            ...res
          }
        })
        callback && callback()
      }
    },
    * logout({params, callback}, {call}) {
      const res = yield call(logoutReq, params);
      if(res) {
        callback && callback()
      }
    }

  },
  reducers: {
    save(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
}
