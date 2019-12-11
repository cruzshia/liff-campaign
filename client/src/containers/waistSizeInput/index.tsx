import React, { useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import WaistSizeInputMain from './waistSizeInputMain'
import { routePath } from '@src/appConfig'
import ajaxSubject from '@src/utils/ajaxSubject'
import { UserActionTypes } from '@reducer/user/actions'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from '@reducer/index'
import { updateUserAct } from '@reducer/user/actions'

export default function() {
  const history = useHistory()
  const dispatch = useDispatch()
  const profile = useSelector((state: StoreState) => state.user.profile)
  const handleProceed = useCallback(
    (waistCircumference: number) => {
      profile && dispatch(updateUserAct({ ...profile, waistCircumference }))
    },
    [dispatch, profile]
  )
  useEffect(() => {
    const subscription = ajaxSubject.subscribe(
      { successType: [UserActionTypes.UPDATE_USER_SUCCESS] },
      {
        next: () => history.push(routePath.infoSummary)
      }
    )
    return () => subscription.unsubscribe()
  }, [history])

  return <WaistSizeInputMain handleProceed={handleProceed} />
}
