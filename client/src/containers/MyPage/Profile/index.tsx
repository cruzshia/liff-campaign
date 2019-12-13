import React from 'react'
import { useSelector } from 'react-redux'
import { StoreState } from '@reducer/index'
import ProfileMain from './ProfileMain'

export default function Profile() {
  const { profile } = useSelector((state: StoreState) => ({
    profile: state.user.profile
  }))
  return <ProfileMain profile={profile!} />
}
