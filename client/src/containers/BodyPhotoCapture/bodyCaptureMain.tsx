import React, { useEffect } from 'react'
import PhotoCapture from './components/photoCapture'
import Confirmation from './components/confirmation'
import Calculating from './components/calculating'
import DisplayResult from './components/displayResult'
import { ImgState } from './index'
import { CameraProp } from '@components/camera'
import { interval, Observable, SubscriptionLike } from 'rxjs'
import { takeUntil, timeout } from 'rxjs/operators'
import ajaxSubject from '@src/utils/ajaxSubject'
import { BodyActionTypes, getEstimationAct } from '@reducer/bodygram/actions'
import { useDispatch } from 'react-redux'

interface Props {
  result: number | null
  isCalculating: boolean
  img: ImgState
  requestResult: () => void
  handleProceedCamera: (img: CameraProp) => void
}

export default function BodyCaptureMain({ result, isCalculating, img, requestResult, handleProceedCamera }: Props) {
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
                next: () => {
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
