import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, Redirect } from 'react-router-dom'
import { loginAct } from '@reducer/user/actions'
import { StoreState } from '@reducer/index'
import { acceptPath, routePath } from '@src/appConfig'
import Spinner from '@components/spinner'

const REDIRECT_KEY = '__h_redirect__'

export default function Login() {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const [redirect, setRedirect] = useState<string | undefined>()

  const { profile, token, userChecked } = useSelector((state: StoreState) => ({
    token: state.user.token,
    userChecked: state.user.userChecked,
    profile: state.user.profile
  }))

  const setRedirectPath = useCallback(() => {
    if (acceptPath.indexOf(pathname) !== -1) {
      localStorage.setItem(REDIRECT_KEY, pathname)
    } else {
      localStorage.setItem(REDIRECT_KEY, '/')
    }
  }, [pathname])

  // first time visit alway trigger login action
  useEffect(() => {
    if (!token) {
      // set redirect path
      !localStorage.getItem(REDIRECT_KEY) && setRedirectPath()
      dispatch(loginAct())
    }
  }, [dispatch, token, setRedirectPath])

  // not registered account redirecting to info setting page
  useEffect(() => {
    if (userChecked && !profile && pathname !== routePath.infoSetting) {
      setRedirect(routePath.infoSetting)
    } else {
      setRedirect(undefined)
    }
  }, [dispatch, userChecked, profile, pathname])

  const renderElement = redirect ? <Redirect to={redirect} /> : null

  return !userChecked ? <Spinner /> : renderElement
}
