import React, { useCallback } from 'react'
import Camera from '@components/camera'
import CameraHeader from '@components/CameraHeader'
import style from '../bodyPhotoCapture.module.sass'
import { CameraProp } from '@components/camera'
import { routePath } from '@src/appConfig'
import { Link } from 'react-router-dom'
import Logger from '@src/utils/logger'

interface Props {
  handleProceed: (img: CameraProp) => void
}

export default function({ handleProceed }: Props) {
  const handleError = useCallback(() => Logger.error, [])
  return (
    <>
      <CameraHeader />
      <Camera completeCbk={handleProceed} errorCbk={handleError} headerH={50} footerH={70} />
      <div className={style.camera_control}>
        <Link to={routePath.cameraTutorial}>back</Link>
      </div>
    </>
  )
}
