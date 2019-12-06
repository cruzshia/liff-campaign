import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, Redirect } from 'react-router-dom'
import { StoreState } from '@reducer/index'
import { routePath } from '@src/appConfig'
import InfoSettingMain from './infoSettingMain'

export const InfoSettingContext = React.createContext({ handleProceed: () => {} })

export default function InfoSetting() {
  const history = useHistory()
  const { profile, userChecked } = useSelector((state: StoreState) => ({
    userChecked: state.user.userChecked,
    profile: state.user.profile
  }))
  const handleProceed = useCallback(() => {
    history.push(routePath.weightSetting)
  }, [history])

  return userChecked && profile ? (
    <Redirect to={routePath.weightSetting} />
  ) : (
    <InfoSettingContext.Provider value={{ handleProceed: handleProceed }}>
      <InfoSettingMain />
    </InfoSettingContext.Provider>
  )
}
