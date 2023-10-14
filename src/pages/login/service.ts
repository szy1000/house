import Https from '@/utils/https'

export const loginByPasswordReq = (data) => Https.post('/user/login', data)
