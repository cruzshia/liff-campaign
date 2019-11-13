import { Dispatch } from 'redux'

import { http, HttpResponse } from '../utils/http'
import { EstimationParameter } from '../models/bodygram'

const bodybankConfig = {
  "graph_ql_endpoint": "https://2uqrhjzmpredrbsfubrw5wbgpu.appsync-api.ap-northeast-1.amazonaws.com/graphql",
  "graph_ql_region": "ap-northeast-1",
  "bucket_name": "bodybank-enterprise-kao-dev-estimation-data-bucket",
  "bucket_region": "ap-northeast-1",
  "id_pool_id": "ap-northeast-1:9721e115-6714-47f4-b643-bd626055e4b6",
  "id_pool_region": "ap-northeast-1",
  "encryption_key": "6ccd34fe-2a11-4df6-ad5c-25d831fd5110"
}

interface IncomingParams {
  readonly jwt_token: string
  readonly identity_id: string
}

interface IncomingToken {
  readonly token: IncomingParams
}

interface IncomingResponseBody {
  readonly content: IncomingToken
  readonly error: any
}


declare global {
  interface Window { BodyBankEnterprise: any; }
}

const API_PATH = '/bodygram/token'
const bodybank = new window.BodyBankEnterprise

export const getBodyGramToken = () => async (dispatch: Dispatch) => {
  const tokenProvider = bodybank.getDefaultTokenProvider()

  tokenProvider.restoreTokenBlock = async () => {
    try {
      const res: HttpResponse<IncomingResponseBody> = await http.get(API_PATH, {'x-api-key': 'test'}, {})
      if (res.status === 200) {
        const jwt_token = res.data.content.token.jwt_token
        const identity_id = res.data.content.token.identity_id

        console.log(jwt_token)
        console.log(identity_id)
        return bodybank.genBodyBankToken(jwt_token, identity_id)
      }
    } catch (err) {
      const error = new Error(`Failed to fetch bodybank token.\nreason: ${err.message}`)

      throw error
    }
  }

  bodybank.initialize(tokenProvider, bodybankConfig)
  console.log(bodybank)
}

export const callCreateEstimationRequest = (param: EstimationParameter) => async (dispatch: Dispatch) => {
  let bodybankGender

  switch (param.gender) {
    case 'male':
      bodybankGender = bodybank.Gender.male
      break;
    case 'female':
      bodybankGender = bodybank.Gender.female
      break;
    case 'none':
      bodybankGender = null
      break;
    default:
      throw new Error('Unexpected gender.')
  }

  const estimationParameter = {
    ...param,
    gender: bodybankGender,
  }
  console.log(estimationParameter)

  const callback = ({ request, errors }: any) => {
    if (errors && errors.length) {
      // エラーハンドリング
      errors.forEach((error: any) => {
        console.log(error)
      })

      return
    }

    if (!request) {
      throw new Error('Request should be returned after creation completed.')
    }

    console.log(request)
    console.log(request.id) // requestId
    console.log(request.user_id) // userId
    if (request.id) {
      setTimeout(() => {getEstimationRequest(request.id)}, 1000)
    }
  }

  console.log(bodybank)
  bodybank.createEstimationRequest({ estimationParameter, callback })
}

function getEstimationRequest(requestId: string) {
  bodybank.getEstimationRequest({
    id: requestId,
    callback: ({ request, errors }: any) => {
      if (errors && errors.length) {
        // エラーハンドリング
        errors.forEach((error: any) => {
          console.log(error)
        })

        return
      }

      if (!request) {
        throw new Error('Request should exist.')
      }

      console.log(request)
      if (request.frontImage) {
        const urlPromise = request.frontImage.downloadableURL
        urlPromise.then((res: any) => {
          //const image = document.getElementById("front-image")
          //image.src = res
          console.log(res)
        })
      }
    }
  })
}