import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loginAct } from '../../reducer/user/actions'

export default function Login() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loginAct())
  }, [dispatch])

  return <div>login</div>
}
