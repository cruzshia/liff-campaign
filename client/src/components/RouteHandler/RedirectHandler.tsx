import React, { memo, useCallback, useEffect } from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import { routePath, acceptPath } from '@src/appConfig'
import { REDIRECT_KEY } from '@src/appConfig/storageKey'
import useAccount from '@src/hooks/useAccount'

export default memo(function RedirectHandler() {
  const { userChecked, profile } = useAccount()
  const location = useLocation()
  const hasProfile = !!profile
  const isRightRoute = acceptPath.indexOf(location.pathname) !== -1
  let redirectPath = localStorage.getItem(REDIRECT_KEY)

  const setRedirectPath = useCallback(() => {
    if (acceptPath.indexOf(location.pathname) !== -1) {
      localStorage.setItem(REDIRECT_KEY, location.pathname)
    } else {
      localStorage.setItem(REDIRECT_KEY, routePath.register)
    }
  }, [location.pathname])

  /* if user didn't login to line yet, cache redirect path,
   * so we can route to right path after line login redirect back to our site
   */
  useEffect(() => {
    !userChecked && !localStorage.getItem(REDIRECT_KEY) && setRedirectPath()
  }, [userChecked, setRedirectPath])

  /** if user has logged in, remove cached redirect route */
  useEffect(() => {
    hasProfile && localStorage.removeItem(REDIRECT_KEY)
  }, [hasProfile])

  redirectPath = redirectPath || routePath.register
  /** if user visited page not exists, redirect back to cache route or first entry */
  if (userChecked && !isRightRoute) {
    localStorage.removeItem(REDIRECT_KEY)
    return <Redirect to={redirectPath} />
  }
  return null
})
