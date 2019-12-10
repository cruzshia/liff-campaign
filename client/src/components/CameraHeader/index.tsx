import React from 'react'
import style from './cameraHeader.module.sass'

export default function CameraHeader() {
  return (
    <h1 className={`flex-center-center ${style.title}`}>
      <div className={`flex-center-center ${style.wrap}`}>
        <img src='assets/bodygram.svg' alt='bodygram' className={style.bodygram} />
      </div>
    </h1>
  )
}
