import {queryDataReq,updateInfoDataReq} from './service'
import {Toast} from "antd-mobile";
import {history} from 'umi'

export default {
  namespace: 'edit',
  state: {},
  effects: {
    * pageInit({params, callback}, {call, put}) {
      const res = yield call(queryDataReq, params)
      if (res) {
        callback && callback(res)
        yield put({
          type: 'save',
          payload: {
            ...res
          }
        })
      }
    },
    *updateInfo({params}, {call}) {
      const res = yield call(updateInfoDataReq, params)
      if(res.status ===  200) {
        Toast.show({
          content: '修改成功',
        })
        history.replace('/my')
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
