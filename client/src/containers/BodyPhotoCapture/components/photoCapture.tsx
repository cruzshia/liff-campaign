import React from 'react'
import Camera from '@components/camera'
import CameraHeader from '@components/CameraHeader'
import style from '../bodyPhotoCapture.module.sass'
import { CameraProp } from '@components/camera'

interface Props {
  handleProceed: (img: CameraProp) => void
}

export default function({ handleProceed }: Props) {
  return (
    <>
      <CameraHeader />
      <Camera completeCbk={handleProceed} errorCbk={error => console.log(error)} headerH={50} footerH={70} />
      <div className={style.camera_control}></div>
    </>
  )
}
