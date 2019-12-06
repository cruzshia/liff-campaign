import React, { useCallback, useState } from 'react'
import PhotoCapture from './components/photoCapture'
import Confirmation from './components/confirmation'
import Calculating from './components/calculating'
import DisplayResult from './components/displayResult'

interface ImgState {
  front: null | ArrayBuffer
  side: null | ArrayBuffer
}

export default function() {
  const [img, setImage] = useState<ImgState>({ front: null, side: null })
  const [isCalculating, setIsCalculating] = useState<boolean>(false)
  const handleProceedCamera = useCallback(
    img => {
      setImage({ front: img.front, side: img.side })
    },
    [setImage]
  )
  const requestResult = useCallback(() => {
    //TODO: send api
    setIsCalculating(true)
    setImage({ front: null, side: null })
  }, [setImage, setIsCalculating])
  //TODO: bind reducer to get result
  const result = 111
  return result ? (
    <DisplayResult result={result} />
  ) : isCalculating ? (
    <Calculating />
  ) : img.front && img.side ? (
    <Confirmation front={img.front} side={img.side} requestResult={requestResult} />
  ) : (
    <PhotoCapture handleProceed={handleProceedCamera} />
  )
}
