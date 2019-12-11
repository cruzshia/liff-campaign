import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { createUserAct } from '@reducer/user/actions'
import { UserModelType } from '@reducer/user/userModel'
import RegisterMain from './RegisterMain'

export const InfoSettingContext = React.createContext({ handleProceed: (ev: React.FormEvent<HTMLFormElement>) => {} })

export default function InfoSetting() {
  const dispatch = useDispatch()

  const handleProceed = useCallback(
    (ev: React.FormEvent<HTMLFormElement>) => {
      ev.preventDefault()
      const entries = new FormData(ev.currentTarget).entries()
      const result: any = {}
      let current = entries.next()
      while (!current.done) {
        result[current.value[0]] = current.value[1]
        current = entries.next()
      }
      const params: UserModelType = {
        uid: '',
        gender: result.gender,
        birthday: result.year + result.month + result.day,
        height: Number(result.height),
        weight: 0,
        isEntryContest: result.isEntryContest === 'true'
      }
      dispatch(createUserAct(params))
    },
    [dispatch]
  )

  return (
    <InfoSettingContext.Provider value={{ handleProceed: handleProceed }}>
      <RegisterMain />
    </InfoSettingContext.Provider>
  )
}
