import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import WaistSizeInputMain from './components/waistSizeInputMain'
import { routePath } from '@src/appConfig'

export default function() {
  const history = useHistory()
  const handleProceed = useCallback(() => {
    history.push(routePath.infoSummary)
  }, [history])
  return <WaistSizeInputMain handleProceed={handleProceed} />
}
