import React from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'
import useAuth from '@src/hooks/useAuth'

export default function(props: RouteProps) {
  const isAuthed = useAuth()
  return isAuthed ? <Route {...props} /> : <Redirect to='/' />
}
