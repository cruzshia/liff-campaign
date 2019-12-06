import React from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'
import useAuth from '@src/hooks/useAuth'

export default function AuthRoute(props: RouteProps) {
  const isAuthed = useAuth()
  return isAuthed ? <Route {...props} /> : <Redirect to='/' />
}
