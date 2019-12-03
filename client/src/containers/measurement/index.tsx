import React , { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import { routePath } from '@src/appConfig'
import MeasurementMethod from './components/measurementMethod'

export default function() {
  const history = useHistory()
  const handleUseCamera = useCallback(() => history.push(routePath.root), [
    history
  ])
  const handleUseInput = useCallback(() => history.push(routePath.root), [
    history
  ])
  return <MeasurementMethod handleUseCamera={handleUseCamera} handleUseInput={handleUseInput}/>
}
