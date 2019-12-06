import React from 'react'
import Background from '@src/components/background'
import style from '../cameraTutorial.module.sass'
import Button from '@components/button'
import CameraTitleBanner from '@src/components/cameraTitleBanner'
import { routePath } from '@src/appConfig'

export default function({ handleProceed }: { handleProceed: () => void }) {
  return (
    <div className='h-100vh d-flex flex-column'>
      <CameraTitleBanner />
      <Background>
        <div className='flex-center-center flex-column'>
          <img
            src='/assets/cameraTutorial1.svg'
            alt=''
            className={`mt-1rem mb-1rem ${style.image}`}
          />
          <Button onClick={handleProceed} />
          <Button path={routePath.userTerms} />
        </div>
      </Background>
    </div>
  )
}
