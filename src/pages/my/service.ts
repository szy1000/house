import Https from '@/utils/https'

export const getInfoReq = (data) => Https.get('/user/getInfo', data)

export const logoutReq = (data) => Https.post('/user/logout', data)
