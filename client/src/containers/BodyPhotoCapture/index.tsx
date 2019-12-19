import React, { useCallback, useState } from 'react'
import BodyCaptureMain from './bodyCaptureMain'
import { createEstimationAct, BodyActionTypes } from '@reducer/bodygram/actions'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from '@reducer/index'
import { blobToFile, ageCalculator } from '@src/utils/estimationRequest'
import { CameraProp } from '@components/camera'
import ajaxSubject from '@src/utils/ajaxSubject'

export interface ImgState {
  front: null | Blob
  side: null | Blob
}

export default function BodyPhotoCapture() {
  const profile = useSelector((store: StoreState) => store.user.profile)
  const dispatch = useDispatch()
  const [img, setImage] = useState<ImgState>({ front: null, side: null })
  const [isCalculating, setIsCalculating] = useState<boolean>(false)
  const handleProceedCamera = useCallback(
    (img: CameraProp) => {
      setImage({ front: img.front, side: img.side })
    },
    [setImage]
  )

  const handleRetake = useCallback(() => setImage({ front: null, side: null }), [setImage])

  const requestResult = useCallback(() => {
    profile &&
      img.front &&
      img.side &&
      dispatch(
        createEstimationAct({
          estimationParameter: {
            age: ageCalculator(profile.birthday),
            heightInCm: profile.height,
            weightInKg: profile.weight,
            gender: profile.gender,
            frontImage: blobToFile(img.front),
            sideImage: blobToFile(img.side),
            failOnAutomaticEstimationFailure: false
          },
          callback: ({ request }) => {
            ajaxSubject.success(BodyActionTypes.CREATE_ESTIMATION_SUCCESS, request.id)
          }
        })
      )
    setIsCalculating(true)
    setImage({ front: null, side: null })
  }, [setImage, setIsCalculating, img, profile, dispatch])

  return (
    <BodyCaptureMain
      isCalculating={isCalculating}
      img={img}
      requestResult={requestResult}
      handleProceedCamera={handleProceedCamera}
      handleRetake={handleRetake}
    />
  )
}
