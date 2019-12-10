import React, { memo } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { routePath } from '@src/appConfig'
import useAccount from '@src/hooks/useAccount'

export default memo(function NoneAccountRoute(props: RouteProps) {
  const { userChecked, isAccount } = useAccount()
  if (!userChecked) return <Route {...props} />
  return isAccount ? <Redirect to={routePath.weightSetting} /> : <Route {...props} />
})
