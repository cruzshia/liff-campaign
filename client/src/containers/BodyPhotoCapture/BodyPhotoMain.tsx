import React from 'react'
import Camera from '@components/camera'
import CameraTitleBanner from '@components/cameraTitleBanner'
import style from './bodyPhotoCapture.module.sass'
import { CameraProp } from '@components/camera'

interface Props {
  handleProceed: (img: CameraProp) => void
}

export default function({ handleProceed }: Props) {
  return (
    <>
      <CameraTitleBanner />
      <Camera completeCbk={handleProceed} errorCbk={error => console.log(error)} headerH={50} footerH={70} />
      <div className={style.camera_control}></div>
    </>
  )
}
