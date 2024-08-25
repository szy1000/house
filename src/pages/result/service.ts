import Https from '@/utils/https'

export const queryAnalysisReq = (data) => Https.post('/blade-resource/bn-tools/analysis', data, true)
