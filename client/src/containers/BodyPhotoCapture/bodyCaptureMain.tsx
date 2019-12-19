import React, { useEffect, useState } from 'react'
import PhotoCapture from './components/photoCapture'
import Confirmation from './components/confirmation'
import Calculating from './components/calculating'
import DisplayResult from './components/displayResult'
import { ImgState } from './index'
import { CameraProp } from '@components/camera'
import { interval, Observable } from 'rxjs'
import { takeUntil, timeout } from 'rxjs/operators'
import ajaxSubject from '@src/utils/ajaxSubject'
import { BodyActionTypes, getEstimationAct } from '@reducer/bodygram/actions'
import { useDispatch } from 'react-redux'

interface Props {
  isCalculating: boolean
  img: ImgState
  requestResult: () => void
  handleProceedCamera: (img: CameraProp) => void
  handleRetake: () => void
}

interface Result {
  waistCircumference: null | number
  complete: boolean
}

export default function BodyCaptureMain({
  isCalculating,
  img,
  requestResult,
  handleProceedCamera,
  handleRetake
}: Props) {
  const [result, setResult] = useState<Result>({ waistCircumference: null, complete: false })
  const dispatch = useDispatch()
  useEffect(() => {
    const subscription = ajaxSubject.subscribe(
      { successType: [BodyActionTypes.CREATE_ESTIMATION_SUCCESS] },
      {
        next: ({ data }) => {
          const source = interval(4000)
          const complete = new Observable(subscriber => {
            const subscribeSetEstimation = ajaxSubject.subscribe(
              { successType: [BodyActionTypes.SET_ESTIMATION] },
              {
                next: res => {
                  setResult({ waistCircumference: res.data, complete: true })
                  subscriber.next()
                  subscribeSetEstimation.unsubscribe()
                }
              }
            )
          }).pipe(timeout(60000))

          source.pipe(takeUntil(complete)).subscribe({
            next: () => {
              dispatch(getEstimationAct(data))
            }
          })
        }
      }
    )
    return () => subscription.unsubscribe()
  })

  return result.complete ? (
    <DisplayResult result={result.waistCircumference} />
  ) : isCalculating ? (
    <Calculating />
  ) : img.front && img.side ? (
    <Confirmation front={img.front} side={img.side} requestResult={requestResult} handleRetake={handleRetake} />
  ) : (
    <PhotoCapture handleProceed={handleProceedCamera} />
  )
}
