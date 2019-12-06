import React, { useState, useCallback } from 'react'
import CameraTutorial1 from './components/cameraTutorial1'
import CameraTutorial2 from './components/cameraTutorial2'
import { useHistory } from 'react-router'
import { routePath } from '@src/appConfig'

export default function CameraTutorial() {
  const history = useHistory()
  const [section, setSection] = useState(0)
  const handleProceed1 = useCallback(() => setSection(1), [setSection])
  const handleProceed2 = useCallback(() => {
    history.push(routePath.cameraInput)
  }, [history])
  const handleReturn2 = useCallback(() => setSection(0), [setSection])
  return section === 0 ? (
    <CameraTutorial1 handleProceed={handleProceed1} />
  ) : (
    <CameraTutorial2 handleReturn={handleReturn2} handleProceed={handleProceed2} />
  )
}
