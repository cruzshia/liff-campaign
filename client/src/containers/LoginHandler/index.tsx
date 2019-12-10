import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginAct } from '@reducer/user/actions'
import { StoreState } from '@reducer/index'
import Spinner from '@components/spinner'

export default function LoginHandler() {
  const dispatch = useDispatch()

  const { token, userChecked } = useSelector((state: StoreState) => ({
    token: state.user.token,
    userChecked: state.user.userChecked
  }))

  // first time visit alway trigger login action
  useEffect(() => {
    if (!token) {
      dispatch(loginAct())
    }
  }, [dispatch, token])

  return !userChecked ? <Spinner /> : null
}
