const {
  REACT_APP_API_HOST,
  REACT_APP_LIFF_ID,
  REACT_APP_AMAZON_S3_API,
  REACT_APP_BODYGRAM_API_KEY,
  REACT_APP_DISABLE_DEV_TOKEN,
  NODE_ENV
} = process.env
export const API_HOST: string = REACT_APP_API_HOST || ''
export const API_PATH: string = '/api/v1'

export const BODYGRAM_API_KEY = REACT_APP_BODYGRAM_API_KEY || 'fgJxmvnLtz511hWFJeKia3jUmevOIVau8F37cYm2'

export const PREFIX_PATH_AMAZON_S3 = REACT_APP_AMAZON_S3_API || 'https://s3-ap-northeast-1.amazonaws.com'

export const LIFF_ID = REACT_APP_LIFF_ID || '1653573972-GMOV2QQK'

export const isDev = NODE_ENV !== 'production' && REACT_APP_DISABLE_DEV_TOKEN !== 'true'
export const routePath = {
  register: '/register',
  weightSetting: '/weight_setting',
  measurement: '/measurement',
  waistSizeInput: '/waist_size_input',
  cameraInput: '/camera',
  infoSummary: '/info_summary',
  termOfUse: '/term_of_use',
  cameraTutorial: '/camera_tutorial',
  myPage: {
    profile: '/profile',
    profileSummary: '/profile_summary'
  }
}

export const acceptPath = (() => {
  const myPagePath = Object.values(routePath.myPage)
  return Object.values(routePath)
    .filter(path => typeof path === 'string')
    .concat(myPagePath)
})()
