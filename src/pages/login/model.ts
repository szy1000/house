import {loginByPasswordReq} from './service'
import {setItem} from "@/utils/localstorage";
import {TOKEN} from "@/constants";

export default {
  namespace: 'login',
  state: {
    init: false,
    data: {
      username: 'xxx'
    },
  },
  effects: {
    *loginByPsd({params, callback}, {call, put}) {
      const res = yield call(loginByPasswordReq, params)
      if(res) {
        setItem(TOKEN, res.token)
        yield put({
          type: 'save',
          payload: {
            ...res
          }
        })
        callback && callback()
      }

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
