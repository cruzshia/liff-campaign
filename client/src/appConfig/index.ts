export const API_PATH: string = '/api/v1'

const { REACT_APP_LIFF_ID, REACT_APP_AMAZON_S3_API, NODE_ENV } = process.env
export const PREFIX_PATH_AMAZON_S3 =
  REACT_APP_AMAZON_S3_API || 'https://s3-ap-northeast-1.amazonaws.com'

export const LIFF_ID = REACT_APP_LIFF_ID || '1653573972-GMOV2QQK'

export const isDev = NODE_ENV !== 'production'
export const routePath = {
  root: '/',
  infoSetting:'/info_setting',
  weightSetting:'/weight_setting',
  measurement:'/measurement',
  waistSizeInput:'/waist_size_input',
  cameraInput: '/camera'
}
