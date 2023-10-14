import Https from '@/utils/https'

export const queryDataReq =(params) => Https.get('/user/getInfo', params)
export const updateInfoDataReq =(params) => Https.post('/user/edit', params, true)
