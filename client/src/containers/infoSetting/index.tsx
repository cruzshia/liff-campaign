import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { routePath } from '@src/appConfig'
import InfoSettingMain from './infoSettingMain'

export const InfoSettingContext = React.createContext({ handleProceed: () => {} })

export default function InfoSetting() {
  const history = useHistory()
  const handleProceed = useCallback(
    () => history.push(routePath.weightSetting),
    [history]
  )

  return (
    <InfoSettingContext.Provider value={{ handleProceed: handleProceed }}>
      <InfoSettingMain />
    </InfoSettingContext.Provider>
  )
}
