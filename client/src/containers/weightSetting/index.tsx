import React, { useCallback, useEffect } from 'react'
import WeightSettingMain from './weightSettingMain'
import { useHistory } from 'react-router-dom'
import { routePath } from '@src/appConfig'
import { updateUserAct } from '@reducer/user/actions'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from '@reducer/index'
import ajaxSubject from '@src/utils/ajaxSubject'
import { UserActionTypes } from '@reducer/user/actions'

export default function() {
  const dispatch = useDispatch()
  const profile = useSelector((state: StoreState) => state.user.profile)
  const history = useHistory()
  const handleProceed = useCallback(
    (weight: number) => {
      profile && dispatch(updateUserAct({ ...profile, weight }))
    },
    [dispatch, profile]
  )

  useEffect(() => {
    const subscription = ajaxSubject.subscribe(
      { successType: [UserActionTypes.UPDATE_USER_SUCCESS] },
      {
        next: () => history.push(routePath.measurement)
      }
    )
    return () => subscription.unsubscribe()
  }, [history])

  return <WeightSettingMain handleProceed={handleProceed} />
}
