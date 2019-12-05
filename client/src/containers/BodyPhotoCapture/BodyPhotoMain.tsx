import React, { useState, useCallback } from 'react'
import Camera, { CameraProp } from '../../components/camera'
import { blobtoDataURL } from '@src/utils/common'
import style from './bodyPhotoCapture.module.sass'

export default function() {
  const [capturing, setCapturing] = useState<boolean>(true)
  const [frontImg, setFrontImg] = useState<string | ArrayBuffer | null>()
  const [sideImg, setSideImg] = useState<string | ArrayBuffer | null>()
  const [errors, setErrors] = useState<any>()

  const completeCbk = useCallback(
    ({ front, side }: CameraProp) => {
      blobtoDataURL(front, data => setFrontImg(data))
      blobtoDataURL(side, data => setSideImg(data))
      setCapturing(false)
    },
    [setCapturing]
  )

  const errorCbk = useCallback(
    (error: Error) => {
      setErrors(error)
    },
    [setErrors]
  )

  const handleReCapture = useCallback(() => {
    setFrontImg(null)
    setSideImg(null)
    setCapturing(true)
  }, [setFrontImg, setSideImg, setCapturing])

  return (
    <div className={style.bodyPhotoCtr}>
      {!capturing && (
        <div>
          <button onClick={handleReCapture}>ReShot</button>
        </div>
      )}
      {capturing && <Camera headerH={20} footerH={20} completeCbk={completeCbk} errorCbk={errorCbk} />}
      {errors && <div className='pre-wrap'>{`${errors.name}\n${errors.constraint}\n${errors.message}`}</div>}
      {frontImg && <img src={frontImg.toString()} alt='front-confirm' className={style.previewImg} />}
      {sideImg && <img src={sideImg.toString()} alt='side-confirm' className={style.previewImg} />}
    </div>
  )
}
