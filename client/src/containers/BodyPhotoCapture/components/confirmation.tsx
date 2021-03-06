import React from 'react'
import CameraHeader from '@components/CameraHeader'
import Background from '@components/background'
import style from '../bodyPhotoCapture.module.sass'
import Button from '@components/button'
import { useIntl } from 'react-intl'
import messages from '../message'

interface Props {
  front: Blob | null
  side: Blob | null
  requestResult: () => void
  handleRetake: () => void
}

export default function Confirmation({ front, side, requestResult, handleRetake }: Props) {
  const formatMessage = useIntl().formatMessage
  return (
    <div className='h-100vh d-flex flex-column'>
      <CameraHeader />
      <Background>
        <div className='flex-center-center flex-column'>
          <img alt='' src='assets/confirmationFront.svg' className={`${style.title} mt-1rem mb-1rem`} />
          <img alt='' src={URL.createObjectURL(front)} className={`${style.check_image} mb-1rem image`} />
          <img alt='' src='assets/confirmationSide.svg' className={`${style.title} mt-1rem mb-1rem`} />
          <img alt='' src={URL.createObjectURL(side)} className={`${style.check_image} mb-1rem image`} />
        </div>
        <p>{formatMessage(messages.confirm)}</p>
        <Button onClick={requestResult} />
        <Button color='gray' onClick={handleRetake}>
          {formatMessage(messages.retake)}
        </Button>
      </Background>
    </div>
  )
}
