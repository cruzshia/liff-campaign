import React from 'react'
import { Route, useLocation } from 'react-router-dom'

import { routePath } from '@src/appConfig'
import SwitchTab from '@components/SwitchTab'
import UserInfo from './components/UserInfo'
import AnalysisSummary from './components/AnalysisSummary'

export enum PROFILE_TAB {
  SUMMARY = 'summary',
  USERINFO = 'userInfo'
}

const TAB_OTPNIOS = [
  {
    title: '分析',
    route: routePath.myPage.analysisSummary,
    id: PROFILE_TAB.SUMMARY
  },
  {
    title: '個人資料',
    route: routePath.myPage.userInfo,
    id: PROFILE_TAB.USERINFO
  }
]

const MyPageMain = () => {
  const { pathname } = useLocation()
  const selected = pathname === routePath.myPage.userInfo ? PROFILE_TAB.USERINFO : PROFILE_TAB.SUMMARY
  return (
    <div className='h-100vh d-flex flex-column'>
      <SwitchTab tabOptions={TAB_OTPNIOS} selectedID={selected} />
      <Route path={routePath.myPage.analysisSummary} component={AnalysisSummary} />
      <Route path={routePath.myPage.userInfo} component={UserInfo} />
    </div>
  )
}
export default MyPageMain
