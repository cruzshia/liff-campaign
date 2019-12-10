import React from 'react'
import Background from '@components/background'
import CameraHeader from '@components/CameraHeader'

export default function Calculating() {
  return (
    <div className='h-100vh d-flex flex-column'>
      <CameraHeader />
      <Background>
        <div className='flex-center-center flex-column'>
          <img src='/assets/calculating.svg' alt='' className='image mt-1rem' />
        </div>
      </Background>
    </div>
  )
}
