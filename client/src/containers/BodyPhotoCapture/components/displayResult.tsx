import React from 'react'
import Background from '@components/background'
import CameraHeader from '@components/CameraHeader'
import style from '../bodyPhotoCapture.module.sass'
import Button from '@components/button'
import { routePath } from '@src/appConfig'

export default function Calculating({ result }: { result: number|null }) {
  return (
    <div className='h-100vh d-flex flex-column'>
      <CameraHeader />
      <Background>
        <div className='flex-center-center flex-column x-pr mb-1rem'>
          <img src='/assets/displayResult.svg' alt='' className='image mt-1rem' />
          <p className={style.display_result}>
            <span className={style.result}>{result}</span>cm
          </p>
        </div>
        <Button path={routePath.infoSummary} />
      </Background>
    </div>
  )
}
