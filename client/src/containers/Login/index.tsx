import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginAct } from '@reducer/user/actions'
import { StoreState } from '@reducer/index'

export default function Login() {
  const dispatch = useDispatch()
  const { token } = useSelector((state: StoreState) => ({
    token: state.user.token
  }))

  useEffect(() => {
    dispatch(loginAct())
  }, [dispatch])

  return null
}
