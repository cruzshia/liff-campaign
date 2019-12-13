import { routePath } from '@src/appConfig'

export enum PROFILE_TAB {
  SUMMARY = 'summary',
  USERINFO = 'userInfo'
}

export const TAB_OTPNIOS = [
  {
    title: '分析',
    route: routePath.myPage.profileSummary,
    id: PROFILE_TAB.SUMMARY
  },
  {
    title: '個人資料',
    route: routePath.myPage.profile,
    id: PROFILE_TAB.USERINFO
  }
]
