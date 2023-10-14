import {queryDataReq} from './service'

export default {
  namespace: 'home',
  state: {
    init: false,
    data: {
      username: 'xxx'
    },
    city: [
      {label: '南京', value: '001'},
      {label: '杭州', value: '002'},
      {label: '无锡', value: '003'},
    ]
  },
  effects: {
    *pageInit({params}, {call, put}) {
      const res = yield call(queryDataReq, params)
      yield put({
        type: 'save',
        payload: {
          ...res
        }
      })
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
