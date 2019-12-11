import React from 'react'
import InfoSummaryMain from './infoSummaryMain'
import { useSelector } from 'react-redux'
import { StoreState } from '@reducer/index'

export default function (){
  const profile = useSelector((state: StoreState) => state.user.profile)

  return <InfoSummaryMain profile={profile}/>
}