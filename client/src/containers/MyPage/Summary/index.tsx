import React from 'react'
import SummaryMain from './SummaryMain'
import { useSelector } from 'react-redux'
import { StoreState } from '@reducer/index'

export default function Summary() {
  const profile = useSelector((store: StoreState) => store.user.profile)
  return <SummaryMain offalFat={(profile && profile.offalFat) || null} />
}
