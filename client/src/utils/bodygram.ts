import ajax from './ajax'
import { BODYGRAM_API_KEY } from '@src/appConfig'

const bodybankConfig = {
  graph_ql_endpoint: 'https://2uqrhjzmpredrbsfubrw5wbgpu.appsync-api.ap-northeast-1.amazonaws.com/graphql',
  graph_ql_region: 'ap-northeast-1',
  bucket_name: 'bodybank-enterprise-kao-dev-estimation-data-bucket',
  bucket_region: 'ap-northeast-1',
  id_pool_id: 'ap-northeast-1:9721e115-6714-47f4-b643-bd626055e4b6',
  id_pool_region: 'ap-northeast-1',
  encryption_key: '6ccd34fe-2a11-4df6-ad5c-25d831fd5110'
}

const BODYGRAM_API_PATH = '/bodygram/token'
const bodybank = new window.BodyBankEnterprise()
const tokenProvider = bodybank.getDefaultTokenProvider()

tokenProvider.restoreTokenBlock = async (): Promise<any> => {
  const headers = {
    'x-api-key': BODYGRAM_API_KEY
  }
  try {
    const res = await ajax.get(BODYGRAM_API_PATH, { headers })
    if (res.status === 200) {
      const jwt_token = res.data.content.token.jwt_token
      const identity_id = res.data.content.token.identity_id
      return bodybank.genBodyBankToken(jwt_token, identity_id)
    }
  } catch (err) {
    const error = new Error(`Failed to fetch bodybank token.\nreason: ${err.message}`)
    throw error
  }
}

export const initializeBodybank = (): Promise<any> => {
  return bodybank.initialize(tokenProvider, bodybankConfig)
}

export default bodybank
