import {request} from 'umi'

export const queryDataReq =(params) => request('/api/', {
  params
})
