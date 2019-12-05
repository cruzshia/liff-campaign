import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { loginAct } from '@reducer/user/actions'
import { StoreState } from '@reducer/index'
import { routePath } from '@src/appConfig'

export default function Login() {
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const { profile, token, userChecked } = useSelector((state: StoreState) => ({
    token: state.user.token,
    userChecked: state.user.userChecked,
    profile: state.user.profile
  }))

  // first time visit alway trigger login action
  useEffect(() => {
    !token && dispatch(loginAct())
  }, [dispatch, token])

  // login redirect if in login path
  const isLoginRedirect = userChecked && token && location.pathname === '/'
  useEffect(() => {
    isLoginRedirect && history.push(profile ? routePath.waistSizeInput : routePath.infoSetting)
  }, [isLoginRedirect, history, profile])

  return null
}
