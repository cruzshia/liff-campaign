export const API_PATH: string = '/api'
export const ASSET_ROOT: string = '/assets'
export const ASSET_IMAGES_ROOT: string = `${ASSET_ROOT}/images`
export const trackingId = 'UA-104193067-3'

export const assetImages = {
  common: `${ASSET_IMAGES_ROOT}/common`,
  ui: `${ASSET_IMAGES_ROOT}/ui`,
  uploads: `${ASSET_IMAGES_ROOT}/_uploads`,
}

export const IMAGE_LIST_SIZE: number = 12
export const ARTICLE_LIST_SIZE: number = 12
export const COMMON_TABLE_ROW_SIZE: number = 10
export const COMMON_PREVIEW_LIST_SIZE: number = 4
export const RECOMMEND_ARTICLES_LIMIT: string = `60`
export const AMANA_IMAGES_CODE: string = 'fLrxSs9f3r'
export const PREFIX_PATH_AMAZON_S3 = 'https://s3-ap-northeast-1.amazonaws.com'
export const API_PATH_IMAGE_PREVIEW_URL = '/static.amanaimages.com/imgroom/rf_preview640'
export const API_PATH_IMAGE_THUMBNAIL_URL = '/static.amanaimages.com/imgroom/rf_thumb200'

export const INTERCOM_SETTINGS = {
  app_id: 'hy7ufw5p',
}

export const routePath = {
  account: '/account',
  article: '/article',
  articleDetail: '/article/:id',
  cart: '/cart',
  image: '/image',
  login: '/login',
  resetPassword: '/forget-password',
  imageDetail: '/image/:id',
  purchaseHistory: '/purchaseHistory',
  purchaseHistoryDetail: '/purchaseHistory/:id',
  knowledgeDetail: '/knowledgeDetail/:keyword',
  profile: '/profile',
  root: '/',
  strategy: '/strategy',
  contentAnalytics: '/content-analytics',
  maximize: '/#maximize',
  insight: '/#insight',
}

export const adminRoutePath = {
  dashboard: '/',
  customers: '/customers',
  customerDetail: '/customer/:id',
  articles: '/articles',
  articleDetail: '/article/:id',
  publishers: '/publishers',
  writerList: '/publisher/:groupId/medium/:mediumId/writers',
  writerDetail: '/publisher/:groupId/medium/:mediumId/writer/:writerId',
  publisherDetail: '/publisher/:id',
  media: '/publisher/:groupId/media',
  mediumDetail: '/publisher/:groupId/medium/:mediumId',
  orders: '/orders',
  orderContentList: '/order/:id',
  orderContentDetail: '/order/:orderId/content/:orderContentId',
  managers: '/managers',
  strategySettingList: '/customer/:groupId/strategy-settings',
  strategySettingDetail: '/customer/:groupId/strategy-setting/:id',
  strategySettingDetailLatest: '/customer/:groupId/strategy-setting/latest',
  analytics: '/customer/:groupId/analytics',
}
