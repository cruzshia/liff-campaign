import React, { useCallback, useState } from 'react'
import BodyPhotoMain from './BodyPhotoMain'
import Confirmation from './confirmation'
import Calculating from './calculating'
import DisplayResult from './displayResult'

interface ImgState {
  front: null | ArrayBuffer
  side: null | ArrayBuffer
}

export default function() {
  const [img, setImage] = useState<ImgState>({ front: null, side: null })
  const [isCalculating, setIsCalculating] = useState<boolean>(false)
  const handleProceedCamera = useCallback(
    imgBlob => {
      setImage({ front: imgBlob.front, side: imgBlob.side })
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
    <BodyPhotoMain handleProceed={handleProceedCamera} />
  )
}
