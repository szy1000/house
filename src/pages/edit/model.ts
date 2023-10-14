import {queryDataReq} from './service'

export default {
  namespace: 'edit',
  state: {},
  effects: {
    * pageInit({params}, {call, put}) {
      const res = yield call(queryDataReq, params)
      if (res) {
        yield put({
          type: 'save',
          payload: {
            ...res
          }
        })
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
