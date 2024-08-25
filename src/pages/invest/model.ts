import {queryAnalysisReq} from './service'
import {setItem} from "@/utils/localstorage";
import {TOKEN} from "@/constants";

export default {
  namespace: 'invest',
  state: {
    init: false,
    data: {
      username: 'xxx'
    },
  },
  effects: {
    *queryAnalysis({params, callback}, {call, put}) {
      const res = yield call(queryAnalysisReq, params)
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
