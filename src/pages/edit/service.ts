import Https from '@/utils/https'

export const queryDataReq =(params) => Https.get('/user/getInfo', params)
