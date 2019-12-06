import React from 'react'
import CameraTitleBanner from '@components/cameraTitleBanner'
import Background from '@components/background'
import style from './bodyPhotoCapture.module.sass'
import Button from '@components/button'

export default function Confirmation({
  front,
  side,
  requestResult
}: {
  front: ArrayBuffer | null
  side: ArrayBuffer | null
  requestResult: () => void
}) {
  return (
    <>
      <CameraTitleBanner />
      <Background>
        <div className='flex-center-center flex-column'>
          <img alt='' src='assets/confirmationFront.svg' className={`${style.title} mt-1rem mb-1rem`} />
          <img alt='' src={URL.createObjectURL(front)} className={`${style.check_image} mb-1rem image`} />
          <img alt='' src='assets/confirmationSide.svg' className={`${style.title} mt-1rem mb-1rem`} />
          <img alt='' src={URL.createObjectURL(side)} className={`${style.check_image} mb-1rem image`} />
        </div>
        <p>aaaaaaaaaaaaaaaaaaaaaa</p>
        <Button onClick={requestResult} />
        <Button />
      </Background>
    </>
  )
}