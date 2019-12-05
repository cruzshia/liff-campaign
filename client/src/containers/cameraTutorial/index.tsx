import React, { useState, useCallback } from 'react'
import CameraTutorial1 from './components/cameraTutorial1'
import CameraTutorial2 from './components/cameraTutorial2'

export default function CameraTutorial() {
  const [section, setSection] = useState(0)
  const handleProceed1 = useCallback(() => setSection(1), [section])
  const handleReturn2 = useCallback(() => setSection(0), [section])
  return section === 0 ? (
    <CameraTutorial1 handleProceed={handleProceed1} />
  ) : (
    <CameraTutorial2 handleReturn={handleReturn2} />
  )
}
