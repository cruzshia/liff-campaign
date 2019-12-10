import React, { memo } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { routePath } from '@src/appConfig'
import useAccount from '@src/hooks/useAccount'

export default memo(function AccountRoute(props: RouteProps) {
  const { userChecked, isAccount } = useAccount()
  if (!userChecked) return <Route {...props} />
  return isAccount ? <Route {...props} /> : <Redirect to={routePath.register} />
})
